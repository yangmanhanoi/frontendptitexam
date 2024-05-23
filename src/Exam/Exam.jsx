import React, { useEffect, useState, useRef } from 'react'
import './Exam.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@mui/material';
import useAxiosFetch from '../hooks/useAxiosFetchv2'
import CountDown from '../hooks/CountDown'
import Question from '../Question/Question'
const Exam = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const bundle = location.state
    //console.log(bundle)
    const [questions, setQuestions] = useState([])
    const [selectedLink, setSelectedLink] = useState(0)
    const [userAnswer, setUserAnswer] = useState([])
    const [open, setOpen] = useState(false);
    const [submitTime, setSubmitTime] = useState(null)
    const visitTimeRef = useRef(null);
   
    const { data, isLoading, fetchError } = useAxiosFetch('http://localhost:8000/api/quizzes/1', 1)
    
    
    
    useEffect(() => {
        // Try to get the visit time from localStorage
          visitTimeRef.current = new Date().toISOString();
          localStorage.setItem('visitTime', visitTimeRef.current);
        console.log('User came to this page at:', visitTimeRef.current);
      }, []);
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
        setSubmitTime(null)
      };

      const handleSubmit = () => {
        const payload = {
            startTime: visitTimeRef.current,
            finishTime: new Date().toISOString(),
            userAnswers: userAnswer
        }
        setOpen(false)
        

        navigate("/result", {state: payload})
        
      }
    const handleUserAnswer = (identifier) => {
        const parts = identifier.split("_")
        setSelectedLink(parseInt(parts[0]))
        const foundObject = userAnswer.find(item => item.questionId === questions[parts[0]].id)
        foundObject.userAnswer = parseInt(parts[1])
        console.log(userAnswer)
    }
    const handleLinkSelect = (idx) => {
        setSelectedLink(idx)
    }
    const handleQuestionItem = (index) => {
        let clName = "table-question-item"
        if (userAnswer[parseInt(index)].userAnswer != null) clName = "done table-question-item"
        if (index === selectedLink) {
            clName = clName + " active"
        }
        return clName
    }

    useEffect(() => {
        setQuestions(data)
        for (let i = 0; i < data.length; i++) {
            const aws = {
                questionId: data[i].id,
                userAnswer: null
            }
            userAnswer.push(
                aws
            )
        }
    }, [data])
    return (
        <div id='exam'>
            <div className="mx-5">
                <div className="row mt-4 gap-5">
                    <div className="col-8 exam-content">
                        <div className="exam-header text-center">
                            <h2 className="exam-title">Test 1</h2>
                            <h6 className="exam-time">60 minutes</h6>
                        </div>


                        {isLoading && <p className='statusMsg'>Loading Post ....</p>}
                        {!isLoading && fetchError && <p className='statusMsg'>fetchError.message()</p>}
                        {!isLoading && !fetchError && (questions.length ?
                            <div>
                                {questions.map((question, index) => (
                                    <div key={index} id={`list-item-${index}`} className="question-card card">
                                        <h5 className="card-header">Question {index + 1}</h5>
                                        <div className="card-body">
                                            <p className="card-text fs-4">Câu hỏi cho {question.questionContent}</p>
                                            <Question question={question} index={index} handleClick={handleUserAnswer} flag={1} />


                                        </div>
                                    </div>
                                ))}
                                <div className="exam-footer text-center">
                                    <h4>End of test !</h4>
                                    <p className="exam-notice">Please check your answer</p>
                                </div>
                            </div>
                            : <p className='statusMsg'>No post to display</p>
                        )}



                    </div>
                    <div className="col right-side px-0">
                        <div className="d-flex flex-column gap-5">
                            <div id="time" className="card card-countdown">
                                {/* Sẽ sửa đổi sau */}
                                <div className="circle">
                                    <div className="dot"></div>
                                    <svg>
                                        <circle cx="70" cy="70" r="70"></circle>
                                        <circle cx="70" cy="70" r="70" id="rr"></circle>
                                    </svg>
                                    {/* /** count down timer */}
                                    <CountDown seconds={3600} />
                                </div>
                            </div>
                            <div className="card table-question-card">
                                <div className="card-body">
                                    <h2 className="card-title text-center">Câu trả lời</h2>
                                    <p className="card-text text-center">Questions 4/5</p>
                                    <div className="table-question">
                                        {
                                            // 
                                            questions.map((question, index) => (
                                                <a key={index} onClick={() => handleLinkSelect(index)} className={handleQuestionItem(index)} href={`#list-item-${index}`}>{index + 1}</a>
                                            ))
                                        }

                                    </div>
                                </div>
                            </div>

                            <div id="submit-btn" className="submit-card card align-self-center text-center" onClick={handleClickOpen}>
                                <div className="w-100 submit-btn">
                                    <h4>
                                        Submit
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
            >
                <DialogTitle id="alert-dialog-title" style={{ color: '#c81f17' }}>
                    {"Xác nhận nộp bài thi"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn chắc chắn muốn nộp bài thi sớm?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined' color='error'>Bỏ qua</Button>
                    <Button onClick={handleSubmit} autoFocus variant='contained' color='error'>
                        Nộp bài
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Exam