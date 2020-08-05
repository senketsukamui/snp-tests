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
  const [currentSearch, changeCurrentSearch] = React.useState('');
  const [currentSort, changeCurrentSort] = React.useState('created_at_desc');
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

  const handleSearchChange = e => {
    changeCurrentSearch(e.target.value);
  };

  const handleSortChange = sort => () => {
    changeCurrentSort(sort);
  };
  React.useEffect(() => {
    onGetTests({
      page: currentPage,
      order: currentSort,
      search: currentSearch,
    });
  }, [onGetTests, currentPage, currentSearch, currentSort]);
  return (
    <div className={styles.main}>
      <Header />
      <TestsList
        changeCurrentPage={handlePageChange}
        currentPage={currentPage}
        currentSearch={currentSearch}
        changeCurrentSearch={handleSearchChange}
        changeCurrentSort={handleSortChange}
        currentSort={currentSort}
      />
    </div>
  );
};

export default Main;
