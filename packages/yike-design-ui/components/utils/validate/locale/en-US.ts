const defaultTypeTemplate = '#{field} is not a #{type} type';

export default {
  required: '#{field} is required',
  type: {
    ip: defaultTypeTemplate,
    email: defaultTypeTemplate,
    url: defaultTypeTemplate,
    string: defaultTypeTemplate,
    number: defaultTypeTemplate,
    array: defaultTypeTemplate,
    object: defaultTypeTemplate,
    boolean: defaultTypeTemplate,
  },
  number: {
    min: '`#{value}` is not greater than `#{min}`',
    max: '`#{value}` is not less than `#{max}`',
    equal: '`#{value}` is not equal to `#{equal}`',
    range: '`#{value}` is not in range `#{min} ~ #{max}`',
    positive: '`#{value}` is not a positive number',
    negative: '`#{value}` is not a negative number',
  },
  string: {
    maxLength: '#{field} cannot be longer than #{maxLength} characters',
    minLength: '#{field} must be at least #{minLength} characters',
    length: '#{field} must be exactly #{length} characters',
    match: '`#{value}` does not match pattern #{pattern}',
    uppercase: '`#{value}` must be all uppercase',
    lowercase: '`#{value}` must be all lowercased',
  },
  array: {
    length: '#{field} must be exactly #{length} in length',
    minLength: '#{field} cannot be less than #{minLength} in length',
    maxLength: '#{field} cannot be greater than #{maxLength} in length',
    includes: '#{field} is not includes #{includes}',
    deepEqual: '#{field} is not deep equal with #{deepEqual}',
    empty: '#{field} is not an empty array',
  },
  object: {
    deepEqual: '#{field} is not deep equal to expected value',
    hasKeys: '#{field} does not contain required fields',
    empty: '#{field} is not an empty object',
  },
  boolean: {
    true: 'Expect true but got `#{value}`',
    false: 'Expect false but got `#{value}`',
  },
};
