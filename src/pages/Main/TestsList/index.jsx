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

const { createTest } = actions;

const TestsList = props => {
  const onCreateTest = useAction(createTest.type);

  const tests = useSelector(testsListSelector);

  const testsToRender = Object.values(tests).map(test => (
    <TestListItem {...test} key={test.id} />
  ));

  const meta = useSelector(metaSelector);
  const totalPages = meta.total_pages;

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
        <Form className={styles.create}>
          <div className={styles.input}>
            <label className={styles.input_label}>Enter the test title</label>
            <Field name="title" />
          </div>
          <button type="submit" className={styles.submit_button}>
            Create
          </button>
        </Form>
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
