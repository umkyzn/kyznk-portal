import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kyznk.dev',
  output: 'static',
  build: {
    inlineStylesheets: 'never',
  },
});
