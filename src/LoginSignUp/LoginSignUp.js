import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Image, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LoginSignUp.css'
const LoginSignUp = () => {
  const [selectedGender, setSelectedGender] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };
  return (
    <div id='user-register'>
      <div className="vh-100 g-0">
        <Row className="align-items-center g-0">
          {/* Left side */}
          <Col lg={6} className="position-relative d-none d-lg-block" style={{ height: '100vh' }}>
            <div className="bg-holder" style={{ backgroundImage: `url(/img/side_background_image.jpg)` }}></div>
          </Col>
          {/* Left side */}
          {/* Right side */}
          <Col lg={6}>
            <Row className="align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
              <Col sm={6} lg={7} xl={6}>
                {/* Logo */}
                <div className="text-center mb-3">
                  <Image src="/img/logo_web_page.jpg" className="logo-img" alt="Logo" fluid />
                </div>
                {/* Logo */}
                <div className="text-center mb-4">
                  <h3 className="fw-bold">Đăng ký tài khoản</h3>
                </div>
                <Form>
                  <FloatingLabel style={{ fontSize: '1rem' }} className="mb-3" controlId="formBasicUsername" label="Tên người dùng">
                    <Form.Control type="text" placeholder="Tên người dùng" required />
                  </FloatingLabel>
                  <FloatingLabel style={{ fontSize: '1rem' }} className="mb-3" controlId="formBasicFullNamw" label="Tên đầy đủ">
                    <Form.Control type="text" placeholder="Tên đầy đủ" required />
                  </FloatingLabel>
                  {/* <FloatingLabel style={{ fontSize: '1rem' }} className="mb-3" controlId="formBasicEmail" label="Địa chỉ">
                    <Form.Control type="text" placeholder="Địa chỉ" required />
                  </FloatingLabel> */}
                  <FloatingLabel className="mb-3" controlId="formBasicCheckbox">
                    <div className='gender-div'>
                      <Form.Label style={{ marginRight: '24px', fontSize: '1.1rem', fontWeight: 'bold' }}>Gender: </Form.Label>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Check inline className='gender' type="radio" label="Female" value="Female" checked={selectedGender === "Female"} onChange={handleGenderChange}/>
                        <Form.Check inline className='gender' type="radio" label="Male" value="Male" checked={selectedGender === "Male"} onChange={handleGenderChange}/>
                        <Form.Check inline className='gender' type="radio" label="Other" value="Other" checked={selectedGender === "Other"} onChange={handleGenderChange}/>

                      </div>
                    </div>
                  </FloatingLabel>

                  <FloatingLabel style={{ fontSize: '1rem' }} className="mb-3" controlId="formBasicDate" label="Ngày sinh">
                    <Form.Control
                      type="date"
                    />
                  </FloatingLabel>

                  <Row className="mb-3">
                    <FloatingLabel style={{ fontSize: '1rem' }} as={Col} controlId="formGridSDT" label="SĐT">
                      <Form.Control type="text" placeholder="Số điện thoại" required />
                    </FloatingLabel>

                    <FloatingLabel style={{ fontSize: '1rem' }} as={Col} controlId="formGridClass" label="Class">
                      <Form.Control type="text" placeholder="Class" required />
                    </FloatingLabel>
                  </Row>


                  <FloatingLabel style={{ fontSize: '1rem' }} className="mb-3" controlId="formBasicPassword" label="Mật khẩu">
                    <Form.Control type="password" placeholder="Mật khẩu" required />
                  </FloatingLabel>
                  <FloatingLabel style={{ fontSize: '1rem' }} className="mb-3" controlId="formBasicPasswordRetype" label="Xác nhận mật khẩu">
                    <Form.Control type="password" placeholder="Xác nhận mật khẩu" required />
                    {/* Thêm thông báo lỗi khi nhập lại mật khẩu không khớp */}
                    <div className="error-message" id="retypePasswordError" role="alert"></div>
                  </FloatingLabel>
                  <Button variant="danger" type="submit" className="w-100">
                    Đăng ký
                  </Button>
                </Form>
                {/* Form */}
                <div className="text-center">
                  <small>Đã có tài khoản? <Link to="/login" className="fw-bold">Đăng nhập</Link></small>
                </div>
              </Col>
            </Row>
          </Col>
          {/* Right side */}
        </Row>
      </div>
    </div>

  );
}

export default LoginSignUp