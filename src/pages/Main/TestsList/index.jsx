import React from 'react';
import styles from './index.scss';
import { useSelector } from 'react-redux';
import { actions } from 'models/testsq/slice';
import {
  testsListSelector,
  metaSelector,
  resultSelector,
} from 'models/testsq/selectors';
import { isAdminSelector } from 'models/users/selectors';
import { questionsListSelector } from 'models/questions/selectors';
import { answersListSelector } from 'models/answers/selectors';
import TestListItem from './TestsListItem';
import useAction from 'hooks/useAction';
import leftArrow from 'assets/images/left_arrow.png';
import rightArrow from 'assets/images/right_arrow.png';
import asc from 'assets/images/asc.png';
import desc from 'assets/images/desc.png';
import search from 'assets/images/search.png';
import { validateTest } from 'utils/validate';
import PropTypes from 'prop-types';

const { createTest } = actions;

const TestsList = props => {
  const onCreateTest = useAction(createTest.type);
  const isAdmin = useSelector(isAdminSelector);
  const tests = useSelector(testsListSelector);
  const questions = useSelector(questionsListSelector);
  const answers = useSelector(answersListSelector);
  const testsIds = useSelector(resultSelector) || [];
  const validIds = React.useMemo(
    () =>
      testsIds.reduce((acc, value) => {
        if (!isAdmin) {
          if (
            validateTest(tests[value].questions, questions, answers) &&
            tests[value].questions.length
          ) {
            acc.push(value);
            return acc;
          }
          return acc;
        }
        acc.push(value);
        return acc;
      }, []),
    [answers, isAdmin, questions, tests, testsIds]
  );
  const testsToRender = validIds
    ? validIds.map(id => {
        return <TestListItem {...tests[id]} key={id} />;
      })
    : [];

  const [testTitleState, changeTestTitleState] = React.useState('');
  const meta = useSelector(metaSelector);
  const totalPages = meta.total_pages;
  const handleTestTitleChange = React.useCallback(e => {
    changeTestTitleState(e.target.value);
  }, []);
  const handleCreateTest = React.useCallback(
    e => {
      e.preventDefault();
      onCreateTest({ title: testTitleState });
    },
    [onCreateTest, testTitleState]
  );
  return (
    <div className={styles.list}>
      <div className={styles.create}>
        <div className={styles.header}>
          <form className={styles.test_create} onSubmit={handleCreateTest}>
            <div className={styles.input}>
              <input
                value={testTitleState}
                onChange={handleTestTitleChange}
                placeholder="Enter the test title"
              />
            </div>
            <button type="submit" className={styles.submit_button}>
              Create
            </button>
          </form>
          <div className={styles.search}>
            <img src={search} alt="" />
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
      {testsToRender}
      <div className={styles.pagination}>
        {props.currentPage === 1 ? (
          ''
        ) : (
          <button onClick={props.changeCurrentPage('left')}>
            <img src={leftArrow} alt="" />
          </button>
        )}
        <div className={styles.page}>{props.currentPage}</div>
        {props.currentPage === totalPages ? (
          ''
        ) : (
          <button onClick={props.changeCurrentPage('right')}>
            <img src={rightArrow} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};

TestsList.propTypes = {
  changeCurrentPage: PropTypes.func,
  currentPage: PropTypes.number,
  changeCurrentSort: PropTypes.func,
  changeCurrentSearch: PropTypes.func,
  currentSearch: PropTypes.string,
};

TestsList.defaultProps = {
  changeCurrentPage: () => {},
  currentPage: 1,
  changeCurrentSort: () => {},
  changeCurrentSearch: () => {},
  currentSearch: '',
};

export default React.memo(TestsList);
