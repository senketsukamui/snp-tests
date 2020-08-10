import React from 'react';
import styles from './index.scss';
import PropTypes from 'prop-types';

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

Radio.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  checked: false,
  onChange: () => {},
};

export default Radio;
