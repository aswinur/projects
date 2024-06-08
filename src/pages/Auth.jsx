import React, { useState,useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify';
import { userRegister, userLogin } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../Context Api/AuthContext';

function Auth() {
const {authStatus,setAuthStatus}=useContext(TokenAuthContext)

    const [status, setStatus] = useState(true)
    const [data, setData] = useState({
        username: "", password: "", email: ""
    })
    // console.log(data);
    const navigate = useNavigate()

    const changeStatus = () => {
        setStatus(!status)
    }

    const handleRegister = async () => {
        console.log(data);
        const { username, password, email } = data
        if (!username || !password || !email) {
            toast.warning("Invalid details....Enter form details properly..")
        }
        else {
            const result = await userRegister(data)
            console.log(result);
            if (result.status == 201) {
                toast.success("User registration successfull...")
                setData({ username: "", password: "", email: "" })
                setStatus(true)
            }
            else {
                toast.error(result.response.data)
            }

        }
    }

    const handleLogin = async () => {
        const { email, password } = data
        if (!email || !password) {
            toast.warning("Invalid details... Enter form details properly..")
        }
        else {
            const result = await userLogin({ email, password })
            console.log(result);
            if (result.status == 200) {
                sessionStorage.setItem("token", result.data.token)
                sessionStorage.setItem("username", result.data.user)
                sessionStorage.setItem("userDetails", JSON.stringify(result.data.userDetails))
                toast.success("Login successfull...")
                navigate('/')
                setAuthStatus(true)
            }
            else{
                toast.error(result.response.data)
            }

        }
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center w-100" style={{ height: '100vh' }}>
                <div className="shadow border w-50 p-4">
                    <Row>
                        <Col sm={12} md={6}>
                            <img src="https://png.pngtree.com/png-vector/20191003/ourmid/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1786166.jpg" className='img-fluid' alt="" />
                        </Col>
                        <Col sm={12} md={6}>
                            {
                                !status ?
                                    <h3>Register</h3>
                                    :
                                    <h3>Login</h3>
                            }
                            <div className="mt-4">
                                {
                                    !status &&
                                    <FloatingLabel controlid="user" label='Username' className='mb-3'>
                                        <Form.Control type='text' placeholder='username' onChange={(e) => { setData({ ...data, username: e.target.value }) }} />
                                    </FloatingLabel>
                                }
                                <FloatingLabel controlid="floatingInput" label='Emale address' className='mb-3'>
                                    <Form.Control type='emale' placeholder='name@example.com' onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlid="floatingPassword" label='Password' >
                                    <Form.Control type='password' placeholder='password' onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                                </FloatingLabel>
                            </div>

                            <div className="mt-3 d-flex justify-content-between">
                                {status ?
                                    <button className="btn btn-info" onClick={handleLogin}>
                                        <span>Login</span>
                                    </button>
                                    :
                                    <button className="btn btn-info" onClick={handleRegister}>
                                        <span>Register</span>
                                    </button>
                                }

                                <button className="btn btn-link" onClick={changeStatus}>
                                    {
                                        status ?
                                            <span>Are you new?</span>
                                            :
                                            <span>Already a user?</span>
                                    }
                                </button>
                            </div>
                        </Col>
                    </Row>
                </div>

            </div>
            {/* <ToastContainer /> */}
        </>
    )
}

export default Auth