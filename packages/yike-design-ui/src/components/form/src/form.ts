import { InjectionKey } from 'vue';
export interface FieldRule<FieldValue = any> {
  /**
   * @zh 校验的值的类型，默认为 `'string'`
   * @en The type of the value to be checked, the default is `'string'`
   */
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'email';
  /**
   * @zh 是否必填
   * @en Is it required
   */
  required?: boolean;
  /**
   * @zh 校验失败时展示的信息
   * @en Information displayed when verification fails
   */
  message?: string;
  /**
   * @zh 校验长度（string, array）
   * @en Check length (string, array)
   */
  length?: number;
  /**
   * @zh 最大长度（string）
   * @en Maximum length (string)
   */
  maxLength?: number;
  /**
   * @zh 最小长度（string）
   * @en Minimum length (string)
   */
  minLength?: number;
  /**
   * @zh 匹配校验（string）
   * @en Match check (string)
   */
  match?: RegExp;
  /**
   * @zh 大写（string）
   * @en Uppercase (string)
   */
  uppercase?: boolean;
  /**
   * @zh 小写（string）
   * @en Lowercase (string)
   */
  lowercase?: boolean;
  /**
   * @zh 最小值（number）
   * @en Minimum (number)
   */
  min?: number;
  /**
   * @zh 最大值（number）
   * @en Maximum (number)
   */
  max?: number;
  /**
   * @zh 校验数值（number）
   * @en Check value (number)
   */
  equal?: number;
  /**
   * @zh 正数（number）
   * @en Positive number (number)
   */
  positive?: boolean;
  /**
   * @zh 负数（number）
   * @en Negative number (number)
   */
  negative?: boolean;
  /**
   * @zh 是否为 `true`（boolean）
   * @en Whether it is `true` (boolean)
   */
  true?: boolean;
  /**
   * @zh 是否为 `false`（boolean）
   * @en Whether it is `false` (boolean)
   */
  false?: boolean;
  /**
   * @zh 数组中是否包含给定值（array）
   * @en Does the array contain the given value (array)
   */
  includes?: any[];
  /**
   * @zh 数组元素是否相等（array）
   * @en Are array elements equal (array)
   */
  deepEqual?: any;
  /**
   * @zh 是否为空（object）
   * @en Is it empty (object)
   */
  empty?: boolean;
  /**
   * @zh 对象是否包含给定属性（object）
   * @en Does the object contain the given attribute (object)
   */
  hasKeys?: string[];
  /**
   * @zh 自定义校验规则
   * @en Custom verification rules
   * @param value
   * @param callback
   */
  validator?: (
    value: FieldValue | undefined,
    callback: (error?: string) => void,
  ) => void;
}

export type FormProps = {
  model: any;
  id?: string;
  rules?: Record<string, FieldRule | FieldRule[]>;
  labelWidth?: number;
};
export type FormItemProps = {
  prop?: string;
  labelWidth?: number;
  label?: string;
  required?: boolean;
  rules?: Record<string, FieldRule | FieldRule[]>;
};

export type FormContext = {
  labelWidth: number;
  disabled: boolean;
  validate: () => void;
};

export const formContext: InjectionKey<FormContext> = Symbol('formContextKey');
