import React from 'react';
import styles from './index.scss';
import { useSelector } from 'react-redux';
import { actions } from 'models/testsq/slice';
import {
  testsListSelector,
  metaSelector,
} from '../../../models/testsq/selectors';
import TestListItem from './TestsListItem';
import { Formik, Field, Form } from 'formik';
import useAction from 'hooks/useAction';
import left_arrow from 'assets/images/left_arrow.png';
import right_arrow from 'assets/images/right_arrow.png';
import asc from 'assets/images/asc.png';
import desc from 'assets/images/desc.png';

const { createTest } = actions;

const TestsList = props => {
  const onCreateTest = useAction(createTest.type);

  const tests = useSelector(testsListSelector);

  const testsToRender = tests
    ? Object.values(tests).map(test => <TestListItem {...test} key={test.id} />)
    : [];
  const [testTitleState, changeTestTitleState] = React.useState('');
  const meta = useSelector(metaSelector);
  const totalPages = meta.total_pages;
  const handleTestTitleChange = e => {
    changeTestTitleState(e.target.value);
  };
  const handleCreateTest = () => {
    onCreateTest(testTitleState);
  };

  return (
    <div className={styles.list}>
      <Formik
        initialValues={{
          title: '',
        }}
        onSubmit={values => {
          onCreateTest(values);
        }}
      >
        <div className={styles.create}>
          <div className={styles.header}>
            <form className={styles.test_create} onSubmit={handleCreateTest}>
              <div className={styles.input}>
                <label className={styles.input_label}>
                  Enter the test title
                </label>
                <input
                  value={testTitleState}
                  onChange={handleTestTitleChange}
                />
              </div>
              <button type="submit" className={styles.submit_button}>
                Create
              </button>
            </form>
            <div className={styles.search}>
              <input
                type="text"
                value={props.currentSearch}
                onChange={props.changeCurrentSearch}
                placeholder="Search"
              />
            </div>
            <div className={styles.sorts}>
              <button onClick={props.changeCurrentSort('created_at_asc')}>
                <img src={asc} alt="" />
              </button>
              <button onClick={props.changeCurrentSort('created_at_desc')}>
                <img src={desc} alt="" />
              </button>
            </div>
          </div>
        </div>
      </Formik>
      {testsToRender}
      <div className={styles.pagination}>
        {props.currentPage === 1 ? (
          ''
        ) : (
          <button onClick={props.changeCurrentPage('left')}>
            <img src={left_arrow} alt="" />
          </button>
        )}
        <div className={styles.page}>{props.currentPage}</div>
        {props.currentPage === totalPages ? (
          ''
        ) : (
          <button onClick={props.changeCurrentPage('right')}>
            <img src={right_arrow} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TestsList;
