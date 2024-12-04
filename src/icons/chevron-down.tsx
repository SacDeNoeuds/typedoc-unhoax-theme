import { JSX } from 'typedoc'
import { IconProps } from './_common.js'

// provided by https://iconoir.com
export function ChevronDownIcon({ size = '1em' }: IconProps = {}) {
  return (
    <svg
      class='icon-chevron-down'
      width={size}
      height={size}
      stroke-width='1.5'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      color='currentColor'
    >
      <path
        d='M6 9L12 15L18 9'
        stroke='currentColor'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
