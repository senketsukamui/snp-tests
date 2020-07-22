import React from 'react';
import styles from './index.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const TestListItem = props => {
  const history = useHistory();

  const handleTestClick = () => {
    history.push(`/test/${props.id}`);
  };
  return (
    <div className={styles.item} onClick={handleTestClick}>
      <h1 className={styles.title}>{props.title}</h1>
      <div className={styles.date}>{Date(props.created_at)}</div>
    </div>
  );
};

TestListItem.propTypes = {
  title: PropTypes.string,
  created_at: PropTypes.string,
  id: PropTypes.number,
};

TestListItem.defaultProps = {
  title: 'Test',
  created_at: '',
  id: 1,
};

export default TestListItem;
