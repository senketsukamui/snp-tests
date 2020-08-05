import React from 'react';
import styles from './index.scss';
import { actions } from 'models/users/slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  isAuthorizedSelector,
  isLoadingSelector,
} from '../../models/users/selectors';
import { useHistory } from 'react-router-dom';
import Loader from 'components/Loader';

const { userLogin } = actions;

const Authorization = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const isAuthorized = useSelector(isAuthorizedSelector);
  const isLoading = useSelector(isLoadingSelector);

  const [formState, setFormState] = React.useState({
    username: '',
    password: '',
  });

  const handleFormChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    dispatch(userLogin(formState));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthorized) {
    history.push('/');
  }

  return (
    <div className={styles.auth}>
      <div className={styles.auth_window}>
        <div className={styles.form}>
          <div className={styles.title}>Login page</div>
          <form className={styles.login} onSubmit={handleFormSubmit}>
            <label htmlFor="usrn" className={styles.form_label}>
              Username
            </label>
            <input
              className={styles.username}
              type="text"
              id="usrn"
              name="username"
              onChange={handleFormChange}
            />
            <label htmlFor="pswd" className={styles.form_label}>
              Password
            </label>
            <input
              className={styles.password}
              type="password"
              id="pswd"
              name="password"
              onChange={handleFormChange}
            />
          </form>
        </div>
        <div className={styles.buttons}>
          <button className={styles.login_button} onClick={handleFormSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
