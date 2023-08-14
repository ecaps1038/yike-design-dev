module.exports = {
  singleQuote: true,
  semi: false,
  overrides: [
    {
      files: '*.ts',
      options: {
        semi: true,
      },
    },
    {
      files: 'demo/components.d.ts',
      options: {
        semi: false,
      },
    },
  ],
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'ignore',
  endOfLine: 'auto',
  trailingComma: 'all',
  tabWidth: 2,
}
