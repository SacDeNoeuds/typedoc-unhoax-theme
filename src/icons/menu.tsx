import { JSX } from 'typedoc'
import { IconProps } from './_common.js'

// provided by https://iconoir.com
export function MenuIcon({ size = '1em' }: IconProps = {}) {
  return (
    <svg
      class='icon-menu'
      width={size}
      height={size}
      stroke-width='1.5'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      color='currentColor'
    >
      <path
        d='M3 5H21'
        stroke='currentColor'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M3 12H21'
        stroke='currentColor'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M3 19H21'
        stroke='currentColor'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
