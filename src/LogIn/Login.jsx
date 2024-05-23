import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const navigate = useNavigate()
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [postError, setPostError] = useState(null)
    const onUserNameChange = (e) => {
        e.preventDefault()
        setUserName(e.target.value)
    }
    const onPasswordChange = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }
    const onSubmit = async () => {
        let isMounted = true;

        const payload = {
            username: username,
            password: password
        }
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/login', payload)
            console.log(response.data)
            localStorage.setItem('user', JSON.stringify(response.data))
            if (response.status === 200) {
                navigate("/", {state: response.data})
            }
        } catch (err) {
            if (isMounted) {
                setPostError(err.message)
            }

        } finally {
            if (isMounted) {
                setIsLoading(false);
            }
        }
    }
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
                                        placeholder="Tên đăng nhập" value={username} onChange={onUserNameChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="bx bx-lock-alt"></i>
                                    </span>
                                    <input type="password" className="password-field form-control form-control-lg fs-6"
                                        placeholder="Mật khẩu" value={password} onChange={onPasswordChange} />
                                </div>
                                <div className="input-group mb-3 d-flex justify-content-between">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="formCheck" />
                                        <label htmlFor="formCheck" className="form-check-label text-secondary"><small>Ghi nhớ</small>
                                        </label>
                                    </div>
                                    <div>
                                        <small><a href="#">Quên mật khẩu</a></small>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-lg w-100" id="btn-login" onClick={onSubmit}>Đăng
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