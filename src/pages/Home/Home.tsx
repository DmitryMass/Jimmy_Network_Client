import { FC } from 'react';
import Navigation from '@/components/Navigation/Navigation';
import MainInfo from '@/components/UserInfo/MainInfo/MainInfo';
import SocialInfo from '@/components/UserInfo/SocialInfo/SocialInfo';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';

import { userInfo } from '@/styles/userInfoStyles';
import AddPost from '@/components/AddPost/AddPost';
import Posts from '@/components/Posts/Posts';
import './home.scss';

const Home: FC = () => {
  const { _id, imgPath } = useTypedSelector((state) => state.user);
  return (
    <div>
      <Navigation />
      <div className='home__container'>
        <div className='pt-[50px] flex gap-[25px]'>
          <div className={userInfo.userInfo}>
            <div className={userInfo.wrapper}>
              <MainInfo userId={_id} imgPath={imgPath} />
              <SocialInfo />
            </div>
          </div>
          <div className='grow'>
            <AddPost />
            <Posts userId={_id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
