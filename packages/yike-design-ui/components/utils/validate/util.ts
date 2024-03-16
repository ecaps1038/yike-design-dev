import { isObject } from './is';
import {
  ValidateMessagesType,
  ValidateMessagesTemplateType,
} from './interface';

export const mergeTemplate = <T = ValidateMessagesType>(
  defaultValidateMessages: T,
  validateMessages: any,
): T => {
  const result: any = { ...defaultValidateMessages };

  Object.keys(validateMessages || {}).forEach((key) => {
    const defaultValue = result[key];
    const newValue = validateMessages?.[key];

    result[key] = isObject(defaultValue)
      ? {
          ...defaultValue,
          ...newValue,
        }
      : newValue || defaultValue;
  });

  return result;
};

export const getTemplate = (
  validateMessages: ValidateMessagesTemplateType,
  keyPath: string,
) => {
  const keys = keyPath.split('.');

  let result: any = validateMessages;

  for (let i = 0; i < keys.length; i++) {
    result = result && result[keys[i]];

    if (result === undefined) {
      return result;
    }
  }

  return result;
};
