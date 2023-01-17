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
  const { setOnePost } = useActions();
  const [usersComments, setUsersComments] = useState(false);
  const token = useTypedSelector((state) => state.token);
  const loggedInUserId = useTypedSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const changeLike = async () => {
    try {
      const changeResponse = await fetch(
        `http://localhost:3005/posts/${_id}/like`,
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

  return (
    <>
      <div className={postStyles.wrapper}>
        <Friend
          friendId={userId}
          name={`${firstName} ${lastName}`}
          location={location}
          userImgPath={userImgPath}
        />
        <p className={postStyles.description}>{description}</p>
        {imgPath ? (
          <img
            width='100%'
            height='auto'
            alt='post'
            style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
            src={`http://localhost:3005/assets/${imgPath}`}
          />
        ) : null}
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
