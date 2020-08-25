import React from 'react';
import styles from './index.scss';
import { createPortal } from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { handleClickOutside } from 'utils/handleClickOutside';
import close from 'assets/images/close.png';
import PropTypes from 'prop-types';

const Modal = props => {
  const ref = React.useRef(null);
  const enterKey = 27;
  const closeModalOutside = React.useCallback(() => {
    if (!props.isResultModal) {
      props.toggle();
    }
  }, [props]);

  React.useEffect(() => {
    const handleKeyDown = event => {
      if (!props.isResultModal && event.keyCode === enterKey) {
        props.toggle();
      }
    };

    disableBodyScroll();
    document.addEventListener(
      'mousedown',
      handleClickOutside(ref, closeModalOutside)
    );
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      enableBodyScroll();
      document.removeEventListener(
        'mousedown',
        handleClickOutside(ref, closeModalOutside)
      );
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.modal} ref={ref}>
        {!props.isResultModal ? (
          <div className={styles.close} onClick={props.toggle}>
            <img src={close} alt="" />
          </div>
        ) : (
          ''
        )}
        {props.children}
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

Modal.Content = props => {
  return <div className={styles.content}>{props.children}</div>;
};

Modal.Header = props => {
  return <div className={styles.header}>{props.children}</div>;
};

Modal.Button = props => {
  return (
    <button
      className={styles.modal_button}
      onClick={props.action}
      disabled={props.loading}
    >
      {props.children}
    </button>
  );
};

Modal.Buttons = props => {
  return <div className={styles.buttons}>{props.children}</div>;
};

Modal.propTypes = {
  toggle: PropTypes.func,
  children: PropTypes.array,
  action: PropTypes.func,
};

Modal.defaultProps = {
  toggle: () => {},
  children: [],
  action: () => {},
};

Modal.Content.propTypes = {
  children: PropTypes.array,
};

Modal.Content.defaultProps = {
  children: [],
};

Modal.Header.propTypes = {
  children: PropTypes.array,
};

Modal.Header.defaultProps = {
  children: [],
};

Modal.Button.propTypes = {
  children: PropTypes.array,
  action: PropTypes.func,
  loading: PropTypes.bool,
};

Modal.Button.defaultProps = {
  children: [],
  action: () => {},
  loading: false,
};

Modal.Buttons.propTypes = {
  children: PropTypes.array,
};

Modal.Buttons.defaultProps = {
  children: [],
};

export default Modal;
