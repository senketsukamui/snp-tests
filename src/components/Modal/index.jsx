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
      <div className={styles.modal}>{props.children}</div>
    </div>,
    document.querySelector('#modal')
  );
};

Modal.Content = props => {
  return (
    <>
      <div className={styles.content}>{props.children}</div>
    </>
  );
};

Modal.Header = props => {
  return (
    <>
      <div className={styles.header}>{props.children}</div>
    </>
  );
};

Modal.Button = props => {
  return (
    <>
      <button className={styles.modal_button} onClick={props.action}>
        {props.children}
      </button>
    </>
  );
};

Modal.Buttons = props => {
  return <div className={styles.buttons}>{props.children}</div>;
};
export default Modal;
