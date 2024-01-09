import { useState } from 'react';
import css from './App.module.css';

import Statistics from 'components/statistics/Statistics';
import Section from 'components/section/Section';
import FeedbackOptions from 'components/feedbackOptions/FeedbackOptions';
import Notification from 'components/notification/Notification';

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const { good, neutral, bad } = feedback;

  const addFeedbackOption = option => {
    setFeedback(feedback => ({
      ...feedback,
      [option]: feedback[option] + 1,
    }));
  };

  const total = good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    return total > 0 ? Math.round((good / total) * 100) : 0;
  };

  return (
    <div className={css.container}>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={addFeedbackOption}
        />
      </Section>
      <Section title={'Statistics'}>
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage()}
          ></Statistics>
        ) : (
          <Notification message={'There is no feedback'} />
        )}
      </Section>
    </div>
  );
};

export default App;
