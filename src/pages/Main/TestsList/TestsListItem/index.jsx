import React from 'react';
import styles from './index.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

const TestListItem = props => {
  const history = useHistory();
  const handleTestClick = () => {
    history.push({
      pathname: `/test/${props.id}`,
      state: { questions: props.questions, title: props.title },
    });
  };
  return (
    <div className={styles.item} onClick={handleTestClick}>
      <h1 className={styles.title}>{props.title}</h1>
      <div className={styles.date}>
        {format(new Date(props.created_at), 'Pp')}
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
