import React from 'react';
import styles from './index.scss';
import { useSelector } from 'react-redux';
import { actions } from 'models/tests/slice';
import { testsListSelector } from '../../../models/tests/selectors';
import TestListItem from './TestsListItem';
import { Formik, Field, Form } from 'formik';
import useAction from 'hooks/useAction';

const { getTests, createTest } = actions;

const TestsList = () => {
  const onGetTests = useAction(getTests.type);
  const onCreateTest = useAction(createTest.type);

  React.useEffect(() => {
    onGetTests();
  }, [onGetTests]);

  const tests = useSelector(testsListSelector);

  const testsToRender = tests.map(test => (
    <TestListItem {...test} key={test.id} />
  ));

  return (
    <div className={styles.list}>
      <Formik
        initialValues={{
          title: '',
        }}
        onSubmit={values => {
          onCreateTest(values);
          console.log('formik');
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
    </div>
  );
};

export default TestsList;
