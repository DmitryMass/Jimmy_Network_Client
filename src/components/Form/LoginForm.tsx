import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import loginIcon from '@/assets/icons/login.svg';
import { formStyles } from '@/styles/formStyles';
import { validationLogin } from '../validationSchemas/validationLogin';
import { ILoginInitialValue } from '@/types/login';
import { useDispatch } from 'react-redux';
import useActions from '@/store/storeHooks/actions';

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useActions();
  const handleSumbit = async (
    values: ILoginInitialValue,
    { resetForm }: any
  ) => {
    try {
      const loginUser = await fetch('http://localhost:3005/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const isLogged = await loginUser.json();
      resetForm();
      if (isLogged) {
        dispatch(
          login({
            user: isLogged.user,
            token: isLogged.token,
          })
        );
      }
      navigate('/home');
    } catch (err) {
      console.log(`${err} login error.`);
    }
  };

  return (
    <div className={`${formStyles.wrapper} mt-[50px]`}>
      <img
        className='w-[40px] h-[40px] mx-auto mb-[20px]'
        src={loginIcon}
        alt=''
      />
      <Formik
        initialValues={initialValue}
        validationSchema={validationLogin}
        onSubmit={handleSumbit}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className={formStyles.formWrapper}>
              <div className={formStyles.inputWrapper}>
                {touched.email && errors.email && (
                  <span className={formStyles.errorSpan}>{errors.email}</span>
                )}
                <Field
                  className={formStyles.input}
                  id='email'
                  type='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  name='email'
                  placeholder='Email'
                />
              </div>
              <div className={formStyles.inputWrapper}>
                {touched.password && errors.password && (
                  <span className={formStyles.errorSpan}>
                    {errors.password}
                  </span>
                )}
                <Field
                  className={formStyles.input}
                  id='password'
                  type='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  name='password'
                  placeholder='Password'
                />
              </div>
            </div>
            <button
              className={`${formStyles.btnSubmit} mt-[15px]`}
              type='submit'
            >
              Sign in
            </button>
          </form>
        )}
      </Formik>
      <div>
        <Link className={formStyles.linkLogin} to='/register'>
          Don't have an account? Sign up here.
        </Link>
      </div>
    </div>
  );
};

const initialValue = {
  email: '',
  password: '',
};

export default LoginForm;
