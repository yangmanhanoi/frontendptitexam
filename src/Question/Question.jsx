import React from 'react'
import { useState } from 'react';
const Question = ({ question, index, handleClick, flag }) => {
    const list = {
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D'
    }
    const [selectedAnswer, setAnswer] = useState(-1);
    const handleItemClick = (identifier) => {
        const parts = identifier.split("_")
        setAnswer(parseInt(parts[1]))
        handleClick(identifier);
    };
    return (
        <>
            {flag === 1 && <ul className="d-flex flex-column mt-4 ps-0 pe-5 gap-3">
                {question.questionAnswers.map((answer, idx) => (
                    <li key={idx} className={!(selectedAnswer === idx) ? "answer-card card border-secondary" : "active answer-card card border-secondary"} onClick={() => handleItemClick(`${index}_${idx}`)}>
                        <div className="answer-option d-flex align-items-center">
                            <div className="answer-card-head rounded-start align-self-stretch d-flex align-items-center px-4">{list[idx + 1]}</div>
                            <div className="answer-card-body ms-3 d-flex flex-shrink-1">
                                <p className="card-text">{answer.answer}</p>
                            </div>
                        </div>
                    </li>
                ))}

            </ul>}
            {flag === 0 && <ul className="d-flex flex-column mt-4 ps-0 pe-5 gap-3">
                {question.questionAnswers.map((answer, idx) => (
                    <li key={idx} className= {(question.correctAnswer === idx) ? "answer-card-correct answer-card card" : ((question.userAnswer === idx && question.userAnswer !== question.correctAnswer) ? "answer-card-error answer-card card" : "answer-card-normal answer-card card")} >
                        <div className="answer-option d-flex align-items-center">
                            <div className="answer-card-head  align-self-stretch d-flex align-items-center px-4">{list[idx + 1]}</div>
                            <div className="answer-card-body ms-3 d-flex flex-shrink-1">
                                <p className="card-text">{answer.answer}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>}

        </>
    )
}

export default Question