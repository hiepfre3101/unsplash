import React from 'react';
import style from './Button.module.scss';

type Props = {
   className?: string;
   iconLeft?: React.ReactElement;
   iconRight?: React.ReactElement;
   children?: React.ReactElement | string;
   onClick?: () => void;
};

const Button = ({ onClick, className, iconLeft, iconRight, children }: Props) => {
   return (
      <button type='button' className={`${style['wrapper']} ${className && className}`} onClick={onClick}>
         {iconLeft && iconLeft}
         <span className={style['']}>{children}</span>
         {iconRight && iconRight}
      </button>
   );
};

export default Button;
