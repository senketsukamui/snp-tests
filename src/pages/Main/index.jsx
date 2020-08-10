import React from 'react';
import styles from './index.scss';
import { useSelector } from 'react-redux';
import {
  isAuthorizedSelector,
  isLoadingSelector,
} from '../../models/users/selectors';
import Header from 'pages/Main/Header';
import TestsList from 'pages/Main/TestsList';
import { useHistory } from 'react-router-dom';
import useAction from 'hooks/useAction';
import { getTests } from 'models/testsq/slice';
import Loader from 'components/Loader';

const Main = () => {
  const history = useHistory();
  const isAuthorized = useSelector(isAuthorizedSelector);
  const isLoading = useSelector(isLoadingSelector);
  const onGetTests = useAction(getTests.type);
  const [currentPage, changeCurrentPage] = React.useState(1);
  const [currentSearch, changeCurrentSearch] = React.useState('');
  const [currentSort, changeCurrentSort] = React.useState('created_at_desc');

  React.useEffect(() => {
    onGetTests({
      page: currentPage,
      order: currentSort,
      search: currentSearch,
    });
  }, [onGetTests, currentSort, currentPage, currentSearch]);

  const handlePageChange = React.useCallback(
    direction => () => {
      if (direction === 'left') {
        changeCurrentPage(currentPage - 1);
      } else if (direction === 'right') {
        changeCurrentPage(currentPage + 1);
      }
    },
    [currentPage]
  );

  const handleSearchChange = React.useCallback(e => {
    changeCurrentSearch(e.target.value);
  }, []);

  const handleSortChange = React.useCallback(
    sort => () => {
      changeCurrentSort(sort);
    },
    []
  );

  if (!isAuthorized) {
    history.push('/auth');
  }
  if (isLoading) {
    return <Loader />;
  }

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

export default React.memo(Main);
