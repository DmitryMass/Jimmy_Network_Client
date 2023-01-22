import { FC } from 'react';

const RequestLoading: FC = () => {
  return (
    <div className='absolute w-full h-full bg-opacity-90 bg-slate-500 flex justify-center items-center top-0 left-0 bottom-0 z-10'>
      <div className='h-[300px] flex items-start gap-4 justify-between px-[20px]'>
        <h5 className='text-[16px] text-white'>Loading...</h5>
      </div>
    </div>
  );
};

export default RequestLoading;
