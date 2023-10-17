import { IconProps } from './LogoIcon';

const StonkIcon = ({ className, width = '32', height = '32' }: IconProps) => {
   return (
      <svg width={height} height={width} className={className} viewBox='0 0 24 24' version='1.1' aria-hidden='false'>
         <desc lang='en-US'>A trend sign</desc>
         <path d='m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6Z'></path>
      </svg>
   );
};

export default StonkIcon;
