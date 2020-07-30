import React from 'react';
import Checkbox from 'components/Checkbox';
import styles from './index.scss';
import PropTypes from 'prop-types';

const Answer = props => {
  return (
    <div className={styles.answer}>
      <Checkbox
        checked={props.is_right}
        className={styles.answer_checkbox}
        id={props.id}
        text={props.text}
      />
      <div className={styles.text}>{props.text}</div>
    </div>
  );
};

Answer.propTypes = {
  is_right: PropTypes.bool,
  text: PropTypes.string,
};

Answer.defaultProps = {
  is_right: false,
  text: '',
};

export default Answer;
