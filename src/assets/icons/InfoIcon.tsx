import { IconProps } from './LogoIcon';

const InfoIcon = ({ className, width = '24', height = '24' }: IconProps) => {
   return (
      <svg width={width} height={height} className={className} viewBox='0 0 24 24' version='1.1' aria-hidden='false'>
         <desc lang='en-US'>Info icon</desc>
         <path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Zm1.111 8.889v6.667H10.89v-6.667h2.222Zm0-4.445v2.223H10.89V6.444h2.222Z'></path>
      </svg>
   );
};

export default InfoIcon;
