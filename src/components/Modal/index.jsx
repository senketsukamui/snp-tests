import React from 'react';
import styles from './index.scss';
import { createPortal } from 'react-dom';

const Modal = props => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  });

  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        {props.children}
        <div className={styles.buttons}>
          <button className={styles.modal_button}>Yes</button>
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
