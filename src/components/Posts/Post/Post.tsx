import Friend from '@/components/Friend/Friend';
import useActions from '@/store/storeHooks/actions';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import { IPost } from '@/types/post';
import { FC, memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import commentLogo from '@/assets/icons/comment.svg';
import likeLogo from '@/assets/icons/likeLogo.svg';
import unlikeLogo from '@/assets/icons/unlikeLogo.svg';
import { postStyles } from '@/styles/postStyles';
import AddComment from '@/components/AddComment/AddComment';
import Comment from '@/components/Comment/Comment';
import deleteIcon from '@/assets/icons/deleteIcon.svg';

interface IPostProps {
  post: IPost;
}

const Post: FC<IPostProps> = ({
  post: {
    _id,
    userId,
    firstName,
    lastName,
    location,
    userImgPath,
    likes,
    description,
    imgPath,
    comments,
  },
}) => {
  const dispatch = useDispatch();
  const { setOnePost, deletePost } = useActions();
  const [usersComments, setUsersComments] = useState(false);
  const token = useTypedSelector((state) => state.authSlice.token);
  const loggedInUserId = useTypedSelector((state) => state.authSlice.user._id);
  const user = useTypedSelector((state) => state.authSlice.user);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const changeLike = async () => {
    try {
      const changeResponse = await fetch(
        `https://jimmy-network-server.onrender.com/posts/${_id}/like`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );

      const updatePost = await changeResponse.json();
      dispatch(setOnePost({ post: updatePost }));
    } catch (err) {
      console.log(`${err} doesn't change like`);
    }
  };

  const removePost = async (id: string) => {
    try {
      const deleteResponse = await fetch(
        `https://jimmy-network-server.onrender.com/posts/${id}/posts`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (deleteResponse.status === 200) {
        dispatch(deletePost({ _id }));
      }
    } catch (err) {
      console.log(`${err} client: post doesn't delete`);
    }
  };

  return (
    <>
      <div className={`${postStyles.wrapper} shadow-card`}>
        <div className='flex justify-between w-full'>
          <Friend
            friendId={userId}
            name={`${firstName} ${lastName}`}
            location={location}
            imgPath={imgPath}
          />
          {user._id === userId ? (
            <div onClick={() => removePost(_id)} className='cursor-pointer'>
              <img className='w-[25px] h-[25px]' src={deleteIcon} alt='' />
            </div>
          ) : null}
        </div>
        <p className={postStyles.description}>{description}</p>
        {userImgPath ? (
          <img
            className='max-w-full max-h-[650px]'
            alt='post'
            style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
            src={`https://jimmy-network-server.onrender.com/assets/${userImgPath}`}
          />
        ) : // <img
        //   className='max-w-full max-h-[650px]'
        //   alt='post'
        //   style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
        //   src={`http://localhost:3005/assets/${userImgPath}`}
        // />
        null}
        <div className={`${postStyles.flexStart} gap-[40px]`}>
          <div onClick={changeLike} className='cursor-pointer'>
            {isLiked ? (
              <div
                className={`${postStyles.flexStart} ${postStyles.likeCommentWrapper} gap-[7px]`}
              >
                <img
                  className='w-[20px] h-[20px] mb-[2px]'
                  src={likeLogo}
                  alt='likelogo'
                />
                <span className='text-white text-[14px] font-medium'>
                  {likeCount}
                </span>
              </div>
            ) : (
              <div
                className={`${postStyles.flexStart} ${postStyles.likeCommentWrapper}  gap-[7px]`}
              >
                <img
                  className='w-[20px] h-[20px] mb-[2px]'
                  src={unlikeLogo}
                  alt='unlikeLogo'
                />
                <span className='text-gray text-[14px] font-medium'>
                  {likeCount}
                </span>
              </div>
            )}
          </div>
          <div>
            <div
              onClick={() => setUsersComments((comments) => !comments)}
              className={`${postStyles.flexStart} ${postStyles.likeCommentWrapper}  gap-[3px] cursor-pointer`}
            >
              <img
                className='w-[25px] h-[25px]'
                src={commentLogo}
                alt='commentLogo'
              />
              <p className='text-[14px] text-gray font-medium'>
                Comment{' '}
                <span className='text-gray font-medium'>{comments.length}</span>
              </p>
            </div>
          </div>
        </div>
        {usersComments ? (
          <div className='pt-[5px] mt-[10px] border-t-2 border-cardBorder'>
            <AddComment />
            {comments.map((comment: any, i: number) => (
              <Comment key={`${comment}-${i}`} comment={comment} />
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default memo(Post);
