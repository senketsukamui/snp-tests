import React from 'react';
import styles from './index.scss';

const Authorization = () => {
  return (
    <div className={styles.auth}>
      <div className={styles.auth_window}>
        <div className={styles.form}>
          <div className={styles.title}>Login page</div>
          <form className={styles.login}>
            <label htmlFor="usrn" className={styles.form_label}>
              Username
            </label>
            <input className={styles.username} type="text" id="usrn" />
            <label htmlFor="pswd" className={styles.form_label}>
              Password
            </label>
            <input className={styles.password} type="text" id="pswd" />
          </form>
        </div>
        <div className={styles.buttons}>
          <button className={styles.login_button}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
