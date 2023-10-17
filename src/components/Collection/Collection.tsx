import { ICollection } from '../../interface/collection';
import { Link } from 'react-router-dom';
import style from './Collection.module.scss';
type Props = {
   coll: ICollection;
};

const Collection = ({ coll }: Props) => {
   return (
      <Link to={`/collections/${coll.id}`} key={coll.id}>
         <div className={style['collection']}>
            <div className={style['overlay']}></div>
            <div className={style['left-block']}>
               <img loading='lazy' src={coll.cover_photo.urls.small} alt='' />
            </div>
            <div className={style['right-block']}>
               <img
                  loading='lazy'
                  src={
                     coll?.preview_photos[1]?.urls.small ||
                     'https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
                  }
                  alt=''
                  style={{ borderTopRightRadius: '5px' }}
               />
               <img
                  loading='lazy'
                  src={
                     coll?.preview_photos[2]?.urls.small ||
                     'https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
                  }
                  alt=''
                  style={{ borderBottomRightRadius: '5px' }}
               />
            </div>
         </div>
         <h3>{coll.title}</h3>
         <div className={style['collection-desc']}>
            <span>{coll.total_photos} photos</span>
            <span>Curated by {coll.user.name} </span>
         </div>
      </Link>
   );
};

export default Collection;
