import React, { useState, useEffect } from "react";

const UserFilters = ({ userList, onUserFilter }) => {
  // State for filters
  console.log(userList);
  const [userGender, setUserGender] = useState(null);
  const [orderBy, setOrderBy] = useState("0");
  const [selectedDepart, setSelectedDepart] = useState("allDepart");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    filterUsers();
  }, [userGender, orderBy, selectedDepart, userList]);

  const filterUsers = () => {
    let filteredUsers = [...userList];

    // Filter by exam type
    if (userGender !== null) {
      filteredUsers = filteredUsers.filter(
        (user) => user.gender === userGender
      );
    }

    // Filter by subject
    if (selectedDepart !== "allDepart") {
      filteredUsers = filteredUsers.filter((user) =>
        user.userClass.includes(selectedDepart)
      );
    }

    // Order exams
    if (orderBy === "1") {
      filteredUsers.sort((a, b) => a.fullmame.localeCompare(b.fullmame)); // Assuming 'name' is the property for exam name
    } else {
      filteredUsers.sort((a, b) => a.username.localeCompare(b.username)); // Assuming 'addDate' is the property for addition date
    }

    filteredUsers = filteredUsers.filter((user) =>
      user.fullName.includes(searchName)
    );

    onUserFilter(filteredUsers);
  };

  return (
    <div className="table-head">
      <div className="form-group pull-right">
        <div className="table-filter">
          <div className="table-filter-left">
            {/* Exam Type Filters */}
            <div className="table-filter-item filter-exam-type mb-3">
              <p className="table-filter-label form-label">Loại kỳ thi:</p>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="examType"
                  id="allType"
                  value="null"
                  checked={userGender === null}
                  onChange={() => setUserGender(null)}
                />
                <label className="form-check-label" htmlFor="allType">
                  Tất cả
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userGender"
                  id="men"
                  value="1"
                  checked={userGender === 1}
                  onChange={() => setUserGender(1)}
                />
                <label className="form-check-label" htmlFor="men">
                  Nam
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userGender"
                  id="women"
                  value="0"
                  checked={userGender === 0}
                  onChange={() => setUserGender(0)}
                />
                <label className="form-check-label" htmlFor="women">
                  Nữ
                </label>
              </div>
            </div>
            {/* Order By Filters */}
            <div className="table-filter-item filter-order-by mb-3">
              <p className="table-filter-label form-label">Sắp xếp theo:</p>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="orderBy"
                  id="addDay"
                  value="0"
                  checked={orderBy === "0"}
                  onChange={() => setOrderBy("0")}
                />
                <label className="form-check-label" htmlFor="addDay">
                  Ngày thêm
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="orderBy"
                  id="examName"
                  value="1"
                  checked={orderBy === "1"}
                  onChange={() => setOrderBy("1")}
                />
                <label className="form-check-label" htmlFor="examName">
                  Tên
                </label>
              </div>
            </div>
          </div>
          {/* Subject Filter */}
          <div className="table-filter-right">
            <div className="table-filter-item filter-exam-subject mb-3">
              <label
                htmlFor="selectExamSubject"
                className="table-filter-label form-label"
              >
                Lớp
              </label>
              <select
                className="form-select"
                id="selectExamSubject"
                aria-label="select exam subject"
                value={selectedDepart}
                onChange={(e) => setSelectedDepart(e.target.value)}
              >
                <option value="allDepart">Tất cả</option>
                <option value="1">Lớp 1</option>
                <option value="2">Lớp 2</option>
                <option value="3">Lớp 3</option>
                <option value="4">Lớp 4</option>
                <option value="5">Lớp 5</option>
              </select>
            </div>
          </div>
        </div>
        <div class="table-search-bar">
          <span class="counter pull-right"></span>
          <input
            type="text"
            class="search form-control mb-3"
            placeholder="Nhập tên sinh viên"
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserFilters;
