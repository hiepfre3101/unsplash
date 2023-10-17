import style from './Tag.module.scss';
export type Itag = {
   title: string;
   type: string;
};
type Props = {
   tags: Itag[];
   onClick: (value: string) => void;
};

const Tag = ({ tags, onClick }: Props) => {
   return (
      <div>
         <div className={style['tag-wrap']}>
            {tags &&
               tags.length > 0 &&
               tags.map((tag) => (
                  <span className={style['tag']} onClick={() => onClick(tag.title)}>
                     {tag.title}
                  </span>
               ))}
         </div>
      </div>
   );
};

export default Tag;
