import fs from 'fs-extra';
import { join } from 'path';

/**
 * Replaces variables in a given template string with corresponding values.
 *
 * @param {string} template - The template string containing variable placeholders.
 * @param {Object.<string, any>} variables - An object containing key-value pairs for variable replacement.
 * @returns {string} The template string with variables replaced by their corresponding values.
 */
export const replaceVariables = (
  template: string,
  variables: { [x: string]: any },
): string => {
  /**
   * Replace variables in the template string.
   *
   * @param {string} match - The matched placeholder string (e.g., "#{variable}").
   * @param {string} exp - The exp extracted from the placeholder.
   * @returns {string} The replacement value or the original match if the key is not found in variables.
   */
  return template.replace(/#{(.+?)}#/g, (match, exp) => {
    const getValueFunc = new Function('data', `return data.${exp}`);
    return getValueFunc(variables) || '';
  });
};

export function getTemplates(path: string) {
  const templates = fs.readFileSync(join(__dirname, path), 'utf-8');
  /** @see https://regex101.com/r/A0eVOr/1 */
  const mdReg =
    /(?<start>(?:`|~){3})\w+:\s*(?<name>.+)(?:\r?\n)(?<content>[\s\S]*?)\k<start>/g;
  const result: { [key: string]: string } = {};
  let match: RegExpExecArray | null;

  while ((match = mdReg.exec(templates)) !== null) {
    const { name, content } = <{ name: string; content: string }>match.groups;

    result[name] = content;
  }

  return result;
}
