import React from 'react';
import { useSelector } from 'react-redux';
import { questionsListSelector } from '../../models/questions/selectors';
import Question from './Question';
import PropTypes from 'prop-types';
import styles from './index.scss';
import { useHistory } from 'react-router-dom';

const TestWindow = props => {
  const questionIds = props.location.state.questions;
  const questionList = useSelector(questionsListSelector);

  const renderedQuestions = questionIds.map(id => (
    <Question {...questionList[id]} key={id} />
  ));

  return <div className={styles.test}>{renderedQuestions}</div>;
};

TestWindow.propTypes = {
  location: PropTypes.object,
};

TestWindow.defaultProps = {
  location: {},
};

export default TestWindow;
