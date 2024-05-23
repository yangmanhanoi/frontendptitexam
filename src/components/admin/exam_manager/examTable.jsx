import React, { useState } from "react";
import { examTypes } from "../../../data/examData";

const ExamTable = ({ examList, onExamSelect }) => {
  return (
    <div className="table-body">
      <table className="table table-striped table-bordered results">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Tên kỳ thi</th>
            <th>Mô tả</th>
            <th>Loại kỳ thi</th>
            <th>Môn học</th>
            <th>Thời gian thi</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody className="table-exam-manager text-center">
          {examList.map((exam) => (
            <tr key={exam.id}>
              <th scope="row">{exam.id}</th>
              <td>{exam.title}</td>
              <td>{exam.description}</td>
              <td>{examTypes[exam.type]}</td>
              <td>{exam.subject}</td>
              <td>{exam.duration}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-detail-exam"
                  onClick={() => onExamSelect(exam)}
                >
                  Xem bài
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamTable;
