import React from 'react';
import loader from 'assets/images/loader.svg';
import styles from './index.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <img src={loader} className={styles.loader_gif} alt="" />
    </div>
  );
};

export default Loader;
