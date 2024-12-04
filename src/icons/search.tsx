import { JSX } from 'typedoc'
import { IconProps } from './_common.js'

// provided by https://iconoir.com
export function SearchIcon({ size = '1em' }: IconProps = {}) {
  return (
    <svg
      class='icon-search'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      stroke-width='1.5'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      color='currentColor'
    >
      <path
        d='M17 17L21 21'
        stroke='currentColor'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z'
        stroke='currentColor'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}