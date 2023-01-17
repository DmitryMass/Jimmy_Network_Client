import { FC, memo, useEffect } from 'react';
import useActions from '@/store/storeHooks/actions';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';
import { useNavigate } from 'react-router-dom';

interface IFriendListProps {
  userId: string;
  isFriendFriends?: boolean;
}

const FriendList: FC<IFriendListProps> = ({
  userId,
  isFriendFriends = false,
}) => {
  const dispatch = useDispatch();
  const token = useTypedSelector((state) => state.token);
  const { setFriends } = useActions();
  const friends = useTypedSelector((state) => state.user.friends);
  const navigate = useNavigate();

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
    // if (isFriendFriends) {
    getFriends();
    // }
  }, []);

  return (
    <div className='max-w-[250px] w-full bg-card max-h-[450px] rounded-[8px] p-[20px]'>
      <h3 className='text-white font-medium text-[16px]'>Friends</h3>
      {friends.length > 0 ? (
        <Virtuoso
          className='w-full h-full mt-[10px]'
          totalCount={friends.length}
          data={friends}
          itemContent={(index, friend) => (
            <div className='mb-[20px] flex justify-between items-center gap-[5px]'>
              <div
                className='flex justify-start items-center gap-[5px]'
                onClick={() => navigate(`/profile/${friend._id}`)}
              >
                <img
                  className='w-[40px] h-[40px] rounded-full'
                  src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                  alt='friendPhoto'
                />
                <div>
                  <h5 className='text-white text-[14px] font-medium'>
                    {friend.firstName} {friend.lastName}
                  </h5>
                  <p className='text-gray text-[12px]'>{friend.occupation}</p>
                </div>
              </div>
              <span>add</span>
            </div>
          )}
        />
      ) : null}
    </div>
  );
};

export default memo(FriendList);
