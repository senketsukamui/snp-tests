import React from 'react';
import styles from './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'models/tests/slice';
import { testsListSelector } from '../../../models/tests/selectors';
import TestListItem from './TestsListItem';

const { getTests } = actions;

const TestsList = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTests());
  });

  const tests = useSelector(testsListSelector);

  const testsToRender = tests.map(test => <TestListItem {...test} />);

  return <div className={styles.list}>{testsToRender}</div>;
};

export default TestsList;
