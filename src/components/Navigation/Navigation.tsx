import { FC } from 'react';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import Logo from '../Logo/Logo';
import NavMenu from './NavMenu/NavMenu';

import './navigations.scss';
const Navigation: FC = () => {
  const user = useTypedSelector((state) => state.authSlice.user);
  return (
    <header className='shadow-md py-[10px] '>
      <div className='nav__container flex justify-between items-center'>
        <Logo />
        {user ? <NavMenu /> : null}
      </div>
    </header>
  );
};

export default Navigation;
