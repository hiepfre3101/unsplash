import style from './Loading.module.scss';
type Props = {
   screen?: 'small' | 'large';
};

const Loading = ({ screen = 'small' }: Props) => {
   return (
      <div className={screen === 'small' ? style['wrapper'] : style['wrapper-large']}>
         <div className={style['spinner']}></div>
      </div>
   );
};

export default Loading;
