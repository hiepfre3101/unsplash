import React from 'react';
import style from './Tooltip.module.scss';
type Props = {
   children: React.ReactElement;
};

const Tooltip = ({ children }: Props) => {
   return <div className={style['wrapper']}>{children}</div>;
};

export default Tooltip;
