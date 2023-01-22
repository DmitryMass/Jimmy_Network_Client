import { FC, memo, useEffect, useState } from 'react';
import useActions from '@/store/storeHooks/actions';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';
import Friend from '../Friend/Friend';

import './friendList.scss';
import { useGetFriendsQuery } from '@/store/api/getApi';

interface IFriendListProps {
  userId: string;
}

const FriendList: FC<IFriendListProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useTypedSelector((state) => state.authSlice.token);
  const { setFriends } = useActions();
  const friends = useTypedSelector((state) => state.authSlice.user.friends);
  const {
    data = null,
    isLoading,
    isError,
  } = useGetFriendsQuery({ userId, token });

  useEffect(() => {
    data && dispatch(setFriends({ friends: data }));
  }, [data]);

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
