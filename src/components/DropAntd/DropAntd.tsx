import React, { useRef, useState } from 'react';
import style from './DropAntd.module.scss';
import { Link } from 'react-router-dom';
import { useClickOutside } from '../../hooks/useClickOutside';
type Props = {
   list?: ListDropdown[];
   children: React.ReactElement;
   direction: 'left' | 'top' | 'bottom' | 'right';
   renderList?: () => React.ReactElement;
   footer?: React.ReactElement;
};
export type ListDropdown = {
   label: string;
   link: string;
};
const DropAntd = ({ list, children, renderList, direction, footer }: Props) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const containerRef = useRef<HTMLDivElement>(null);
   useClickOutside(containerRef, () => {
      setIsOpen(false);
   });
   if (list)
      return (
         <div className={style['parent']} ref={containerRef}>
            <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
            {isOpen && (
               <div
                  className={`${
                     (direction === 'left' && style['wrapper-left']) ||
                     (direction === 'bottom' && style['wrapper-bottom']) ||
                     (direction === 'right' && style['wrapper-right']) ||
                     (direction === 'top' && style['wrapper-top'])
                  } ${style['wrapper']}`}
               >
                  {list.map((item, index) => (
                     <Link to={item.link} key={index} className={style['option']}>
                        {item.label}
                     </Link>
                  ))}
               </div>
            )}
            {footer}
         </div>
      );
   return (
      <div className={style['parent']} ref={containerRef}>
         <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
         {isOpen && (
            <div
               className={`${
                  (direction === 'left' && style['wrapper-left']) ||
                  (direction === 'bottom' && style['wrapper-bottom']) ||
                  (direction === 'right' && style['wrapper-right']) ||
                  (direction === 'top' && style['wrapper-top'])
               } ${style['wrapper']}`}
            >
               {renderList && renderList()}
               {footer}
            </div>
         )}
      </div>
   );
};

export default DropAntd;
