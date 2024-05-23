import moment from 'moment'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyQuizz.css'
import useAxiosFetch from '../hooks/useAxiosFetch';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@mui/material';
import axios from 'axios';
const MyQuizz = () => {
  const navigate = useNavigate()
  const { data, isLoading, fetchError } = useAxiosFetch('http://localhost:8000/api/users/1/quizzes', null, null, null, null)
  const [postLoading, setPostLoading] = useState(false)
  const [myQuizzes, setMyQuiz] = useState([]);
  const subjects = ["Nhập môn công nghệ phần mềm", "An toàn bảo mật thông tin", "Nhập môn trí tuệ nhân tạo", "Lập trình Web"]
  const times = ["60 phút", "15 phút", "30 phút"]
  const [open, setOpen] = useState(false);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(-1)
  useEffect(() => {
    setMyQuiz(data)
  }, [data])

  const handleStart = async () => {
    setPostLoading(true)
    try{
      const response = await axios.post(`http://localhost:8000/api/doing-quizz/${selectedQuizIndex}`)
      navigate('/exam-taking', {state: JSON.stringify(response.data)})
    }catch (error){
      console.error('Error posting data:', error);
    }finally{
      setPostLoading(false)
    }
    
  }

  const handleClickOpen = (id) => {
    setOpen(true);
    setSelectedQuizIndex(id)
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedQuizIndex(-1)
  };
  return (
    <div className='insights'>

      {
        myQuizzes.map((quizz, index) => (
          <div key={index} className="point insights-bg-first" onClick={() => handleClickOpen(quizz.id)}>
            <div className="middle-first" key={index}>
              <div className="df aic jcc pr"
                style={{ width: '100%', minHeight: '88px', background: '#c81f17', borderRadius: '16px 16px 0px 0px', padding: '12px' }}>
                <h6 className="MuiTypography-root MuiTypography-h6 MuiTypography-alignCenter semi-bold css-gkttbi"
                  id="score-view-point"
                  style={{ marginRight: '8px', color: 'white', fontSize: '1.4rem' }}>
                  {quizz.title}</h6>
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
                      {times[Math.floor(Math.random() * times.length)]} </p>
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
                      {moment(`${quizz.createdAt}T00:00:00`).format('HH:mm:ss DD/MM/YYYY')}</p>
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
                      {subjects[Math.floor(Math.random() * subjects.length)]}</p>
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
                      {quizz.type === 0 ? 'Cuối kỳ' : 'Giữa kỳ'}</p>
                  </div>
                </div>
              </div>

              <div className='df aic jcc pr mb-2'>
                <Button variant="outlined" color="error" style={{ width: '120px' }} onClick={() => handleClickOpen(quizz.id)}>Làm bài</Button>
              </div>

            </div>
          </div>
        ))
      }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" style={{ color: '#c81f17' }}>
          {"Xác nhận bắt đầu thi"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Lựa chọn Bắt đầu để làm bài khi sẵn sàng
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined' color='error'>Bỏ qua</Button>
          <Button onClick={handleStart} autoFocus variant='contained' color='error'>
            Bắt đầu
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}

export default MyQuizz;
