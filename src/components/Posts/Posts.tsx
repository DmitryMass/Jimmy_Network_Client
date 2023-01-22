import useActions from '@/store/storeHooks/actions';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import { IPost } from '@/types/post';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Post from './Post/Post';

interface IPostsProps {
  userId: string;
  isProfile?: boolean;
}

const Posts: FC<IPostsProps> = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useTypedSelector((state) => state.authSlice.posts);
  const token = useTypedSelector((state) => state.authSlice.token);
  const { setPosts } = useActions();

  const getPosts = async () => {
    try {
      const postsResponse = await fetch('http://localhost:3005/posts', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const posts = await postsResponse.json();
      dispatch(setPosts({ posts: posts }));
    } catch (err) {
      console.log(`${err} didn't get posts`);
    }
  };

  const getUserPosts = async () => {
    try {
      const userPostsResponse = await fetch(
        `http://localhost:3005/posts/${userId}/posts`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userPosts = await userPostsResponse.json();
      dispatch(setPosts({ posts: userPosts }));
    } catch (err) {
      console.log(`${err} didn't get userPosts`);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId]);

  return (
    <div className=' w-full h-full'>
      {posts
        ? posts.map((post: IPost) => <Post post={post} key={post._id} />)
        : null}
    </div>
  );
};

export default Posts;
