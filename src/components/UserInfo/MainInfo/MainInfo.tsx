import { FC, memo, useEffect, useState } from 'react';
import { userInfo } from '@/styles/userInfoStyles';
import addFriend from '@/assets/icons/addFriend.svg';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import locationLogo from '@/assets/icons/location.svg';
import profession from '@/assets/icons/profession.svg';
import { IUserType } from '@/types/userType';
import { useNavigate } from 'react-router-dom';
import useActions from '@/store/storeHooks/actions';
import { useDispatch } from 'react-redux';

interface IMainInfoProps {
  userId: string;
  imgPath: string;
}

const MainInfo: FC<IMainInfoProps> = ({ userId, imgPath }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUserType | null>(null);
  const token = useTypedSelector((state) => state.authSlice.token);
  const friends = useTypedSelector((state) => state.authSlice.user.friends);

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
  }, [userId]);

  if (!user) return null;

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
  } = user;

  return (
    <>
      <div className={userInfo.box}>
        <div
          className={userInfo.user}
          onClick={() => {
            navigate(`/profile/${userId}`);
          }}
        >
          <img
            className='w-[40px] h-[40px] rounded-full'
            src={`http://localhost:3005/assets/${imgPath}`}
            alt='userImg'
          />
          <div>
            <h5 className={userInfo.userName}>
              {firstName} {lastName}
            </h5>
            <p className={userInfo.userFriends}>{friends?.length} friends</p>
          </div>
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

export default memo(MainInfo);
