/// <reference path="../.astro/types.d.ts" />

declare module 'reveal.js' {
  export default class Reveal {
    constructor(deckElement: HTMLElement, options?: Record<string, unknown>)
    initialize(): Promise<unknown>
    destroy(): void
  }
}

declare module 'reveal.js/plugin/notes/notes.esm.js' {
  const RevealNotes: unknown
  export default RevealNotes
}
