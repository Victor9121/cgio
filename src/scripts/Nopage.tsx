import React from 'react';
import { Link } from 'react-router-dom';

const Nopage: React.FC = () => {

  React.useEffect(() => {
    alert("Invalid URL");
  }, []);

  return (
    <div>
      <Link to='/login'>
        <button className='place'>Go to Home</button>
      </Link>
    </div>
  );
};

export default Nopage;
