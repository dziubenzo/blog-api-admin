import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Protector({ children }) {
  const navigate = useNavigate();
  const { isAuth } = useOutletContext();

  // Redirect to login form if state is false
  useEffect(() => {
    if (!isAuth) {
      return navigate('/');
    }
  });

  return <>{children}</>;
}

Protector.propTypes = {
  children: PropTypes.element,
};

export default Protector;
