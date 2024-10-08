import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import '../styles/login.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

interface FormValues {
  username: string;
  pin: string;
  email: string;
}

const schema = Yup.object().shape({
  username: Yup.string()
    .required("Compulsory")
    .min(3, "At least 3 characters required")
    .max(5, "Max 5 characters allowed"),
  pin: Yup.string()
    .required("Pin is required")
    .min(4, "Minimum value is 4")
    .max(4, "Exactly 4 digits allowed"),
  email: Yup.string().email("Invalid email format")
});

export default function Signup() {
  const [nav, setNav] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleSubmit = async (values: FormValues) => {
    try {
      await axios.post('http://localhost:3030/users', {
        username: values.username,
        pin: values.pin,
        email: values.email
      });
      setNav(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (nav) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='mainblock'>
      <div className="image-container">
        <img src='login.png' alt="carting" />
      </div>

      <div className='maindiv'>
        <div className='sidnimg'>
          <h2>Signup Here</h2>
        </div>

        <Formik
          initialValues={{ username: "", pin: "", email: "" }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="username">Username:</label><br/>
                <Field id="username" name="username" />
                <ErrorMessage name="username" component="div" />
              </div>
              <div>
                <label htmlFor="pin">Password:</label>
                <Field id="pin" name="pin" type="password" />
                <ErrorMessage name="pin" component="div" />
              </div>  
              <div>
                <label htmlFor="email">Email:</label>
                <Field id='email' name="email" type="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <Button type="submit" variant="contained" disabled={isSubmitting}>Sign up</Button>
              <div className='buttondisp'>
                <p>Already have an account</p>
                <Link className='signuplink' to='/login'>Sign in</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
