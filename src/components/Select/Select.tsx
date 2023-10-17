import React, { useRef, useState } from 'react';
import style from './Select.module.scss';
import ArrDownSolid from '../../assets/icons/ArrDownSolid';
import { useClickOutside } from '../../hooks/useClickOutside';

export type ISelect = {
   title: string;
   value: string | undefined;
};
type Props = {
   type: string;
   selectList: ISelect[];
   getValue: (value: string) => void;
   icon?: React.ReactElement;
   initValue: string;
};

const Select = ({ selectList, getValue, icon, type, initValue }: Props) => {
   const [title, setTitle] = useState<string>(initValue);
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const handleSelected = (title: string, value: string) => {
      setTitle(title);
      getValue(value);
   };
   const wrapperRef = useRef<HTMLDivElement>(null);
   useClickOutside(wrapperRef, () => setIsOpen(false));
   return (
      <div
         ref={wrapperRef}
         className={`${style['wrapper']} ${title !== selectList[0].title && style['wrapper-selected']}`}
         onClick={() => setIsOpen((prev) => !prev)}
      >
         <span style={{ fill: '#d1d1d1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {icon}
         </span>
         <span className={style['title']}>
            {type}
            <span>{title}</span>
         </span>
         {isOpen && (
            <div className={style['dropdown']}>
               <p className={style['head']}>{type}</p>
               <div className={style['list-wrapper']}>
                  {selectList.map((item, index) => (
                     <div
                        key={index}
                        className={title === item.title ? style['option-selected'] : style['option']}
                        onClick={() => handleSelected(item.title, item.value)}
                     >
                        {item.title}
                     </div>
                  ))}
               </div>
            </div>
         )}
         <span className={style['icon-drop']}>
            <ArrDownSolid width={'12'} height={'12'} />
         </span>
      </div>
   );
};

export default Select;
