import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import Dropzone from 'react-dropzone';
import register from '@/assets/icons/register.svg';
import { formStyles } from '@/styles/formStyles';
import { validationRegister } from '../validationSchemas/validationRegister';
import { IRegistrationState } from '@/types/registration';

const Form: FC = () => {
  const navigation = useNavigate();
  const handleSumbit = async (
    values: IRegistrationState,
    { resetForm }: any
  ) => {
    const formData = new FormData();

    Object.entries(values).forEach((item) => {
      formData.append(item[0], item[1]);
    });
    formData.append('imgPath', values.picture.name);
    try {
      const saveUser = await fetch('http://localhost:3005/auth/register', {
        method: 'POST',
        body: formData,
      });
      const response = await saveUser.json();
      if (response) {
        navigation('/');
      }
    } catch (err) {
      console.log(`${err} registration error.`);
    }
    resetForm();
  };
  return (
    <div className={formStyles.wrapper}>
      <img
        className='w-[40px] h-[40px] mx-auto mb-[20px]'
        src={register}
        alt=''
      />
      <Formik
        initialValues={initialValue}
        validationSchema={validationRegister}
        onSubmit={handleSumbit}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          setFieldValue,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className={formStyles.formWrapper}>
              <div className={formStyles.inputWrapper}>
                {touched.firstName && errors.firstName && (
                  <span className={formStyles.errorSpan}>
                    {errors.firstName}
                  </span>
                )}
                <Field
                  className={formStyles.input}
                  id='firstName'
                  type='text'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  name='firstName'
                  placeholder='First Name'
                />
              </div>
              <div className={formStyles.inputWrapper}>
                {touched.lastName && errors.lastName && (
                  <span className={formStyles.errorSpan}>
                    {errors.lastName}
                  </span>
                )}
                <Field
                  className={formStyles.input}
                  id='lastName'
                  type='text'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  name='lastName'
                  placeholder='Last Name'
                />
              </div>
              <div className={formStyles.inputWrapper}>
                {touched.occupation && errors.occupation && (
                  <span className={formStyles.errorSpan}>
                    {errors.occupation}
                  </span>
                )}
                <Field
                  className={formStyles.input}
                  id='occupation'
                  type='text'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.occupation}
                  name='occupation'
                  placeholder='Occupation'
                />
              </div>
              <div className={formStyles.inputWrapper}>
                {touched.location && errors.location && (
                  <span className={formStyles.errorSpan}>
                    {errors.location}
                  </span>
                )}
                <Field
                  className={formStyles.input}
                  id='location'
                  type='text'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.location}
                  name='location'
                  placeholder='Location'
                />
              </div>
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
              <div className={formStyles.inputWrapper}>
                {touched.picture && errors.picture && (
                  <span className={formStyles.errorSpan}>
                    User photo is required field
                  </span>
                )}
                <Dropzone
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue('picture', acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <div className={formStyles.inputDrop} {...getRootProps()}>
                      <input {...getInputProps()} />
                      {!values.picture.name ? (
                        <p className='text-white text-[12px]'>
                          Add your photo here
                        </p>
                      ) : (
                        <span className='text-white text-[12px] text-ellipsis overflow-hidden whitespace-nowrap'>
                          {values.picture.name}
                        </span>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
            <button className={formStyles.btnSubmit} type='submit'>
              Sign up
            </button>
          </form>
        )}
      </Formik>
      <div>
        <Link className={formStyles.linkLogin} to='/'>
          Already have an account? Login here.
        </Link>
      </div>
    </div>
  );
};

const initialValue = {
  firstName: '',
  lastName: '',
  location: '',
  occupation: '',
  email: '',
  password: '',
  picture: {
    name: '',
  },
};

export default Form;
