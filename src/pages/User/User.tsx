import FriendList from '@/components/FriendList/FriendList';
import Navigation from '@/components/Navigation/Navigation';
import Posts from '@/components/Posts/Posts';
import MainInfo from '@/components/UserInfo/MainInfo/MainInfo';
import SocialInfo from '@/components/UserInfo/SocialInfo/SocialInfo';
import { useGetUserQuery } from '@/store/api/getApi';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import { userInfo } from '@/styles/userInfoStyles';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import './user.scss';

const User: FC = () => {
  const { userId } = useParams();
  const token = useTypedSelector((state) => state.authSlice.token);
  const {
    data = null,
    isLoading,
    isError,
  } = useGetUserQuery(
    { userId, token },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <>
      <Navigation />
      <div className='user__container'>
        {data ? (
          <>
            <div className='pt-[50px] flex gap-[25px]'>
              <div className={userInfo.userInfo}>
                <div className={userInfo.wrapper}>
                  <MainInfo userId={userId!} imgPath={data.imgPath} />
                  <SocialInfo />
                </div>
                <FriendList userId={userId!} />
              </div>
              <div className='grow'>
                <Posts userId={userId!} isProfile />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default User;
