import React from "react";

const UserTable = ({ userList, onUserSelect }) => {
  console.log(userList);
  return (
    <div className="table-body">
      <table className="table table-striped table-bordered results">
        <thead>
          <tr className="text-centered">
            <th>#</th>
            <th>Mã người dùng</th>
            <th>Họ và tên</th>
            <th>Lớp học</th>
            <th>Trạng thái</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody className="table-user-manager text-center">
          {userList.map((user) => (
            <tr key={user.id}>
              <td>{user.userId}</td>
              <td>{user.username}</td>
              <td>{user.fullName}</td>
              <td>{user.studyClass}</td>
              <td>{user.gender ? "Nam" : ""}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onUserSelect(user)}
                >
                  Thông tin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
