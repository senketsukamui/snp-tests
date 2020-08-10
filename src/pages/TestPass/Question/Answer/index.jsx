import React from 'react';
import styles from './index.scss';
import Radio from 'components/Radio';
import Checkbox from 'components/Checkbox';
import PropTypes from 'prop-types';

const Answer = props => {
  const [checkboxState, changeCheckboxState] = React.useState(false);
  const handleCheckboxChange = React.useCallback(() => {
    changeCheckboxState(!checkboxState);
    props.changeCurrentAnswers(props.id, !checkboxState);
  }, [checkboxState, props]);
  const handleRadioChange = React.useCallback(() => {
    props.changeRadio(props.id);
  }, [props]);
  return (
    <div className={styles.answer}>
      {props.type === 'single' ? (
        <>
          <Radio checked={props.radioChecked} onChange={handleRadioChange} />
          <div className={styles.radio_text}>{props.text}</div>
        </>
      ) : (
        <>
          <Checkbox
            checked={checkboxState}
            change={handleCheckboxChange}
            pass
          />
          <div className={styles.text}>{props.text}</div>
        </>
      )}
    </div>
  );
};

Answer.propTypes = {
  changeCurrentAnswers: PropTypes.func,
  changeRadio: PropTypes.func,
  radioChecked: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.number,
};

Answer.defaultProps = {
  changeCurrentAnswers: () => {},
  changeRadio: () => {},
  radioChecked: false,
  text: 'default text',
  type: PropTypes.string,
  id: 1,
};

export default React.memo(Answer);
