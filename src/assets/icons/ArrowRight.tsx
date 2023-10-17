import { IconProps } from './LogoIcon';

const ArrowRight = ({ className, width = '24', height = '24' }: IconProps) => {
   return (
      <svg width={width} height={height} className={className} viewBox='0 0 24 24' version='1.1' aria-hidden='false'>
         <desc lang='en-US'>Chevron right</desc>
         <path d='M8.5 5.5 10 4l8 8-8 8-1.5-1.5L15 12 8.5 5.5Z'></path>
      </svg>
   );
};

export default ArrowRight;
