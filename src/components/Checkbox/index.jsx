import React from 'react';
import styles from './index.scss';
import { actions as answersActions } from 'models/answers/slice';
import useAction from 'hooks/useAction';
import checkbox from 'assets/images/checkbox.png';
import empty_checkbox from 'assets/images/empty-checkbox.png';

const Checkbox = props => {
  const { id, text } = props;
  const [checkedState, changeCheckedState] = React.useState(props.checked);
  const onEditAnswerStatus = useAction(answersActions.editAnswer.type);

  const handleCheckboxClick = () => {
    changeCheckedState(!checkedState);
    onEditAnswerStatus({
      is_right: !checkedState,
      id,
      text,
    });
  };

  return (
    <div className={styles.checkbox}>
      <img
        src={checkedState ? checkbox : empty_checkbox}
        className={styles.checkbox_image}
        type="checkbox"
        checked={checkedState}
        onClick={handleCheckboxClick}
        {...props}
      />
    </div>
  );
};

export default Checkbox;
