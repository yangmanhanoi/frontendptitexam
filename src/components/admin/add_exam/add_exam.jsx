import React, { useState } from "react";
import QuestionCard from "./questioncard";
import "./add_exam.css";
import { Snackbar, Alert } from "@mui/material";
import * as XLSX from "xlsx";

const defaultItemQuestion = {
  question: "",
  A: "",
  B: "",
  C: "",
  D: "",
  answer: "",
};

const AddExam = () => {
  const [examList, setExamList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarStatus, setSnackbarStatus] = useState("success");

  const handleAddQuestion = () => {
    setExamList([...examList, defaultItemQuestion]);
  };

  const handleDeleteQuestion = (index) => {
    const newList = [...examList];
    newList.splice(index, 1);
    setExamList(newList);
  };

  const handleSave = () => {
    setSnackbarMessage("Bài kiểm tra đã được lưu.");
    setSnackbarStatus("success");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const questions = jsonData.slice(1).map((row) => ({
        question: row[0],
        A: row[1],
        B: row[2],
        C: row[3],
        D: row[4],
        answer: row[5],
      }));

      setExamList(questions);
    };

    reader.readAsArrayBuffer(file);
  };

  const generateSampleExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([
      {
        question: "Câu hỏi",
        A: "Đáp án A",
        B: "Đáp án B",
        C: "Đáp án C",
        D: "Đáp án D",
        answer: "Đáp án đúng",
      },
    ]);
    XLSX.utils.book_append_sheet(wb, ws, "Mẫu câu hỏi");
    XLSX.writeFile(wb, "MauCauHoi.xlsx");
  };

  return (
    <div className="main-content">
      <h2 className="main-content-head">Tạo bài kiểm tra</h2>
      <div className="main-content-body">
        <div className="container-fluid">
          <div className="row mt-4 gap-2">
            <div className="left-side col-8 exam-content">
              {examList.map((item, index) => (
                <QuestionCard
                  key={index}
                  questionItem={item}
                  questionItemIndex={index}
                  onDelete={handleDeleteQuestion}
                />
              ))}
              <div className="d-grid gap-2 add-question-section">
                <button
                  className="btn btn-primary add-question-btn"
                  type="button"
                  onClick={handleAddQuestion}
                >
                  <i className="bx bx-plus"></i> Thêm câu hỏi
                </button>
              </div>
            </div>
            <div className="col right-side px-0">
              <div className="d-flex flex-column gap-3">
                <div className="card text-center px-3 py-4">
                  <div className="input-group mb-2">
                    <span
                      className="input-group-text"
                      id="inputGroup-exam-title"
                    >
                      Tiêu đề:
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="exam title"
                      aria-describedby="inputGroup-exam-title"
                    />
                  </div>
                  <div className="input-group">
                    <span
                      className="input-group-text"
                      id="inputGroup-exam-taking"
                    >
                      Thời gian:
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="time taking"
                      aria-describedby="inputGroup-exam-taking"
                    />
                  </div>
                  <div className="input-exam-type">
                    <p className="table-filter-label form-label">
                      Loại kỳ thi:
                    </p>
                    <div className="form-check form-check-inline">
                      <input
                        checked
                        className="form-check-input"
                        type="radio"
                        name="addExam"
                        id="allTimeEdit"
                        value="allTime"
                      />
                      <label className="form-check-label" htmlFor="allTime">
                        Tự do
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="addExam"
                        id="timeRestrictEdit"
                        value="timeRestrictEdit"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="timeRestrictEdit"
                      >
                        Giới hạn
                      </label>
                    </div>
                  </div>
                </div>
                <div className="card table-question-card">
                  <div className="card-body">
                    <h2 className="card-title text-center">Số câu hỏi</h2>
                    <div className="table-question">
                      {examList.map((_, index) => (
                        <a
                          key={index}
                          className="table-question-item"
                          href={`#list-item-${index}`}
                        >
                          {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card text-center px-3 py-4">
                  <div className="input-group">
                    <input
                      accept=".xlsx, .xls"
                      type="file"
                      className="form-control"
                      id="fileInput"
                      onChange={handleFileUpload}
                    />
                    <label className="input-group-text" htmlFor="fileInput">
                      Tải lên excel
                    </label>
                  </div>
                  <button
                    className="btn btn-secondary mt-3"
                    type="button"
                    onClick={generateSampleExcel}
                  >
                    Tải xuống mẫu Excel
                  </button>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button
                    className="btn btn-primary save-btn"
                    type="button"
                    onClick={handleSave}
                  >
                    Lưu bài
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarStatus}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddExam;
