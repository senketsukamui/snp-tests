import React from 'react';
import styles from './index.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import useAction from 'hooks/useAction';
import { actions as testsActions } from 'models/testsq/slice';
import edit from 'assets/images/edit.png';
import trash from 'assets/images/trash.png';

const TestListItem = props => {
  const history = useHistory();
  const onTestDelete = useAction(testsActions.deleteTest.type);
  const handleEditClick = () => {
    history.push({
      pathname: `/test/${props.id}`,
      state: { questions: props.questions, title: props.title },
    });
  };
  const handleDeleteClick = () => {
    onTestDelete({ id: props.id });
  };
  return (
    <div className={styles.item}>
      <div className={styles.item_info}>
        <h1 className={styles.title}>{props.title}</h1>
        <label className={styles.date}>
          {format(new Date(props.created_at), 'Pp')}
        </label>
      </div>
      <div className={styles.buttons}>
        <button className={styles.edit} onClick={handleEditClick}>
          <img src={edit} alt="" />
        </button>
        <button className={styles.delete} onClick={handleDeleteClick}>
          <img src={trash} alt="" />
        </button>
      </div>
    </div>
  );
};

TestListItem.propTypes = {
  title: PropTypes.string,
  created_at: PropTypes.string,
  id: PropTypes.number,
  questions: PropTypes.array,
};

TestListItem.defaultProps = {
  title: 'Test',
  created_at: '',
  id: 1,
  questions: [],
};

export default TestListItem;
