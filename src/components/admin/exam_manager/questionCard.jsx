import React from "react";
import QuestionItem from "./questionItem";

const QuestionCard = ({ questionData, questionIndex, setQuiz, quiz }) => {
  const handleQuestionChange = (event) => {
    const updatedQuestion = { ...questionData, question: event.target.value };
    const updatedQuestionList = [...quiz.questionList];
    updatedQuestionList[questionIndex] = updatedQuestion;
    setQuiz({ ...quiz, questionList: updatedQuestionList });
  };

  const handleAnswerChange = (optionAnswerIndex, newValue) => {
    const updatedQuestion = { ...questionData };
    const updateOptionAnswer = updatedQuestion.optionAnswers[optionAnswerIndex];
    updatedQuestion.optionAnswers[optionAnswerIndex] = {
      ...updateOptionAnswer,
      content: newValue,
    };
    const updatedQuestionList = [...quiz.questionList];
    updatedQuestionList[questionIndex] = updatedQuestion;
    setQuiz({ ...quiz, questionList: updatedQuestionList });
  };

  const handleAddOptionAnswer = () => {
    const newOptionAnswers = [
      ...questionData.optionAnswers,
      { id: -1, content: "" }, // Add an empty string for a new option
    ];
    const updatedQuestion = {
      ...questionData,
      optionAnswers: newOptionAnswers,
    };
    const updatedQuestionList = [...quiz.questionList];
    updatedQuestionList[questionIndex] = updatedQuestion;
    setQuiz({ ...quiz, questionList: updatedQuestionList });
  };

  const handleDeleteQuestion = () => {
    const updatedQuestionList = quiz.questionList.filter((_, index) => index !== questionIndex);
    setQuiz({ ...quiz, questionList: updatedQuestionList });
  };

  return (
    <div id="list-item-1" class="question-card card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Câu {questionIndex + 1}</h5>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={handleDeleteQuestion}
        >
          Xóa
        </button>
      </div>
      <div class="card-body">
        <div class="input-group input-group-lg">
          <span class="input-group-text" id="inputGroup-sizing-lg">
            Câu hỏi:
          </span>
          <input
            type="text"
            class="form-control"
            value={questionData.question}
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            onChange={handleQuestionChange}
          />
        </div>
        <ul className="d-flex flex-column mt-4 mb-0 ps-0 pe-5 gap-2">
          {questionData.optionAnswers.map((optionAnswer, optionAnswerIndex) => (
            <QuestionItem
              key={optionAnswerIndex}
              label={optionAnswerIndex}
              value={optionAnswer.content}
              onChange={(newValue) =>
                handleAnswerChange(optionAnswerIndex, newValue)
              }
            />
          ))}
        </ul>
        <div class="d-grid gap-2 add-question-item-section">
          <button
            class="btn btn-primary add-question-item-btn"
            type="button"
            onClick={handleAddOptionAnswer}
          >
            <i class="bx bx-plus"></i> Thêm câu trả lời
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
