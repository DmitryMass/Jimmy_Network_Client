import { FC, useEffect, useState } from 'react';
import { userInfo } from '@/styles/userInfoStyles';
import addFriend from '@/assets/icons/addFriend.svg';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import locationLogo from '@/assets/icons/location.svg';
import profession from '@/assets/icons/profession.svg';
import { IUserType } from '@/types/userType';

interface IMainInfoProps {
  userId: string;
  imgPath: string;
}

const MainInfo: FC<IMainInfoProps> = ({ userId, imgPath }) => {
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

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <>
      <div className={userInfo.box}>
        <div className={userInfo.user}>
          <img
            className='w-[40px] h-[40px] rounded-full'
            src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
            alt='userImg'
          />
          <div>
            <h5 className={userInfo.userName}>
              {firstName} {lastName}
            </h5>
            <p className={userInfo.userFriends}>{friends?.length} friends</p>
          </div>
        </div>
        <div className={userInfo.addFriend}>
          <img
            className='w-[30px] h-[30px]'
            src={addFriend}
            alt='addFriend logo'
          />
        </div>
      </div>
      <div className='py-[15px] border-cardBorder border-b-2'>
        <div className={`${userInfo.userAdditional} mb-[10px]`}>
          <img className='w-[20px] h-[20px]' src={locationLogo} alt='' />
          <p className={userInfo.userData}>{location}</p>
        </div>
        <div className={`${userInfo.userAdditional} `}>
          <img className='w-[20px] h-[20px]' src={profession} alt='' />
          <p className={userInfo.userData}>{occupation}</p>
        </div>
      </div>
      <div className='border-cardBorder border-b-2 py-[15px]'>
        <div className={userInfo.viewsWrapper}>
          <span className={`${userInfo.userData} mb-[5px]`}>Profile views</span>
          <span className='text-white text-[12px] font-medium'>
            {viewedProfile}
          </span>
        </div>
        <div className={userInfo.viewsWrapper}>
          <span className={userInfo.userData}>Your posts reactions</span>
          <span className='text-white text-[12px] font-medium'>
            {impressions}
          </span>
        </div>
      </div>
    </>
  );
};

export default MainInfo;
