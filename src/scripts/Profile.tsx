import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import '../styles/profile.css';
import { deleteToken } from './Slicer';
import Button from '@mui/material/Button';


interface RootState {
  Ajio: {
    username: string;
  };
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  
  const username = useSelector((state: RootState) => state.Ajio.username);

  const deletetoken = () => {
    dispatch(deleteToken());
  };

  return (
    <div className='contain'>
      <h1>WELCOME {username}</h1>
      <h3>Your feedback is important for us</h3>
      <Formik
        initialValues={{
          text: ''
        }}
        onSubmit={(values) => {
          console.log('Form values:', values);
        }}
      >
        {() => (
          <Form>
            <Field
              as="textarea"
              rows={5}
              cols={4}
              name="text"
              placeholder="Type your message here"
            />
          </Form>
        )}
      </Formik>
      <h2>Thanks for shopping with us</h2>
      <Link to='/login'>
        <Button
          type="button" 
          className='delete'
          onClick={deletetoken}
        >
          Log out
        </Button>
      </Link>
      <Link to='/items'>
        <Button
          type="button" 
          className='gotoorders'
        >
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

export default Profile;
