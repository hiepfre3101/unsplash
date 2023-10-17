import { IconProps } from './LogoIcon';


const ArrowLeft = ({ className, width = '24', height = '24' }: IconProps) => {
   return (
      <svg width={width} height={height} className={className} viewBox='0 0 24 24' version='1.1' aria-hidden='false'>
         <desc lang='en-US'>Chevron left</desc>
         <path d='M15.5 18.5 14 20l-8-8 8-8 1.5 1.5L9 12l6.5 6.5Z'></path>
      </svg>
   );
};

export default ArrowLeft;
