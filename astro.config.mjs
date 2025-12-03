import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // ⚠️ À MODIFIER : ton nom de domaine
  site: 'https://ton-domaine.com',
  integrations: [sitemap()],
  compressHTML: true,
});
