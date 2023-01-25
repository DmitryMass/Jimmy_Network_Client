import { FC, useEffect, useState } from 'react';

interface IRequestErrorProps {
  isError: boolean;
  text?: string;
}

const RequestError: FC<IRequestErrorProps> = ({ isError, text }) => {
  const [isReqError, setIsReqError] = useState(false);
  useEffect(() => {
    if (isError) {
      setIsReqError(true);
    }
  }, [isError]);
  return (
    <>
      {isReqError ? (
        <>
          <div className='absolute w-full h-full bg-opacity-90 bg-slate-500 flex justify-center items-center top-0 left-0 bottom-0 z-10'>
            <div className='h-[300px] flex items-start gap-4 justify-between px-[20px]'>
              <h5 className='text-[16px] text-white'>
                {text ? text : 'Request error. Try again in 30 sec.'}
              </h5>
              <button
                onClick={() => setIsReqError(false)}
                className='border-0 bg-red-600 text-white text-[12px] py-[2px] px-3 rounded-full'
              >
                x
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default RequestError;
