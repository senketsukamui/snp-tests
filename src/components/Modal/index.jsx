import React from 'react';
import styles from './index.scss';
import { createPortal } from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const Modal = props => {
  const body = document.querySelector('body');
  React.useEffect(() => {
    disableBodyScroll(body);
    return () => {
      enableBodyScroll(body);
    };
  });

  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        {props.children}
        <div className={styles.buttons}>
          <button className={styles.modal_button} onClick={props.action}>
            Yes
          </button>
          <button onClick={props.toggle} className={styles.modal_button}>
            No
          </button>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

Modal.Header = props => {
  return (
    <>
      <div className={styles.header}>{props.children}</div>
    </>
  );
};

export default Modal;
