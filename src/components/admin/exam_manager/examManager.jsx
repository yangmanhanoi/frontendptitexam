import React, { useState, useEffect } from "react";
import {
  Snackbar,
  LinearProgress,
  Alert,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import ExamFilters from "./examFilters";
import ExamTable from "./examTable";
import "./examManager.css";
import { fetchAllExams } from "../../../services/examServices";
import ExamModal from "./examModal";

const ExamManager = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSatus, setSnackbarStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [examListState, setExamListState] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [filteredExams, setFilteredExams] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const data = await fetchAllExams();
    setExamListState(data);
    setFilteredExams(data);
  };

  const handleExamSelect = (exam) => {
    setSelectedExam(exam);
    setModalShow(true);
  };

  const closeModal = async () => {
    await fetchExams();
    setModalShow(false);
    setSelectedExam(null);
  };

  const handleDeleteSuccess = async (status, message) => {
    await fetchExams(); // Re-fetch the exam list
    setSnackbarMessage(message);
    setSnackbarStatus(status);
    setSnackbarOpen(true);
    closeModal(); // Close the modal
  };

  const handleUpdateSuccess = async (status, message) => {
    // await fetchExams(); // Re-fetch the exam list
    setSnackbarMessage(message);
    setSnackbarStatus(status);
    setSnackbarOpen(true);
    // closeModal(); // Close the modal
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="main-content">
      <h2 className="main-content-head">Danh Sách Bài Kiểm Tra</h2>
      <div className="main-content-body">
        <ExamFilters examList={examListState} onExamFilter={setFilteredExams} />
        <ExamTable examList={filteredExams} onExamSelect={handleExamSelect} />
        {selectedExam && (
          <ExamModal
            isVisible={modalShow}
            onClose={closeModal}
            onDeleteSuccess={handleDeleteSuccess}
            onUpdateSuccess={handleUpdateSuccess}
            exam={selectedExam}
          />
        )}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          TransitionComponent={Slide}
          action={<LinearProgress variant="determinate" value={progress} />}
        >
          <Alert variant="filled" severity={`${snackbarSatus}`}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ExamManager;
