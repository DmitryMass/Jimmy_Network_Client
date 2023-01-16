import { addPosts } from '@/styles/addPosts';
import { FC, useState } from 'react';

import imgIcon from '@/assets/icons/img-icon.svg';

const AddPost: FC = () => {
  const [text, setText] = useState('');
  return (
    <div className={addPosts.wrapper}>
      <div className={addPosts.inputWrapper}>
        <img
          className='w-[50px] h-[50px] rounded-full'
          src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
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
