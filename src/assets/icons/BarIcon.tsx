import { IconProps } from './LogoIcon';

const BarIcon = ({ className, width = '24', height = '24' }: IconProps) => {
   return (
      <svg width={width} height={height} className={className} viewBox='0 0 24 24' version='1.1' aria-hidden='false'>
         <desc lang='en-US'>navigation menu</desc>
         <path d='M3 16h18v2H3v-2ZM3 6v2h18V6H3Zm0 7h18v-2H3v2Z'></path>
      </svg>
   );
};

export default BarIcon;
