import React, { useRef } from 'react';
import style from './ImageZoom.module.scss';

type Props = {
   src: string;
   alt: string;
};

const ImageZoom = ({ src, alt }: Props) => {
   const zoomRef = useRef<HTMLDivElement>(null);
   const imageRef = useRef<HTMLImageElement>(null);
   const handleMouseMove = (e: React.MouseEvent<HTMLImageElement | HTMLDivElement>, zoom: number) => {
      if (!zoomRef.current || !imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      // lay vi tri cua con tro tren hinh anh goc
      let cursorX = e.clientX - rect.left;
      let cursorY = e.clientY - rect.top;
      // can vi tri kinh lup vao trung tam con tro
      let widthLoupe = zoomRef.current.offsetWidth / 2;
      let heigthLoupe = zoomRef.current.offsetHeight / 2;
      if (cursorX > imageRef.current.width || cursorY > imageRef.current.height) {
         zoomRef.current.style.display = 'none';
         return;
      }
      
      zoomRef.current.style.display = 'block';
      zoomRef.current.style.backgroundImage = `url(${src})`;
      //size cua bg kinh lup zoom len 3 lan (option)
      zoomRef.current.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
      // su dung so am de can vi tri tu ben trai va tu tren cua element chua bg
      zoomRef.current.style.backgroundPosition = `-${cursorX * zoom - widthLoupe}px -${cursorY * zoom - heigthLoupe}px`;
      zoomRef.current.style.top = `${e.clientY - heigthLoupe}px`;
      zoomRef.current.style.left = `${e.clientX - widthLoupe}px`;
   };
   return (
      <div className={style['wrapper']}>
         <img
            ref={imageRef}
            src={src}
            alt={alt}
            className={style['image']}
            onMouseMove={(event) => handleMouseMove(event, 3)}
         />
         <div className={style['zoom-block']} ref={zoomRef} onMouseMove={(e) => handleMouseMove(e, 3)}></div>
      </div>
   );
};

export default ImageZoom;
