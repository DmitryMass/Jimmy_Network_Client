import { FC } from 'react';

interface ICommentProps {
  comment: string;
}

const Comment: FC<ICommentProps> = ({ comment }) => {
  return <div>{comment}</div>;
};

export default Comment;
