import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom';
const Login = () => {
    return (
        <div id="user-login">
            <div className="row vh-100 g-0">
                <div className="col-lg-6 position-relative d-none d-lg-block">

                    <div className="bg-holder" ></div>
            </div>

            <div className="col-lg-6">
                <div className="row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
                    <div className="col col-sm-6 col-lg-7 col-xl-6">

                        <a href="#" className="d-flex justify-content-center mb-4">
                            <img className="logo-img" src="img/logo_web_page.jpg" alt="" />
                        </a>

                        <div className="text-center mb-5">
                            <h3 className="fw-bold">Đăng nhập</h3>
                        </div>

                        <form>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="bx bx-user"></i>
                                </span>
                                <input type="text" className="username-field form-control form-control-lg fs-6"
                                    placeholder="Tên đăng nhập" value="" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="bx bx-lock-alt"></i>
                                </span>
                                <input type="password" className="password-field form-control form-control-lg fs-6"
                                    placeholder="Mật khẩu" value="" />
                            </div>
                            <div className="input-group mb-3 d-flex justify-content-between">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="formCheck" />
                                    <label for="formCheck" className="form-check-label text-secondary"><small>Ghi nhớ</small>
                                    </label>
                                </div>
                                <div>
                                    <small><a href="#">Quên mật khẩu</a></small>
                                </div>
                            </div>
                            <button type="button" className="btn btn-lg w-100" id="btn-login" onclick="checkLogin()">Đăng
                                nhập</button>
                        </form>
                        <div className="text-center">
                            <small>Chưa có tài khoản? <Link to='/register' className="fw-bold">Đăng
                                ký</Link></small>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    );
}

export default Login