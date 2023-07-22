module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
      plugins: ['stylelint-less'],
      rules: {
        'less/color-no-invalid-hex': true,
        'less/no-duplicate-variables': true,
        'function-no-unknown': [true, { ignoreFunctions: ['palette'] }],
        'no-descending-specificity': null,
      },
    },
  ],
  rules: {
    'at-rule-no-unknown': null,
    'plugin/declaration-block-no-ignored-properties': true,
    'import-notation': null,
  },
  ignoreFiles: ['dist', 'node_modules'],
}
