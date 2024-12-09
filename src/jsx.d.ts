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
      interface IntrinsicAttributes {
        popover?: boolean
        popovertarget?: string
        popovertargetaction?: 'hide' | 'show' | 'toggle'
      }
      interface IntrinsicElements {
        // add your custom elements here, ie:
        /**
         * @example
         * ```tsx
         * <drop-down trigger="#my-trigger" class="header-menu">
         *   <button>Option #1</button>
         *   <button>Option #2</button>
         * </drop-down>
         * ```
         */
        'drop-down': IntrinsicAttributes & {
          /**
           * A query selector, ie: '#my-trigger'
           */
          trigger: string
        }
      }
    }
  }
}
