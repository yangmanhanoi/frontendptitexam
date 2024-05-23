import React, { useState, useEffect } from "react";
import { Snackbar, LinearProgress, Alert } from "@mui/material";
import Slide from "@mui/material/Slide";
import UserFilters from "./userFilter";
import UserTable from "./userTable";
import UserModal from "./userModal";
import "./userManager.css";
import { fetchAllUsers } from "../../../services/userServices";

const UserManager = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSatus, setSnackbarStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [userListState, setUserListState] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await fetchAllUsers();
    setUserListState(data);
    setFilteredUsers(data);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setModalShow(true);
  };

  const closeModal = async () => {
    await fetchUsers();
    setModalShow(false);
    setSelectedUser(null);
  };

  const handleDeleteSuccess = async (status, message) => {
    await fetchUsers(); // Re-fetch the exam list
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
      <h2 className="main-content-head">Danh Sách Sinh Viên</h2>
      <div className="main-content-body">
        <UserFilters userList={userListState} onUserFilter={setFilteredUsers} />
        <UserTable userList={filteredUsers} onUserSelect={handleUserSelect} />
        {selectedUser && (
          <UserModal
            isVisible={modalShow}
            onClose={closeModal}
            onDeleteSuccess={handleDeleteSuccess}
            onUpdateSuccess={handleUpdateSuccess}
            user={selectedUser}
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

export default UserManager;
