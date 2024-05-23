import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "./questionCard";
import "./examModal.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { deleteExam, updateExam } from "../../../services/examServices";

const modalVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const ExamModal = ({
  exam,
  onClose,
  isVisible,
  onDeleteSuccess,
  onUpdateSuccess,
}) => {
  const [examState, setExamState] = useState(exam);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleOpenConfirmDialog = () => {
    setShowConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
  };

  const handleDelete = async () => {
    handleCloseConfirmDialog();
    try {
      const response = await deleteExam(exam.id);
      if (response.status === 200) {
        onDeleteSuccess("success", "Bài thi đã được xóa thành công."); // Invoke the callback on successful deletion
      } else {
        throw new Error("Failed to delete the exam.");
      }
    } catch (error) {
      onDeleteSuccess(
        "error",
        "Có lỗi xảy ra, không thể xóa bài thi: \n" + error.message
      );
    }
  };

  const handleTitleChange = (event) => {
    setExamState({ ...examState, title: event.target.value });
  };
  const handleDurationChange = (event) => {
    setExamState({ ...examState, duration: event.target.value });
  };
  const handleTypeChange = (event) => {
    setExamState({ ...examState, type: event.target.value });
  };

  const handleUpdateExam = async () => {
    try {
      const response = await updateExam(examState.id, examState);
      if (response.status === 200) {
        onUpdateSuccess("success", "Bài thi đã được cập nhật thành công."); // Invoke the callback on successful deletion
      } else {
        throw new Error("Failed to update the exam.");
      }
    } catch (error) {
      onUpdateSuccess(
        "error",
        "Có lỗi xảy ra, không thể cập nhật bài thi: \n" + error.message
      );
    }
  };

  const handleQuestionAdd = () => {
    const newQuestion = {
      id: -1, // Generate new id for the question
      question: "",
      difficulty: 0,
      multianswer: 0,
      answer: 0,
      category: "",
      optionAnswers: [],
    };
    const updatedQuestions = [...examState.questionList, newQuestion];
    setExamState({ ...examState, questionList: updatedQuestions });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          transition={{ duration: 0.3 }}
          className="modal fade show"
          style={{ display: "block" }}
          aria-modal="true"
          role="dialog"
          onClick={onClose} // To close modal on outside click
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {examState.subject}
                </h1>
                <button
                  type="button"
                  class="btn btn-delete"
                  data-bs-dismiss="modal"
                  aria-label="Delete"
                  onClick={handleOpenConfirmDialog}
                >
                  Xoá bài
                </button>
                <Dialog
                  open={showConfirmDialog}
                  onClose={handleCloseConfirmDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Xác nhận xóa bài thi
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Bạn có chắc chắn muốn xóa bài thi này không?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <button
                      onClick={handleCloseConfirmDialog}
                      className="btn btn-secondary"
                    >
                      Hủy
                    </button>
                    <button onClick={handleDelete} className="btn btn-danger">
                      Xóa
                    </button>
                  </DialogActions>
                </Dialog>
              </div>
              <div class="modal-body">
                <div class="container-fluid">
                  <div class="row mt-4 gap-2">
                    <div class="left-side col-8 exam-content">
                      {examState.questionList.length === 0 ? (
                        <h1>Chưa có câu hỏi</h1>
                      ) : (
                        examState.questionList.map((questionData, index) => (
                          <QuestionCard
                            key={index}
                            questionData={questionData}
                            questionIndex={index}
                            setQuiz={setExamState}
                            quiz={examState}
                          />
                        ))
                      )}
                      <div class="d-grid gap-2 add-question-item-section">
                        <button
                          class="btn btn-primary add-question-item-btn"
                          type="button"
                          onClick={handleQuestionAdd}
                        >
                          <i class="bx bx-plus"></i> Thêm câu trả lời
                        </button>
                      </div>
                    </div>
                    <div class="col right-side px-0">
                      <div class="d-flex flex-column gap-3">
                        <div class="card text-center px-3 py-4">
                          <div class="input-group mb-3">
                            <span
                              class="input-group-text"
                              id="inputGroup-exam-title"
                            >
                              Tiêu đề:
                            </span>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="exam title"
                              aria-describedby="inputGroup-exam-title"
                              value={examState.title}
                              onChange={handleTitleChange}
                            />
                          </div>
                          <div class="input-group">
                            <span
                              class="input-group-text"
                              id="inputGroup-exam-taking"
                            >
                              Thời gian:
                            </span>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="time taking"
                              aria-describedby="inputGroup-exam-taking"
                              value={examState.duration}
                              onChange={handleDurationChange}
                            />
                          </div>
                          <div className="table-filter-item filter-exam-type mb-3">
                            <p className="table-filter-label form-label">
                              Loại kỳ thi:
                            </p>

                            <div className="form-check form-check-inline">
                              <input
                                defaultChecked={examState.type === 1}
                                className="form-check-input"
                                type="radio"
                                name="examTypeEdit"
                                id="allTimeEdit"
                                value={1}
                                onClick={handleTypeChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="allTimeEdit"
                              >
                                Tự do
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                defaultChecked={examState.type === 0}
                                className="form-check-input"
                                type="radio"
                                name="examTypeEdit"
                                id="timeRestrictEdit"
                                value={0}
                                onClick={handleTypeChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="timeRestrictEdit"
                              >
                                Giới hạn
                              </label>
                            </div>
                          </div>
                          <div class="card table-question-card">
                            <div class="card-body">
                              <h2 class="card-title text-center">Câu hỏi</h2>
                              <div class="table-question">
                                {examState.questionList.map(
                                  (_, questionIndex) => (
                                    <a
                                      key={questionIndex}
                                      class="table-question-item"
                                      href={`#list-item-${questionIndex}`}
                                    >
                                      {questionIndex + 1}
                                    </a>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <div class="pt-3 d-grid gap-2 col-6 mx-auto">
                            <button
                              class="btn btn-primary save-btn"
                              type="button"
                              onClick={handleUpdateExam}
                            >
                              Lưu bài
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExamModal;
