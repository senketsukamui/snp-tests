import React from 'react';
import styles from './index.scss';
import { actions as answersActions } from 'models/answers/slice';
import useAction from 'hooks/useAction';

const Checkbox = props => {
  const { id, text } = props;
  const [checkedState, changeCheckedState] = React.useState(props.checked);
  const onEditAnswerStatus = useAction(answersActions.editAnswer.type);

  const handleCheckboxClick = () => {
    changeCheckedState(!checkedState);
    onEditAnswerStatus({
      is_right: checkedState,
      id,
      text,
    });
  };

  return (
    <input
      className={styles.answer}
      type="checkbox"
      checked={checkedState}
      onClick={handleCheckboxClick}
      {...props}
    />
  );
};

export default Checkbox;
