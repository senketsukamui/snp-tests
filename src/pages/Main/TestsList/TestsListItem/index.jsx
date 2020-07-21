import React from 'react';
import styles from './index.scss';
import PropTypes from 'prop-types';

const TestListItem = props => {
  return (
    <div className={styles.item}>
      <h1 className={styles.title}>{props.title}</h1>
      <div className={styles.date}>{Date(props.created_at)}</div>
    </div>
  );
};

TestListItem.propTypes = {
  title: PropTypes.string,
  created_at: PropTypes.string,
};

TestListItem.defaultProps = {
  title: 'Test',
  created_at: '',
};

export default TestListItem;
