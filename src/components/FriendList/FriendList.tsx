import { FC, memo, useEffect } from 'react';
import useActions from '@/store/storeHooks/actions';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';
import Friend from '../Friend/Friend';

import './friendList.scss';

interface IFriendListProps {
  userId: string;
}

const FriendList: FC<IFriendListProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useTypedSelector((state) => state.token);
  const { setFriends } = useActions();
  const friends = useTypedSelector((state) => state.user.friends);

  const getFriends = async () => {
    try {
      const friendsResponse = await fetch(
        `http://localhost:3005/users/${userId}/friends`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await friendsResponse.json();
      dispatch(setFriends({ friends: data }));
    } catch (err) {
      console.log(`${err} cannot get friends list`);
    }
  };

  useEffect(() => {
    getFriends();
  }, [userId]);

  return (
    <div className='max-w-[260px] w-full bg-card max-h-[300px] rounded-[8px] p-[20px] overflow-y-hidden '>
      <h3 className='text-white font-medium text-[16px]'>Friends</h3>
      {friends && friends.length > 0 ? (
        <Virtuoso
          className='w-full h-full mt-[10px] friend__scroll'
          totalCount={friends.length}
          data={friends}
          itemContent={(index, friend) => (
            <Friend
              friendId={friend._id}
              imgPath={friend.imgPath}
              name={`${friend.firstName} ${friend.lastName}`}
              location={friend.location}
            />
          )}
        />
      ) : null}
    </div>
  );
};

export default memo(FriendList);
