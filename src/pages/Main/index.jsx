import React from 'react';
import styles from './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'models/users/slice';
import { isAuthorizedSelector } from '../../models/users/selectors';
import { useHistory } from 'react-router-dom';
import Header from 'pages/Main/Header';
import TestsList from 'pages/Main/TestsList';

const { currentSession } = actions;

const Main = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  React.useEffect(() => {
    dispatch(currentSession());
  }, [dispatch]);

  const isAuthorized = useSelector(isAuthorizedSelector);

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
