import React from 'react';
import styles from './index.scss';
import Radio from 'components/Radio';
import Checkbox from 'components/Checkbox';

const Answer = props => {
  const [checkboxState, changeCheckboxState] = React.useState(false);
  const handleCheckboxChange = () => {
    changeCheckboxState(!checkboxState);
    props.changeCurrentAnswers(props.id, !checkboxState);
  };
  const handleRadioChange = () => {
    props.changeRadio(props.id);
  };
  return (
    <div className={styles.answer}>
      {props.type === 'single' ? (
        <>
          <Radio checked={props.radioChecked} onChange={handleRadioChange} />
          <div>{props.text}</div>
        </>
      ) : (
        <>
          <Checkbox
            checked={checkboxState}
            change={handleCheckboxChange}
            pass={true}
          />
          <div>{props.text}</div>
        </>
      )}
    </div>
  );
};

export default Answer;
