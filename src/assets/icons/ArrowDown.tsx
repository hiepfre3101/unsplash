import { IconProps } from './LogoIcon';

const ArrowDown = ({ className, width="24", height="24" }: IconProps) => {
   return (
      <svg width={width} height={height} className={className} viewBox='0 0 24 24' version='1.1' aria-hidden='false'>
         <desc lang='en-US'>Arrow pointing down</desc>
         <path d='m19.35 11.625-5.85 5.4V1.5h-3v15.525l-5.85-5.4-2.025 2.25L12 22.425l9.375-8.55-2.025-2.25Z'></path>
      </svg>
   );
};

export default ArrowDown;
