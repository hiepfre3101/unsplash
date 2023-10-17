import React from 'react';
import style from './Search.module.scss';

type Props = {
   title: string;
   children: React.ReactElement;
};
const TrendBlock = ({ title, children }: Props) => {
   return (
      <div className={style['dd-block']}>
         <span className={style['title']}>{title}</span>
         {children}
      </div>
   );
};

export default TrendBlock;
