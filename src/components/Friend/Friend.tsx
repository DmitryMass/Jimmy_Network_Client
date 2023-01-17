import { FC, memo } from 'react';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import addFriend from '@/assets/icons/catAdd.svg';
import deleteFriend from '@/assets/icons/catDelete.svg';
import useActions from '@/store/storeHooks/actions';
import { postStyles } from '@/styles/postStyles';

interface IFriendProps {
  friendId: string;
  name: string;
  location: string;
  userImgPath: string;
}

const Friend: FC<IFriendProps> = ({
  friendId,
  name,
  location,
  userImgPath,
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
          src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
          alt='userimg'
        />
        <div>
          <h4 className={postStyles.friendName}>{name}</h4>
          <p className={postStyles.friendLocation}>{location}</p>
        </div>
      </div>
      <div
        onClick={addRemoveFriend}
        className='w-[25px] h-[25px] cursor-pointer transition-all duration-75 hover:scale-[1.1]'
      >
        {isFriend ? (
          <img className='max-w-full' src={deleteFriend} alt='' />
        ) : (
          <img className='max-w-full' src={addFriend} alt='' />
        )}
      </div>
    </div>
  );
};

export default memo(Friend);
