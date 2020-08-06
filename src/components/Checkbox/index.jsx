import React from 'react';
import styles from './index.scss';
import { actions as answersActions } from 'models/answers/slice';
import useAction from 'hooks/useAction';
import checkbox from 'assets/images/checkbox.png';
import empty_checkbox from 'assets/images/empty-checkbox.png';

const Checkbox = props => {
  const { id, text } = props;
  const onEditAnswerStatus = useAction(answersActions.editAnswer.type);

  const handleCheckboxClick = () => {
    props.change();
    if (!props.pass) {
      onEditAnswerStatus({
        is_right: !props.checked,
        id,
        text,
      });
    }
  };

  return (
    <div className={styles.checkbox}>
      <img
        src={props.checked ? checkbox : empty_checkbox}
        className={styles.checkbox_image}
        type="checkbox"
        checked={props.checked}
        onClick={handleCheckboxClick}
        {...props}
      />
    </div>
  );
};

export default Checkbox;
