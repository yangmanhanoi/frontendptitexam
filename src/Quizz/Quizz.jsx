import React, {useContext} from 'react'
const Quizz = ({quizzes, onClickOpen}) => {
  const handleClickOpen = (id) => {
    console.log(id)
    onClickOpen(id)
  }
  return (
    <>
      {quizzes.map((quizz, index) => (
          <tr key={index} onClick={() => handleClickOpen(index)}>
          <th scope="row">{quizz.id}</th>
          <td>{quizz.title}</td>
          <td>{quizz.createdAt}</td>    
          <td>{quizz.startedAt}</td>
          <td>{quizz.endedAt}</td>
          <td>{quizz.score}</td>
          <td><button type="button" className="btn btn-primary exam-view-btn" data-bs-toggle="modal" onClick={() => handleClickOpen(quizz.id)}
              data-bs-target="#staticBackdrop4">
              Xem bài
          </button></td>
      </tr>
      ))}
    </>
  )
}

export default Quizz