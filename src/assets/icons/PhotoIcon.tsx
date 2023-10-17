import { IconProps } from './LogoIcon';

const PhotoIcon = ({ className, width = '32', height = '32' }: IconProps) => {
   return (
      <svg
         width={width}
         height={height}
         className={className}
         viewBox='0 0 24 24'
         version='1.1'
         aria-labelledby='unsplash-home'
         aria-hidden='false'
      >
         <path width={width} d='M20 3H4c-.6 0-1 .4-1 1v16c0 .6.4 1 1 1h16c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1ZM5 18l3.5-4.5 2.5 3 3.5-4.5 4.5 6H5Z'></path>
      </svg>
   );
};

export default PhotoIcon;
