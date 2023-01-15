import { FC } from 'react';
import { userInfo } from '@/styles/userInfoStyles';
import linkedin from '@/assets/icons/linkedin.svg';
import twitter from '@/assets/icons/twitter.svg';
import edit from '@/assets/icons/edit.svg';

const SocialInfo: FC = () => {
  return (
    <div className='pt-[15px]'>
      <h3 className={userInfo.contactDetail}>Contact details</h3>
      <div className={`${userInfo.sameFlexBetween} py-[10px]`}>
        <div className={`${userInfo.sameFlexTogether} gap-[10px]`}>
          <img
            className='w-[20px] h-[20px]'
            src={linkedin}
            alt='linkedinlogo'
          />
          <div>
            <h5 className={userInfo.socialTitle}>Linkedin</h5>
            <a className={userInfo.socialLink} href='#'>
              Linkedin Link htppsda.//wd
            </a>
          </div>
        </div>
        <div className={userInfo.edit}>
          <img className='w-[20px] h-[20px]' src={edit} alt='' />
        </div>
      </div>
      <div className={userInfo.sameFlexBetween}>
        <div className={`${userInfo.sameFlexTogether} gap-[10px]`}>
          <img className='w-[20px] h-[20px]' src={twitter} alt='twitterlogo' />
          <div>
            <h5 className={userInfo.socialTitle}>Twitter</h5>
            <a className={userInfo.socialLink} href='#'>
              Twitter Link https://wda2ads
            </a>
          </div>
        </div>
        <div className={userInfo.edit}>
          <img className='w-[20px] h-[20px]' src={edit} alt='' />
        </div>
      </div>
    </div>
  );
};

export default SocialInfo;
