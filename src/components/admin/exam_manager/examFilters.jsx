import React, { useState, useEffect } from "react";

const ExamFilters = ({ examList, onExamFilter }) => {
  // State for filters
  const [examType, setExamType] = useState(null);
  const [orderBy, setOrderBy] = useState("0");
  const [selectedSubject, setSelectedSubject] = useState("allSubject");
  const [selectedTitle, setSelectedTitle] = useState("");

  useEffect(() => {
    filterExams();
  }, [examType, orderBy, selectedSubject, examList]);

  const filterExams = () => {
    let filteredExams = [...examList];

    // Filter by exam type
    if (examType !== null) {
      filteredExams = filteredExams.filter((exam) => exam.type === examType);
    }

    // Filter by subject
    if (selectedSubject !== "allSubject") {
      filteredExams = filteredExams.filter(
        (exam) => exam.subject === selectedSubject
      );
    }

    // Order exams
    if (orderBy === "1") {
      filteredExams.sort((a, b) => a.title.localeCompare(b.title)); // Assuming 'name' is the property for exam name
    } else {
      filteredExams.sort((a, b) => new Date(a.addDate) - new Date(b.addDate)); // Assuming 'addDate' is the property for addition date
    }

    filteredExams = filteredExams.filter((exam) =>
      exam.title.includes(selectedTitle)
    );

    onExamFilter(filteredExams);
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
                  checked={examType === null}
                  onChange={() => setExamType(null)}
                />
                <label className="form-check-label" htmlFor="allType">
                  Tất cả
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="examType"
                  id="allTime"
                  value="1"
                  checked={examType === 1}
                  onChange={() => setExamType(1)}
                />
                <label className="form-check-label" htmlFor="allTime">
                  Tự do
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="examType"
                  id="timeRestrict"
                  value="0"
                  checked={examType === 0}
                  onChange={() => setExamType(0)}
                />
                <label className="form-check-label" htmlFor="timeRestrict">
                  Giới hạn
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
                  Tên bài thi
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
                Môn học
              </label>
              <select
                className="form-select"
                id="selectExamSubject"
                aria-label="select exam subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="allSubject">Tất cả</option>
                <option value="Toán">Toán</option>
                <option value="Văn">Văn</option>
                <option value="Lịch sử">Lịch sử</option>
                <option value="Anh">Anh</option>
              </select>
            </div>
          </div>
        </div>
        <div class="table-search-bar">
          <span class="counter pull-right"></span>
          <input
            type="text"
            class="search form-control mb-3"
            placeholder="Nhập tên bài thi"
            onChange={(e) => setSelectedTitle(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ExamFilters;
