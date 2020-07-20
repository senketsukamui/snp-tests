import React from 'react';
import styles from './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { usernameSelector } from '../../../models/users/selectors';
import { actions } from 'models/users/slice';

const { userLogout } = actions;

const Header = () => {
  const dispatch = useDispatch();

  const username = useSelector(usernameSelector);

  const handleLogoutClick = React.useCallback(() => {
    dispatch(userLogout());
  }, [dispatch]);

  return (
    <div className={styles.header}>
      <div className={styles.username}>User: {username}</div>
      <button className={styles.logout} onClick={handleLogoutClick}>
        Logout
      </button>
    </div>
  );
};

export default Header;
