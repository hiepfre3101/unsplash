import { IconProps } from './LogoIcon';

const ArrDownThin = ({ className, width = '24', height = '24' }: IconProps) => {
   return (
      <svg width={width} height={height} className={className} viewBox='0 0 24 24' version='1.1' aria-hidden='false'>
         <desc lang='en-US'>Arrow pointing down</desc>
         <path d='M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41Z'></path>
      </svg>
   );
};

export default ArrDownThin;
