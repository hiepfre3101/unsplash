import { IconProps } from './LogoIcon';

const ArrDownSolid = ({ className, width = '24', height = '24' }: IconProps) => {
   return (
      <svg width={width} height={height} className={className} viewBox='0 0 24 24' version='1.1' aria-hidden='false'>
         <desc lang='en-US'>Arrow pointing down</desc>
         <path d='m6 9 6 7 6-7H6Z'></path>
      </svg>
   );
};

export default ArrDownSolid;
