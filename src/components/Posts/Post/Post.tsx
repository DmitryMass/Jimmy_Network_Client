import { IPost } from '@/types/post';
import { FC } from 'react';

interface IPostProps {
  post: IPost;
}

const Post: FC<IPostProps> = ({ post }) => {
  return <div>Post</div>;
};

export default Post;
