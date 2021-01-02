import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';

export const config: Config = {
  namespace: 'versions',
  plugins: [
    postcss({
      plugins: [
        require('tailwindcss'),
        autoprefixer()
      ]
    })
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  bundles: [
    { components: ['oap-versions'] },
  ]
};
