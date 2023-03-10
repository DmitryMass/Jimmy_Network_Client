import { addPosts } from '@/styles/addPosts';
import { FC, useState } from 'react';

import imgIcon from '@/assets/icons/img-icon.svg';
import Dropzone from 'react-dropzone';
import useTypedSelector from '@/store/storeHooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import useActions from '@/store/storeHooks/actions';
import { useAddPostMutation } from '@/store/api/postApi';

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
  const [addPost, { isLoading, isError }] = useAddPostMutation();

  const handleAddPost = async () => {
    const body = new FormData();
    body.append('userId', _id);
    body.append('description', text);
    if (isImg) {
      body.append('file', isImg);
      body.append('userImgPath', isImg ? isImg.name : '');
    }
    try {
      const posts: any = await addPost({ data: body, token });
      if (posts.data) {
        dispatch(setPosts({ posts: posts.data }));
      }
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
          src={`https://jimmy-network-server.onrender.com/assets/${imgPath}`}
          alt='userPhoto'
        />
        {/* <img
          className='w-[50px] h-[50px] rounded-full'
          src={`http://localhost:3005/assets/${imgPath}`}
          alt='userPhoto'
        /> */}
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
        <button
          onClick={handleAddPost}
          className={`${addPosts.sendBtn} hidden md:inline`}
        >
          {isLoading ? 'Loading...' : 'Publish'}
        </button>
      </div>
      <div className={addPosts.publishWrapper}>
        {isImg && (
          <span className='text-white text-[12px] text-ellipsis overflow-hidden whitespace-nowrap mr-[20px]'>
            {isImg.name}
          </span>
        )}
        <button
          onClick={handleAddPost}
          className={`${addPosts.sendBtn} md:hidden inline`}
        >
          {isLoading ? 'Loading...' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

export default AddPost;
