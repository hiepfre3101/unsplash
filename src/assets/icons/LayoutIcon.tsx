import { IconProps } from './LogoIcon';

const LayoutIcon = ({ className, width = '24', height = '24' }: IconProps) => {
   return (
      <svg width={width} height={height} className={className} viewBox='0 0 24 24' fill='none'>
         <path
            opacity='.5'
            clip-rule='evenodd'
            fill-rule='evenodd'
            d='M17 4v16c.55 0 1.021-.196 1.413-.587.391-.392.587-.863.587-1.413V6c0-.55-.196-1.02-.587-1.412A1.927 1.927 0 0 0 17 4Zm4 2v12c.417 0 .77-.146 1.062-.438.292-.291.438-.645.438-1.062v-9c0-.417-.146-.77-.438-1.062A1.444 1.444 0 0 0 21 6Z'
            fill='#111'
         ></path>
         <path
            clip-rule='evenodd'
            fill-rule='evenodd'
            d='M4 22c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 2 20V4c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 4 2h9c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413v16c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0 1 13 22H4Zm9-2H4V4h9v16Z'
            fill='#111'
         ></path>
      </svg>
   );
};

export default LayoutIcon;
