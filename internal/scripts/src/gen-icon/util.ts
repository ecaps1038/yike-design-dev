import { getTemplates, replaceVariables } from '@yike/build-utils';

export const templates = getTemplates('./icon.md');

export function getTemplate(flag: string, data: object) {
  return replaceVariables(templates[flag], data);
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IconNs {
  export interface IconData {
    title: string;
    type: string;
    list: Array<ListType>;
  }

  export interface ListType {
    name: string;
    componentName: string;
    path: string;
  }
}

export const iconMaps = {
  color: '多彩图标',
  fill: '面性图标',
  outline: '线形图标',
};
