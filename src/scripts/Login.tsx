import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { setToken, setUsername } from './Slicer';
import '../styles/login.css';


interface FormValues {
  username: string;
  pin: string;
}

const schema = Yup.object().shape({
  username: Yup.string()
    .required("Compulsory")
    .min(3, "At least 3 characters required")
    .max(5, "Max 5 characters allowed"),
  pin: Yup.string()
    .required("Pin is required")
    .min(4, "Minimum value is 4")
    .max(4, "Exactly 4 digits allowed")
});

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [home, setHome] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  if (home) {
    return <Navigate to="/items" />;
  }

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await fetch('http://localhost:3030/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: { username: string; pin: string }[] = await response.json();
      const user = data.find(u => 
        u.username === values.username && u.pin === values.pin
      );

      if (user) {
        setHome(true);
        dispatch(setUsername(values.username));
        dispatch(setToken());
      } else {
        setLoginError('Invalid username or pin.');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError('An error occurred during login.');
    }
  };

  return (
    <div className='mainblock'>
      <div className="image-container">
        <img src='login.png' alt="login" />
      </div>

      <div className='maindiv'>
        <div className='sidnimg'>
          <h2>Sign in Page</h2>
        </div>
  
        <Formik
          initialValues={{ username: "", pin: "" }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="username">Username:</label>
                <Field id="username" name="username" autoComplete="off" />
                <ErrorMessage name="username" component="div" className='error' />
              </div>
              <div>
                <label htmlFor="pin">Password:</label>
                <Field id="pin" name="pin" type="password" autoComplete="off"/>
                <ErrorMessage name="pin" component="div" className='error' />
              </div>
              {loginError && <div>{loginError}</div>}
              <Button type="submit" variant='contained' disabled={isSubmitting}>Log in</Button>
              
              <div className='buttondisp'>
                <p>Don't have an account?</p>
                <div className='signuplink'>
                  <Link to='/signup'>Sign up</Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
