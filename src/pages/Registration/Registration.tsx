import Form from '@/components/Form/Form';
import Navigation from '@/components/Navigation/Navigation';
import { FC } from 'react';

import './registration.scss';
const Registration: FC = () => {
  return (
    <div>
      <Navigation />
      <div className='registration__container'>
        <Form />
      </div>
    </div>
  );
};

export default Registration;
