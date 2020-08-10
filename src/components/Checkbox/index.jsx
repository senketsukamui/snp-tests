import React from 'react';
import styles from './index.scss';
import { actions as answersActions } from 'models/answers/slice';
import useAction from 'hooks/useAction';
import checkbox from 'assets/images/checkbox.png';
import emptyCheckbox from 'assets/images/empty-checkbox.png';
import PropTypes from 'prop-types';

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
    <div className={styles.checkbox} onClick={handleCheckboxClick} {...props}>
      <img
        src={props.checked ? checkbox : emptyCheckbox}
        className={styles.checkbox_image}
        alt=""
      />
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.number,
  checked: PropTypes.bool,
  text: PropTypes.string,
  change: PropTypes.func,
  pass: PropTypes.bool,
};

Checkbox.defaultProps = {
  id: 1,
  checked: false,
  text: '',
  change: () => {},
  pass: false,
};

export default React.memo(Checkbox);
