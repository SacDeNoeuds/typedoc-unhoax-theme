import { JSX } from 'typedoc'

type Props = {
  trigger: JSX.Element
  children?: JSX.Element
  overlayClass?: string
}
export function Dropdown(props: Props) {
  return (
    <span class='dropdown'>
      {props.trigger}
      <div class={['dropdown-overlay', props.overlayClass].filter(Boolean).join(' ')}>{props.children}</div>
    </span>
  )
}
