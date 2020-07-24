import React from 'react';
import styles from './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'models/users/slice';
import { isAuthorizedSelector } from '../../models/users/selectors';
import Header from 'pages/Main/Header';
import TestsList from 'pages/Main/TestsList';
import { useHistory } from 'react-router-dom';

const { currentSession } = actions;

const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(isAuthorizedSelector);

  React.useEffect(() => {
    if (!isAuthorized) {
      dispatch(currentSession());
    }
  }, [dispatch]);

  if (!isAuthorized) {
    history.push('/auth');
  }

  return (
    <div className={styles.main}>
      <Header />
      <TestsList />
    </div>
  );
};

export default Main;
