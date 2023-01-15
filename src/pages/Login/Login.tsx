import LoginForm from '@/components/Form/LoginForm';
import Navigation from '@/components/Navigation/Navigation';
import { FC } from 'react';

import './login.scss';

const Login: FC = () => {
  return (
    <div>
      <Navigation />
      <div className='login__container'>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
