import { Config } from 'svgo';

const options: Config = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    'removeStyleElement',
    'removeScriptElement',
    'removeDimensions',
    {
      name: 'removeAttrs',
      params: {
        attrs: [
          'class',
          'style',
          'stroke-width',
          'stroke-linecap',
          'stroke-linejoin',
        ],
      },
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          { ':class': 'cls' },
          { ':style': 'innerStyle' },
          { ':stroke-width': 'strokeWidth' },
          { ':stroke-linecap': 'strokeLinecap' },
          { ':stroke-linejoin': 'strokeLinejoin' },
        ],
      },
    },
  ],
};

export default options;
