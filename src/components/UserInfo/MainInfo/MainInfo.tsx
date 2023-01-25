import { FC, memo } from 'react';
import { userInfo } from '@/styles/userInfoStyles';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import locationLogo from '@/assets/icons/location.svg';
import profession from '@/assets/icons/profession.svg';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '@/store/api/getApi';
import RequestError from '@/components/RequestError/RequestError';
import RequestLoading from '@/components/RequestLoading/RequestLoading';

interface IMainInfoProps {
  userId: string;
  imgPath: string;
}

const MainInfo: FC<IMainInfoProps> = ({ userId, imgPath }) => {
  const navigate = useNavigate();
  const token = useTypedSelector((state) => state.authSlice.token);
  const friends = useTypedSelector((state) => state.authSlice.user.friends);
  const { data = {}, isLoading, isError } = useGetUserQuery({ userId, token });
  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
  } = data;

  return (
    <>
      <div className={userInfo.box}>
        {isError ? <RequestError isError={isError} /> : null}
        {isLoading ? <RequestLoading /> : null}
        <div
          className={userInfo.user}
          onClick={() => {
            navigate(`/profile/${userId}`);
          }}
        >
          <img
            className='w-[40px] h-[40px] rounded-full'
            src={`https://jimmy-network-server.onrender.com/assets/${imgPath}`}
            alt='userImg'
          />
          {/* <img
            className='w-[40px] h-[40px] rounded-full'
            src={`http://localhost:3005/assets/${imgPath}`}
            alt='userImg'
          /> */}
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
