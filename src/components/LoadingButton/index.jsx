import React from 'react';
import loading_button from 'assets/images/loading_button.gif';
import styles from './index.scss';

const LoadingButton = props => {
  return (
    <button onClick={props.action} className={styles.button}>
      {props.loading ? <img src={loading_button} /> : props.children}
    </button>
  );
};

export default LoadingButton;
