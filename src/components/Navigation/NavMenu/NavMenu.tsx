import { FC } from 'react';
import exit from '@/assets/icons/logout.svg';
import notifications from '@/assets/icons/notifications.svg';
import message from '@/assets/icons/messages.svg';
import { navMenu } from '@/styles/navMenu';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useActions from '@/store/storeHooks/actions';

const NavMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logOut } = useActions();

  return (
    <div className={navMenu.wrapper}>
      <div className={navMenu.iconWrapper}>
        <img className={navMenu.icon} src={message} alt='' />
      </div>
      <div className={navMenu.iconWrapper}>
        <img className={navMenu.icon} src={notifications} alt='' />
      </div>
      <div className={navMenu.iconWrapper} onClick={() => dispatch(logOut())}>
        <img className={navMenu.icon} src={exit} alt='' />
      </div>
    </div>
  );
};

export default NavMenu;
