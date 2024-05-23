import React, { useEffect, useState } from 'react'
import './Result.css'
import { useLocation } from 'react-router-dom';
import { MdOutlineLeaderboard } from "react-icons/md";
import axios from 'axios';
import Chart from "chart.js/auto"
import Question from '../Question/Question';
import { CategoryScale } from 'chart.js/auto';
import PieChart from '../components/PieChart';
Chart.register(CategoryScale)
const Result = () => {
    const location = useLocation()
    const { startTime, finishTime, userAnswers } = location.state || {}
    const payload = { startTime, finishTime, userAnswers }
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [postError, setPostError] = useState(null)
    const baseUrl = 'http://localhost:8000/api/submit-quizz/1'
    const [questions, setResultAnswers] = useState([])

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const postData = async (url, body) => {
            setIsLoading(true);
            try {
                const response = await axios.post(url, body, { cancelToken: source.token });
                if (isMounted && response.data) {

                    setResultAnswers(response.data.responseAnswerQuestionDTOList)
                    setData(response.data);
                    setPostError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setData(null);
                    setPostError(err.message);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        postData(baseUrl, payload);

        return () => {
            isMounted = false;
            source.cancel();
        };
    }, [baseUrl]);
    console.log(questions)
    const chartData = {
        labels: ["Làm đúng", "Làm sai", "Chưa hoàn thành"],
        datasets: [{
            data: [questions.filter(q => q.userAnswer === q.correctAnswer).length, questions.filter(q => q.userAnswer !== q.correctAnswer).length, questions.filter(q => q.userAnswer === null).length],
            backgroundColor: [
                "rgb(56, 142, 60)",
                "#c81f17",
                "#dee2e6"
            ],
            borderColor: "transparent"
        }]
    };
    const getStartInfor = () => {
        const timestamp = new Date(startTime)
        const day = timestamp.getUTCDate();
        const month = timestamp.getUTCMonth() + 1
        const hours = timestamp.getUTCHours().toString().padStart(2, '0')
        const minutes = timestamp.getUTCMinutes().toString().padStart(2, '0');

        return `${day} tháng ${month} lúc ${hours}:${minutes}`
    }
    const calculateExamTakingTime = () => {
        const timeDiff = new Date(finishTime) - new Date(startTime)
        const minutes = Math.floor(timeDiff / 60000);
        const seconds = Math.floor((timeDiff % 60000) / 1000);

        return `${minutes} phút ${seconds} giây`
    }
    return (
        <div id='result-page'>
            <div className="container-fluid">

                <div className="exam-result">


                    <div className="point-container">
                        <div className="insights">

                            <div className="point insights-bg-first">
                                <div className="middle-first">
                                    <div className="df aic jcc pr"
                                        style={{ width: '100%', minHeight: '88px', background: '#c81f17', borderRadius: '16px 16px 0px 0px', padding: '12px' }}>
                                        <h6 className="MuiTypography-root MuiTypography-h6 MuiTypography-alignCenter semi-bold css-gkttbi"
                                            id="score-view-point"
                                            style={{ marginRight: '8px', color: 'white', fontSize: '1.4rem' }}>
                                            {`${Number(data.score).toFixed(2)}/10`}</h6>
                                    </div>

                                    <div className="text-content">
                                        <div className="df jcsb w100" style={{ marginBottom: '12px' }}>
                                            <div className="df aic">
                                                <p className="MuiTypography-root MuiTypography-body2 css-1jg1chf"
                                                    style={{ marginRight: '16px', minWidth: '56px' }}>Thời gian làm bài</p>
                                            </div>
                                            <div className="MuiBox-root css-0">
                                                <p
                                                    className="MuiTypography-root MuiTypography-body2 MuiTypography-alignRight semi-bold css-pm05iu">
                                                    {calculateExamTakingTime()}</p>
                                            </div>
                                        </div>
                                        <div className="df jcsb w100" style={{ marginBottom: '12px' }}>
                                            <div className="df aic">
                                                <p className="MuiTypography-root MuiTypography-body2 css-1jg1chf"
                                                    style={{ marginRight: '16px', minWidth: '56px' }}>Bắt đầu</p>
                                            </div>
                                            <div className="MuiBox-root css-0">
                                                <p
                                                    className="MuiTypography-root MuiTypography-body2 MuiTypography-alignRight semi-bold css-pm05iu">
                                                    {getStartInfor()}</p>
                                            </div>
                                        </div>
                                        <div className="df jcsb w100" style={{ marginBottom: '12px' }}>
                                            <div className="df aic">
                                                <p className="MuiTypography-root MuiTypography-body2 css-1jg1chf"
                                                    style={{ marginRight: '16px', minWidth: '56px' }}>Xếp hạng</p>
                                            </div>
                                            <div className="MuiBox-root css-0">
                                                <p
                                                    className="MuiTypography-root MuiTypography-body2 MuiTypography-alignRight semi-bold css-pm05iu">
                                                    36/36</p>
                                            </div>
                                        </div>
                                        <div className="df jcsb w100" style={{ marginBottom: '12px' }}>
                                            <div className="df aic">
                                                <p className="MuiTypography-root MuiTypography-body2 css-1jg1chf"
                                                    style={{ marginRight: '16px', minWidth: '56px' }}>Bài thi</p>
                                            </div>
                                            <div className="MuiBox-root css-0">
                                                <p
                                                    className="MuiTypography-root MuiTypography-body2 MuiTypography-alignRight semi-bold css-pm05iu">
                                                    Nhập môn công nghệ phần mềm</p>
                                            </div>
                                        </div>
                                        <div className="df jcsb w100">
                                            <div className="df aic">
                                                <p className="MuiTypography-root MuiTypography-body2 css-1jg1chf"
                                                    style={{ marginRight: '16px', minWidth: '56px' }}>Kỳ thi</p>
                                            </div>
                                            <div className="MuiBox-root css-0">
                                                <p
                                                    className="MuiTypography-root MuiTypography-body2 MuiTypography-alignRight semi-bold css-pm05iu">
                                                    Cuối kỳ</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="answer-porpotion insights-bg">

                                <span className="portion">
                                    <MdOutlineLeaderboard style={{ height: '1.2em', width: '1.2em' }} />
                                </span>
                                <div className="middle">
                                    <div className="rank__top">
                                        <div className="rank__top__side">
                                            <p className="rank__top__number">2</p>
                                            <div className="rank__top__avt">
                                                <img src="https://dsec.ptit.edu.vn/2020/images/avt.png" alt="" />
                                            </div>
                                            <div className="rank__top__info">
                                                <p className="rank__top__info__name">Mai Đức Bình</p>
                                                <p className="rank__top__info__className">B21DCDT006</p>
                                            </div>
                                        </div>
                                        <div className="rank__top__mid">
                                            <p className="rank__top__number">
                                                <img src="https://dsec.ptit.edu.vn/2020/images/crown@3x.png" alt="" />
                                            </p>
                                            <div className="rank__top__avt">
                                                <img src="https://dsec.ptit.edu.vn/2020/images/avt.png" alt="" />
                                            </div>
                                            <div className="rank__top__info">
                                                <p className="rank__top__info__name">Nguyễn Khánh Duy</p>
                                                <p className="rank__top__info__className">B21DCCN299</p>

                                            </div>
                                        </div>
                                        <div className="rank__top__side side_right">
                                            <p className="rank__top__number">3</p>
                                            <div className="rank__top__avt">
                                                <img src="https://dsec.ptit.edu.vn/2020/images/avt.png" alt="" />
                                            </div>
                                            <div className="rank__top__info">
                                                <p className="rank__top__info__name">Phạm Việt Dũng</p>
                                                <p className="rank__top__info__className">B21DCCN279</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!--Point container section end--> */}
                            <div className="answer-detail insights-bg p-0" id="no-padding">
                                <h3 className="text-center mt-2" style={{ color: '#c81f17' }}>Biểu đồ bài làm</h3>
                                <div className="row w-100 pie-div">
                                    <PieChart chartData={chartData} />
                                </div>
                            </div>
                        </div>
                        {/* <!--Header section end--> */}

                        <div className="bot">
                            {/* <!--Main section start--> */}
                            <div className="question-view-container exam-content card">
                                {/* <!-- Question detail section start -->
                            
                            <!-- Question detail section end --> */}
                                {isLoading && <p className='statusMsg'>Loading Post ....</p>}
                                {!isLoading && postError && <p className='statusMsg'>There is something wrong</p>}
                                {!isLoading && !postError && (questions.length ?
                                    <div>
                                        {questions.map((question, index) => (
                                            <div id={`list-item-${index}`} class="card mb-3">
                                                <h5 className={(question.correctAnswer === question.userAnswer) ? "card-header header-correct" : "card-header header-error"}>Question {index + 1}</h5>
                                                <div className="card-body">
                                                    <p className="card-text fs-4">{question.questionContent}</p>
                                                    <Question question={question} index={index} handleClick={null} flag={0} />


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


                            {/* <!--Main section end-->

                        <!--Right section start--> */}
                            <div className="card table-question-card">
                                <div className="detail-table">
                                    <h2 className="card-title text-center" style={{ color: '#8A0202' }}>Answers</h2>
                                    <p className="card-text text-center" style={{ color: '#8A0202' }}>Questions 4/5</p>
                                    <table className="tb-root table-hover">
                                        <thead className="tb-header">
                                            <tr className="header-row">
                                                <th className="header-cell" scope="col" colSpan="1">
                                                    <p className="wbbw header-content"></p>
                                                </th>
                                                <th className="header-cell" scope="col" colSpan="1">
                                                    <p className="header-content" style={{ color: 'white', fontWeight: 'bold' }}>Câu
                                                    </p>
                                                </th>
                                                <th className="header-cell" scope="col" colSpan="3">
                                                    <p className="header-content" style={{ color: 'white', fontWeight: 'bold' }}>Chọn
                                                    </p>
                                                </th>
                                                <th className="header-cell" scope="col" colSpan="3">
                                                    <p className="header-content" style={{ color: 'white', fontWeight: 'bold' }}>Đáp
                                                        án
                                                        đúng</p>
                                                </th>
                                                <th className="header-cell" scope="col" colSpan="2">
                                                    <p className="header-content" style={{ color: 'white', fontWeight: 'bold' }}>Điểm
                                                    </p>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="tb-body">
                                            {
                                                questions.map((question, index) => (
                                                    <tr className="body-row" id={`${index + 1}`} onclick="rowClicked(this)">
                                                        <td className="first-row-cell">
                                                            <p className="df aic jcc css-1dtoqh9">
                                                                <svg className="css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" style={{width: '12px',height: '12px', transform: 'translate(0, 2px)',}}>
                                                                    {(question.correctAnswer === question.userAnswer) && <circle cx="12" cy="12" r="8" fill="rgb(56, 142, 60)"></circle>}
                                                                    {(question.correctAnswer !== question.userAnswer) && <circle cx="12" cy="12" r="8" fill="#c81f17"></circle>}
                                                                    
                                                                </svg>
                                                            </p>
                                                        </td>
                                                        <td className="row-cell" colSpan="1">
                                                            <p className="css-1dtoqh9 wbbw">{index + 1}</p>
                                                        </td>
                                                        <td className="row-cell" colSpan="3">
                                                            <p className="css-1dtoqh9 wbbw">
                                                            {question.questionAnswers[question.userAnswer].answer ? question.questionAnswers[question.userAnswer].answer : "no answer"}
                                                            </p>
                                                        </td>
                                                        <td className="row-cell" colSpan="3">
                                                            <p className="css-1dtoqh9 wbbw">Mercury</p>
                                                        </td>
                                                        <td className="row-cell" colSpan="2">
                                                            <p className={(question.correctAnswer === question.userAnswer) ? "css-1dtoqh9 wbbw point-correct" : "css-1dtoqh9 wbbw point-error"}>{Number((10/questions.length).toFixed(2))}</p>
                                                        </td>
                                                    </tr>
                                                ))

                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result