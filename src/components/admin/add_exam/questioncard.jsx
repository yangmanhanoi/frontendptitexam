import React from "react";

const QuestionCard = ({ questionItem, questionItemIndex, onDelete }) => {
  return (
    <div id={`list-item-${questionItemIndex}`} className="question-card card">
      <div className="card-header">
        <h5 className="mb-0">Câu {questionItemIndex + 1}</h5>
        <button
          type="button"
          className="btn btn-delete"
          aria-label="Delete"
          onClick={() => onDelete(questionItemIndex)}
        >
          <i id={`del_${questionItemIndex}`} className="bx bx-x"></i>
        </button>
      </div>
      <div className="card-body">
        <div className="input-group input-group-lg">
          <span className="input-group-text" id="inputGroup-sizing-lg">
            Câu hỏi:
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            value={questionItem.question}
          />
        </div>
        <ul className="d-flex flex-column mt-4 mb-0 ps-0 pe-5 gap-2">
          {["A", "B", "C", "D"].map((option, index) => (
            <li key={index} className="answer-card">
              <div className="input-group mb-2">
                <span
                  className="input-group-text"
                  id={`inputGroup-sizing-default-${option}`}
                >
                  {option}
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby={`inputGroup-sizing-${option}`}
                  value={questionItem[option]}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionCard;
