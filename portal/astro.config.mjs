// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kyznk.dev',
  output: 'static',
  build: {
    // Keep CSS in external files so the Content-Security-Policy in
    // public/_headers can use `style-src 'self'` without 'unsafe-inline'.
    inlineStylesheets: 'never',
  },
});
