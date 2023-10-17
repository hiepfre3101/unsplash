import { IconProps } from './LogoIcon';

const EmailIcon = ({ className, width = '24', height = '24' }: IconProps) => {
   return (
      <svg width={width} height={height} className={className} viewBox='0 0 24 24' version='1.1' aria-hidden='false'>
         <path d='M20 4H4c-1.12 0-2 .88-2 2v12c0 1.12.88 2 2 2h16c1.12 0 2-.88 2-2V6c0-1.12-.88-2-2-2Zm0 4-8 4.96L4 8V6l8 4.96L20 6v2Z'></path>
      </svg>
   );
};

export default EmailIcon;
