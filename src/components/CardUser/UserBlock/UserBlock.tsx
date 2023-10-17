import { IUser } from '../../../interface/user';
import Tooltip from '../../Tooltip/Tooltip';
import CardUser from '../CardUser';
import style from './UserBlock.module.scss';

type Props = {
   user: IUser;
};
const UserBlock = ({ user }: Props) => {
   return (
      <div className={style['profile-wrapper']}>
         <img src={user.profile_image.medium} alt={user.name} className={style['profile-img']} />
         <div className={style['profile-info']}>
            <span className={style['profile-name']}>{user.name}</span>
            <span className={style['profile-username']}>{user.username}</span>
            <div className={style['children']}>
               <Tooltip>
                  <CardUser user={user} />
               </Tooltip>
            </div>
         </div>
      </div>
   );
};

export default UserBlock;
