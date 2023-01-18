import { addPosts } from '@/styles/addPosts';
import { FC, useState } from 'react';

import imgIcon from '@/assets/icons/img-icon.svg';

interface IAddPostProps {
  imgPath: string;
}

const AddPost: FC<IAddPostProps> = ({ imgPath }) => {
  const [text, setText] = useState('');
  return (
    <div className={addPosts.wrapper}>
      <div className={addPosts.inputWrapper}>
        <img
          className='w-[50px] h-[50px] rounded-full'
          src={`http://localhost:3005/assets/${imgPath}`}
          alt='userPhoto'
        />
        <input
          className={addPosts.field}
          onChange={(e) => setText(e.target.value)}
          value={text}
          type='text'
          placeholder='Type your message'
        />
        <div className={addPosts.addImgWrapper}>
          <img className='w-[28px] h-[28px]' src={imgIcon} alt='' />
        </div>
      </div>
      <div className={addPosts.publishWrapper}>
        <button className={addPosts.sendBtn}>Publish</button>
      </div>
    </div>
  );
};

export default AddPost;
