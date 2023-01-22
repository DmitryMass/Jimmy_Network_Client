import { addPosts } from '@/styles/addPosts';
import { FC, useState } from 'react';

import imgIcon from '@/assets/icons/img-icon.svg';
import Dropzone from 'react-dropzone';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import useActions from '@/store/storeHooks/actions';

interface IAddPostProps {
  imgPath: string;
}

const AddPost: FC<IAddPostProps> = ({ imgPath }) => {
  const [text, setText] = useState('');
  const [isImg, setIsImg] = useState<any>(null);
  const { _id } = useTypedSelector((state) => state.authSlice.user);
  const token = useTypedSelector((state) => state.authSlice.token);
  const dispatch = useDispatch();
  const { setPosts } = useActions();

  const handleAddPost = async () => {
    const body = new FormData();
    body.append('userId', _id);
    body.append('description', text);
    if (isImg) {
      body.append('file', isImg);
      body.append('userImgPath', isImg ? isImg.name : '');
    }
    try {
      const addPostResponse = await fetch('http://localhost:3005/posts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      });
      const posts = await addPostResponse.json();
      console.log(posts);
      dispatch(setPosts({ posts }));
      setIsImg(null);
      setText('');
    } catch (err) {
      console.log(`${err} create post error`);
    }
  };

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
          <Dropzone
            multiple={false}
            onDrop={(acceptedFiles) => setIsImg(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <img className='w-[28px] h-[28px]' src={imgIcon} alt='' />
              </div>
            )}
          </Dropzone>
        </div>
      </div>
      <div className={addPosts.publishWrapper}>
        {isImg && (
          <span className='text-white text-[12px] text-ellipsis overflow-hidden whitespace-nowrap mr-[20px]'>
            {isImg.name}
          </span>
        )}
        <button onClick={handleAddPost} className={addPosts.sendBtn}>
          Publish
        </button>
      </div>
    </div>
  );
};

export default AddPost;
