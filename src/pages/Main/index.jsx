import React from 'react';
import styles from './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'models/users/slice';
import { isAuthorizedSelector } from '../../models/users/selectors';
import { useHistory } from 'react-router-dom';
import Header from 'pages/Main/Header';

const { currentSession } = actions;

const Main = () => {
  const dispatch = useDispatch();

  const isAuthorized = useSelector(isAuthorizedSelector);

  const history = useHistory();

  React.useEffect(() => {
    dispatch(currentSession());
  }, [dispatch]);

  if (!isAuthorized) {
    history.push('/auth');
  }

  return (
    <div className={styles.main}>
      <Header />
    </div>
  );
};

export default Main;
