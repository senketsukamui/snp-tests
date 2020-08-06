import React from 'react';
import styles from './index.scss';
import { useSelector } from 'react-redux';
import { testsListSelectorById } from 'models/testsq/selectors';
import { questionsListSelector } from 'models/questions/selectors';
import Question from './Question';

const TestPass = props => {
  const testInfo = useSelector(testsListSelectorById(props.match.params.id));
  const questions = useSelector(questionsListSelector);
  const correctQuestions = testInfo.questions.reduce((acc, value) => {
    acc[value] = false;
    return acc;
  }, {});
  const [correctQuestionsState, changeCorrectQuestionsState] = React.useState(
    correctQuestions
  );
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{testInfo.title}</h1>
      <div>
        {testInfo.questions.map((qst, index) => (
          <Question
            {...questions[qst]}
            index={index}
            key={questions[qst].id}
            changeCorrectQuestionsState={changeCorrectQuestionsState}
          />
        ))}
      </div>
    </div>
  );
};

export default TestPass;
