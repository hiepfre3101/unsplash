import { IconProps } from './LogoIcon';

const DotIcon = ({ className, width = '24', height = '24' }: IconProps) => {
   return (
      <svg width={width} height={height} className={className} viewBox='0 0 24 24' version='1.1' aria-hidden='false'>
         <path d='M6 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2Zm14-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm-8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z'></path>
      </svg>
   );
};

export default DotIcon;
