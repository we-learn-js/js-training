// @ts-check
import react from '@astrojs/react'
import {defineConfig} from 'astro/config'
import rehypeExternalLinks from 'rehype-external-links'
import {remarkBaseImages} from './src/lib/remark-base-images.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://we-learn-js.github.io',
  base: '/js-training',
  trailingSlash: 'ignore',
  integrations: [react()],
  markdown: {
    remarkPlugins: [remarkBaseImages],
    rehypePlugins: [
      [rehypeExternalLinks, {target: '_blank', rel: ['noopener', 'noreferrer']}]
    ],
    shikiConfig: {
      theme: 'one-light'
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: [
            'import',
            'legacy-js-api',
            'color-functions',
            'global-builtin'
          ]
        }
      }
    }
  }
})
