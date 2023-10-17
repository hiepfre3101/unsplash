import { IconProps } from './LogoIcon';

const PlusIcon = ({ className, width = '24', height = '24' }: IconProps) => {
   return (
      <svg width={height} height={width} className={className} viewBox='0 0 24 24' version='1.1' aria-hidden='false'>
         <desc lang='en-US'>A plus sign</desc>
         <path d='M21.8 10.5h-8.3V2.2h-3v8.3H2.2v3h8.3v8.3h3v-8.3h8.3z'></path>
      </svg>
   );
};

export default PlusIcon;
