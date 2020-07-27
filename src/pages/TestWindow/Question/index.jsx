import React from 'react';
import { useSelector } from 'react-redux';
import { answersListSelector } from '../../../models/answers/selectors';
import Answer from './Answer';
import styles from './index.scss';
import { actions as questionsActions } from 'models/questions/slice';
import useAction from 'hooks/useAction';

const Question = props => {
  const answersList = useSelector(answersListSelector);
  const onQuestionDelete = useAction(questionsActions.deleteQuestion.type);

  const handleDeleteButtonClick = () => {
    onQuestionDelete({ questionId: props.id, testId: props.testId });
  };
  return (
    <div className={styles.question}>
      <div className={styles.title}>{`${props.index + 1}. ${props.title}`}</div>
      {props.question_type === 'single' ||
      props.question_type === 'multiple' ? (
        <div className={styles.answers}>
          <div className={styles.answers_list}>
            {props.answers.length
              ? props.answers.map(answer => (
                  <Answer {...answersList[answer]} key={answer} />
                ))
              : ''}
          </div>
          <button className={styles.create}>Create new</button>
        </div>
      ) : (
        <div className={styles.number_input}>
          <input type="text" value={props.answer} />
          <button>Save</button>
        </div>
      )}
      <button onClick={handleDeleteButtonClick}>Delete question</button>
    </div>
  );
};

export default Question;
