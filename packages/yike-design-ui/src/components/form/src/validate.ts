import { FieldRule } from './form';
export const validator = (
  fieldValue: any,
  rule: FieldRule,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    console.log(
      '🚀 ~ file: validate.ts:3 ~ validator ~ fieldValue:',
      fieldValue,
      rule,
    );
    // 进行校验逻辑...

    // 校验成功时调用 resolve(true)
    // 校验失败时调用 reject(false) 或 reject('错误信息')

    resolve(true); // 示例中直接将校验结果设为 true，请根据具体的校验逻辑进行处理
  });
};
