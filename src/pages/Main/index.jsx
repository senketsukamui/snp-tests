import React from 'react';
import styles from './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'models/users/slice';
import { isAuthorizedSelector } from '../../models/users/selectors';
import Header from 'pages/Main/Header';
import TestsList from 'pages/Main/TestsList';
import { useHistory } from 'react-router-dom';
import useAction from 'hooks/useAction';
import { getTests } from 'models/testsq/slice';

const { currentSession } = actions;

const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(isAuthorizedSelector);
  const onGetTests = useAction(getTests.type);
  const [currentPage, changeCurrentPage] = React.useState(1);
  React.useEffect(() => {
    if (!isAuthorized) {
      dispatch(currentSession());
    }
  }, [dispatch, isAuthorized]);

  if (!isAuthorized) {
    history.push('/auth');
  }

  const handlePageChange = direction => e => {
    if (direction === 'left') {
      changeCurrentPage(currentPage - 1);
    } else if (direction === 'right') {
      changeCurrentPage(currentPage + 1);
    }
  };

  React.useEffect(() => {
    onGetTests({
      page: currentPage,
      order: 'created_at_desc',
      search: '',
    });
  }, [onGetTests, currentPage]);

  console.log(currentPage);
  return (
    <div className={styles.main}>
      <Header />
      <TestsList
        changeCurrentPage={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Main;
