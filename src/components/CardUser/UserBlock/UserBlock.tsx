import { useState } from 'react';
import { IUser } from '../../../interface/user';
import Tooltip from '../../Tooltip/Tooltip';
import CardUser from '../CardUser';
import style from './UserBlock.module.scss';

type Props = {
   user: IUser;
   hasUsername?: boolean;
};
const UserBlock = ({ user, hasUsername = true }: Props) => {
   const [hover, setHover] = useState<boolean>(false);
   return (
      <div className={style['profile-wrapper']}>
         <img src={user.profile_image.medium} alt={user.name} className={style['profile-img']} />
         <div className={style['profile-info']} onMouseMove={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <span className={style['profile-name']} style={hasUsername ? {} : { color: 'white' }}>
               {user.name}
            </span>
            {hasUsername && <span className={style['profile-username']}>{user.username}</span>}
            <div className={style['children']}>
               <Tooltip>
                  <CardUser user={user} isHover={hover} />
               </Tooltip>
            </div>
         </div>
      </div>
   );
};

export default UserBlock;
