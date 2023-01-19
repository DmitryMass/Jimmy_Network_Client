import { FC, memo, useEffect, useState } from 'react';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import addFriend from '@/assets/icons/catAdd.svg';
import deleteFriend from '@/assets/icons/catDelete.svg';
import useActions from '@/store/storeHooks/actions';
import { postStyles } from '@/styles/postStyles';

import myLogo from '@/assets/images/logo.png';

interface IFriendProps {
  friendId: string;
  name: string;
  location: string;
  imgPath: string;
  post?: boolean;
}

const Friend: FC<IFriendProps> = ({
  friendId,
  name,
  location,
  imgPath,
  post = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setFriends } = useActions();
  const { _id } = useTypedSelector((state) => state.user);
  const token = useTypedSelector((state) => state.token);
  const friends = useTypedSelector((state) => state.user.friends);

  const isFriend = friends?.find((friend: any) => friend._id === friendId);

  const addRemoveFriend = async () => {
    try {
      if (_id === friendId) return;
      const addRemoveResponse = await fetch(
        `http://localhost:3005/users/${_id}/${friendId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await addRemoveResponse.json();
      console.log(data);
      dispatch(setFriends({ friends: data }));
    } catch (err) {
      console.log(`${err} friend didn't remove or add`);
    }
  };

  return (
    <div className={postStyles.friendWrapper}>
      <div
        className={postStyles.friendInfo}
        onClick={() => {
          navigate(`/profile/${friendId}`);
        }}
      >
        <img
          className='w-[40px] h-[40px] rounded-full'
          src={imgPath ? `http://localhost:3005/assets/${imgPath}` : myLogo}
          alt='userimg'
        />
        <div>
          <h4 className={postStyles.friendName}>{name}</h4>
          <p className={postStyles.friendLocation}>{location}</p>
        </div>
      </div>
      {friendId === _id ? null : (
        <div>
          {!post ? null : (
            <div
              onClick={() => addRemoveFriend()}
              className='w-[25px] h-[25px] cursor-pointer transition-all duration-75 hover:scale-[1.1]'
            >
              {isFriend ? (
                <img
                  className='max-w-full'
                  src={deleteFriend}
                  alt='deleteFriend'
                />
              ) : (
                <img className='max-w-full' src={addFriend} alt='addFriend' />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Friend);
