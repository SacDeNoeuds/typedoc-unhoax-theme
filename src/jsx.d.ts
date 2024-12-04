import { JSX as TypeDocJSX } from 'typedoc'

declare global {
  interface HTMLElementTagNameMap {
    // add your custom elements here.
  }
}

// eslint-disable-next-line
declare module 'typedoc' {
  namespace JSX {
    namespace JSX {
      interface IntrinsicElements {
        // add your custom elements here.
      }
    }
  }
}
