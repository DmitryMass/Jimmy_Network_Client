import Navigation from '@/components/Navigation/Navigation';
import Posts from '@/components/Posts/Posts';
import MainInfo from '@/components/UserInfo/MainInfo/MainInfo';
import SocialInfo from '@/components/UserInfo/SocialInfo/SocialInfo';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import { userInfo } from '@/styles/userInfoStyles';
import { IUserType } from '@/types/userType';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './user.scss';

const User: FC = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<IUserType | null>(null);
  const token = useTypedSelector((state) => state.token);

  const getUser = async () => {
    try {
      const userResponse = await fetch(
        `http://localhost:3005/users/${userId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await userResponse.json();
      setUser(data);
    } catch (err) {
      console.log(`${err} fail getting userdata.`);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <>
      <Navigation />
      <div className='user__container'>
        <div className='pt-[50px] flex gap-[25px]'>
          <div className={userInfo.userInfo}>
            <div className={userInfo.wrapper}>
              <MainInfo userId={userId!} imgPath={user.imgPath!} />
              <SocialInfo />
            </div>
          </div>
          <div className='grow'>
            <Posts userId={userId!} isProfile />
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
