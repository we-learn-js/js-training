const BASE = '/js-training'

const walk = (node, visitor) => {
  visitor(node)
  for (const child of node.children ?? []) {
    walk(child, visitor)
  }
}

/**
 * Markdown chapters reference images as absolute paths (`/images/...`),
 * which only resolve at the domain root. Prefix them with the site base
 * so they work under GitHub Pages' `/js-training` path.
 */
export const remarkBaseImages = () => tree => {
  walk(tree, node => {
    if (node.type === 'image' && node.url && node.url.startsWith('/images/')) {
      node.url = `${BASE}${node.url}`
    }
  })
}
