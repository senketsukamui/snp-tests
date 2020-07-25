import React from 'react';
import styles from './index.scss';

const Checkbox = props => {
  return <input className={styles.answer} type="checkbox" {...props} />;
};

export default Checkbox;
