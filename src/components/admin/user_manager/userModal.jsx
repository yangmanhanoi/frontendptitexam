import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";

const UserModal = ({
  show,
  handleClose,
  student,
  handleDelete,
  handleSave,
}) => {
  const [formData, setFormData] = React.useState({ ...student });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Sinh viên {student.userId}</Modal.Title>
        <Button variant="danger" onClick={() => handleDelete(student.userId)}>
          Xoá sinh viên
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          <h4 className="mb-3">Thông tin cá nhân</h4>
          <Form.Group className="mb-4">
            <Form.Label htmlFor="fullName">Họ và tên</Form.Label>
            <Form.Control
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Họ và tên không được để trống.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label htmlFor="studyClass">Lớp học</Form.Label>
            <Form.Control
              type="text"
              id="studyClass"
              value={formData.studyClass}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Lớp không được để trống.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label htmlFor="username">Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Tên đăng nhập không được để trống.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label htmlFor="password">Mật khẩu</Form.Label>
            <Form.Control
              type="text"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Mật khẩu không được để trống.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label htmlFor="email">
              Email <span className="text-muted">(Tùy chọn)</span>
            </Form.Label>
            <Form.Control
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập email đúng định dạng.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label htmlFor="phone">
              Điện thoại <span className="text-muted">(Tùy chọn)</span>
            </Form.Label>
            <Form.Control
              type="text"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập số điện thoại đúng định dạng.
            </Form.Control.Feedback>
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button type="submit" variant="success">
              Lưu
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

UserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default UserModal;
