import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import config from 'config';

import AppRouter from 'components/AppRouter';
import 'styles/normalize.scss';
import styles from './App.scss';
import useBrowser from 'hooks/useBrowser';
import { isLoadingSelector } from '../../models/users/selectors';
import Loader from '../Loader';

const App = ({ routes }) => {
  const browser = useBrowser();
  const isUserLoading = useSelector(isLoadingSelector);
  if (RUNTIME_ENV === 'client') {
    console.info('browser', browser);
  }


  if (isUserLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.app}>
      <Helmet {...config.app} />
      <AppRouter routes={routes} />
    </div>
  );
};

App.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default App;
