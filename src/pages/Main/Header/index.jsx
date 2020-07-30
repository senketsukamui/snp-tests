import React from 'react';
import styles from './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { usernameSelector, isAdminSelector } from 'models/users/selectors';
import { actions } from 'models/users/slice';

const { userLogout } = actions;

const Header = () => {
  const dispatch = useDispatch();

  const username = useSelector(usernameSelector);

  const isAdmin = useSelector(isAdminSelector);

  const handleLogoutClick = React.useCallback(() => {
    dispatch(userLogout());
  }, [dispatch]);

  return (
    <div className={styles.header}>
      <div className={styles.user_info}>
        <div className={styles.username}>User: {username}</div>
        <div className={styles.admin}>Admin: {isAdmin ? 'Yes' : 'No'}</div>
      </div>
      <button className={styles.logout} onClick={handleLogoutClick}>
        Logout
      </button>
    </div>
  );
};

export default Header;
