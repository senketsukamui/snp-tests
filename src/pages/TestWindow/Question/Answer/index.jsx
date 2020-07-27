import React from 'react';
import Checkbox from 'components/Checkbox';
import styles from './index.scss';

const Answer = props => {
  return (
    <div className={styles.answer}>
      <Checkbox checked={props.is_right} className={styles.answer_checkbox} />
      {props.text}
    </div>
  );
};

export default Answer;
