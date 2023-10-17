import { IconProps } from './LogoIcon';

const CalendarIcon = ({ className, width = '16', height = '16' }: IconProps) => {
   return (
      <svg width={width} height={height} className={className} viewBox='0 0 24 24' version='1.1' aria-hidden='false'>
         <desc lang='en-US'>Calendar outlined</desc>
         <path d='M21 6v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14z'></path>
      </svg>
   );
};

export default CalendarIcon;
