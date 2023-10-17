import React from 'react';
import { IconProps } from './LogoIcon';

const Company = ({ className, width = '24', height = '24' }: IconProps) => {
   return (
      <svg width={width} height={height} className={className} viewBox='0 0 24 24' version='1.1' aria-hidden='false'>
         <path
            opacity='.5'
            clip-rule='evenodd'
            fill-rule='evenodd'
            d='M19 9h-2V7h2v2Zm0 4h-2v-2h2v2Zm0 4h-2v-2h2v2Zm-2 2v2h4c.55 0 1.021-.196 1.413-.587.391-.392.587-.863.587-1.413V5c0-.55-.196-1.021-.587-1.413A1.928 1.928 0 0 0 21 3h-9c-.55 0-1.02.192-1.412.575A1.856 1.856 0 0 0 10 4.95l2 1.45V5h9v14h-4Z'
            fill='#111'
         ></path>
         <path
            clip-rule='evenodd'
            fill-rule='evenodd'
            d='M1 20v-7.975a1.947 1.947 0 0 1 .85-1.625l5-3.575c.35-.25.733-.375 1.15-.375.417 0 .8.125 1.15.375l5 3.575a1.94 1.94 0 0 1 .85 1.625V20c0 .283-.096.52-.287.712A.968.968 0 0 1 14 21H9v-5H7v5H2a.965.965 0 0 1-.712-.288A.965.965 0 0 1 1 20Zm4-1H3v-7l5-3.55L13 12v7h-2v-5H5v5Z'
            fill='#111'
         ></path>
      </svg>
   );
};

export default Company;
