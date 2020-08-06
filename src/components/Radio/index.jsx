import React from 'react';
import styles from './index.scss';

const Radio = props => {
  return (
    <label className={styles.radio}>
      <input
        type="radio"
        checked={props.checked}
        onChange={props.onChange}
        className={styles.input}
      />
      <span className={styles.image} />
    </label>
  );
};

export default Radio;
