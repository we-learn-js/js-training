const base = import.meta.env.BASE_URL.replace(/\/$/, '')

// Astro does not prefix internal links with `base` automatically
// (unlike Gatsby's <Link>): every internal href must go through this.
export const withBase = (path: string): string =>
  `${base}${path.startsWith('/') ? path : `/${path}`}`
