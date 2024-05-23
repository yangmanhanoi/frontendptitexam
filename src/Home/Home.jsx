import React, { createContext } from 'react'
import Quizz from '../Quizz/Quizz'
import './Home.css'
import { useHistory, useNavigate, useLocation } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide, DialogContentText } from '@mui/material'
import { useState, useEffect } from 'react'
import useAxiosFetch from '../hooks/useAxiosFetch';
import axios from 'axios'
import PageNav from '../PageNav/PageNav';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Home = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const user = location.state
    const pageNumberLimit = 5;
    const [search, setSearch] = useState('')
    const [timeOption, setTimeOption] = useState('all')
    const [sortOption, setSortOption] = useState('title')
    const [searchResult, setSearchResult] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(5);
    const [minPageLimit, setMinPageLimit] = useState(0);
    const [selectedQuizz, setSelectedQuizz] = useState({});
    const items = [10, 20, 30, 50]
    const [open, setOpen] = useState(false);
    const [pageSize, setPageSize] = useState(10)
    const [quizzes, setQuizzes] = useState([])
    const { data, isLoading, fetchError, totalPages } = useAxiosFetch('http://localhost:8000/api/quizzes', currentPage - 1, pageSize, timeOption, sortOption)

    const fields = [
        { 'title': 'Tên bài thi' },
        { 'createdAt': 'Ngày tạo' },
        { 'startedAt': 'Bắt đầu' },
        { 'endedAt': 'Kết thúc' },
        { 'score': 'Điểm' }
    ]

    useEffect(() => {
        setQuizzes(data)
    }, [data]);

    useEffect(() => {
        console.log(quizzes)
        const filterResults = quizzes.filter((quizz) => ((quizz.title).toLowerCase()).includes(search.toLowerCase())
            || ((quizz.score + '').toLowerCase()).includes(search.toLowerCase()) || ((quizz.description).toLowerCase()).includes(search.toLowerCase()));
        setSearchResult(filterResults)
    }, [quizzes, search])
    // dialog
    const onClickOpen = (row) => {
        setSelectedQuizz(quizzes[row])
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // dialog

    const handleRegister = (e) => {
        e.preventDefault()
        console.log(selectedQuizz.id)
        axios.post(`http://localhost:8000/api/users/${user.userId}/register-quizz/${selectedQuizz.id}`, {})
        .then(response => {
            console.log('Đã gọi API thành công:', response.data);
            setOpen(false)
            navigate('/register-quizz', {registerId: response.data.registerQuizId})
            // Xử lý phản hồi từ server nếu cần
        })
        .catch(error => {
            console.error('Lỗi:', error);
            // Xử lý lỗi nếu có
        });

    }
    const handlePageSizeChange = (e) => {
        e.preventDefault()
        const index = e.target.options[e.target.selectedIndex].text
        setPageSize(parseInt(index))
    }
    const handleTimeOption = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        setTimeOption(e.target.value)
    }

    const handleSortOption = (e) => {
        e.preventDefault()
        setSortOption(e.target.value)
    }
    // pagination
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const onPrevClick = () => {
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageLimit(maxPageLimit - pageNumberLimit);
            setMinPageLimit(minPageLimit - pageNumberLimit);
        }
        setCurrentPage(prev => prev - 1);
    }

    const onNextClick = () => {
        if (currentPage + 1 > maxPageLimit) {
            setMaxPageLimit(maxPageLimit + pageNumberLimit);
            setMinPageLimit(minPageLimit + pageNumberLimit);
        }
        setCurrentPage(prev => prev + 1);
    }
    const paginationAttributes = {
        totalPages,
        currentPage,
        maxPageLimit,
        minPageLimit,
    };
    // pagination
    return (
        <main className='main-section'>

            <div className='main-content'>
                <h2 className="main-content-head">Danh Sách Bài Kiểm Tra</h2>
                <div className="main-content-body">
                    <div className="table-head">
                        <div className="form-group pull-right">
                            <div className="table-filter">
                                <div className="table-filter-left">
                                    <div className="table-filter-item filter-exam-type mb-3">
                                        <p className="table-filter-label form-label">Loại kỳ thi:</p>
                                        <div className="form-check form-check-inline">
                                            <input defaultChecked className="form-check-input" type="radio" name="examType"
                                                id="allType" value="allType" />
                                            <label className="form-check-label" htmlFor="allType">Tất cả</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="examType" id="allTime"
                                                value="Tự do" />
                                            <label className="form-check-label" >Kiểm tra</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="examType" id="timeRestrict"
                                                value="Giới hạn" />
                                            <label className="form-check-label" >Luyện tập</label>
                                        </div>
                                    </div>
                                    <div className="table-filter-item filter-order-by mb-3">
                                        <p className="table-filter-label form-label">Sắp xếp theo:</p>
                                        {fields.map((field, index) => {
                                            const [key, value] = Object.entries(field)[0]; // Lấy ra cặp key-value
                                            return <div className="form-check form-check-inline" key={index}>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="orderBy"
                                                    id="examName"
                                                    value={key}
                                                    // defaultChecked={index === 0}
                                                    checked={sortOption === key}
                                                    onChange={handleSortOption}
                                                />
                                                <label className="form-check-label" htmlFor="examName">{value}</label>
                                            </div>
                                        })}
                                    </div>
                                    <div className="dataTables_length" id="dataTable_length">
                                        <label>Show
                                            <select name="dataTable_length" aria-controls="dataTable" value={pageSize} onChange={handlePageSizeChange}
                                                className="table-length" id="tb_length" >
                                                {items.map((item, index) => (
                                                    <option key={index} value={item} >{item}</option>
                                                ))}
                                            </select>entries
                                        </label>
                                    </div>
                                </div>
                                <div className="table-filter-right">
                                    <div className="table-filter-item filter-exam-subject mb-3">
                                        <label htmlFor="selectExamSubject" className="table-filter-label form-label">Thời
                                            gian tạo</label>
                                        <select className="form-select" id="selectExamSubject" aria-label="select exam subject" value={timeOption} onChange={handleTimeOption}>
                                            <option value="all" defaultValue={'Tất cả'}>Tất cả</option>
                                            <option value="day">Last 24 hours</option>
                                            <option value="week">Last 7 days</option>
                                            <option value="month">Last 30 days</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="table-search-bar">
                                <span className="counter pull-right"></span>
                                <input type="text" className="search form-control mb-3" placeholder="Nhập tiêu đề" value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="table-body">
                        <table className="table table-striped table-bordered results">
                            <thead>
                                <tr className="text-center">
                                    <th>#</th>
                                    <th className="col">Tên kỳ thi</th>
                                    <th className="col">Ngày tạo</th>
                                    <th className="col">Bắt đầu</th>
                                    <th className="col">Thời gian kết thúc</th>
                                    <th className="col">Điểm</th>
                                    <th className="col">Chi tiết</th>
                                </tr>
                                {isLoading && (<tr className="warning no-result">
                                    <td colSpan="7"><i className="fa fa-warning"></i>Loading ....</td>
                                </tr>)}
                                {!isLoading && fetchError && (<tr className="warning no-result">
                                    <td colSpan="7"><i className="fa fa-warning"></i>fetchError.message</td>
                                </tr>)}
                                {!isLoading && !fetchError && !quizzes.length &&
                                    (<tr className="warning no-result">
                                        <td colSpan="7"><i className="fa fa-warning"></i> No result</td>
                                    </tr>)}
                            </thead>

                            <tbody className="table-exam-manager text-center">
                                {!isLoading && !fetchError && quizzes.length &&
                                    <Quizz
                                        quizzes={searchResult}
                                        onClickOpen={onClickOpen}
                                    />


                                }
                            </tbody>


                        </table>
                    </div>
                    <div className="dataTables_info" id="dataTable_info" role="status"
                        aria-live="polite">Showing 1 to 25 of 57 entries</div>
                    <div className="dataTables_paginate paging_simple_numbers"
                        id="dataTable_paginate">
                        <PageNav
                            {...paginationAttributes}
                            totalPages={totalPages}
                            onPrevClick={onPrevClick}
                            onNextClick={onNextClick}
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle style={{ color: '#c81f17' }}>{selectedQuizz.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <strong>Mô tả: </strong><p>{selectedQuizz ? selectedQuizz.description +
                                " Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac" : ""}</p>

                            <strong>Thời gian làm bài: </strong><p>60 phút</p>

                            <strong>Tổng điểm: </strong><p>100</p>

                            <strong>Kết thúc:  </strong><p>{selectedQuizz ? selectedQuizz.endedAt : ""}</p>

                            <strong>Hình thức </strong><p>{selectedQuizz.type === 1 ? "Kiểm tra" : "Luyện tập"}</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{ color: '#c81f17' }} onClick={handleRegister}>Đăng ký</Button>
                        <Button style={{ color: '#c81f17' }} onClick={handleClose}>Để sau</Button>
                    </DialogActions>
                </Dialog>
            </div>


        </main>

    )
}

export default Home