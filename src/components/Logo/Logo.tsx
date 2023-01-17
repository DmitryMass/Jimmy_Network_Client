import { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo.png';

const Logo: FC = () => {
  return (
    <Link className='block relative z-10 w-[100px] h-[55px]' to={'/home'}>
      <img className='w-full h-full' src={logo} alt='' />
    </Link>
  );
};

export default Logo;
