import React, { useState } from 'react'
import axios from 'axios';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            history.push("/home");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    return (
        <section class="vh-100">
            <div class="container-fluid h-custom">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div className="columns is-centered">
                        <Image
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            class="img-fluid"
                            alt="Sample image"
                        />
                        <div className="column is-4-desktop" style={{ marginTop: "90px" }}>
                            <form onSubmit={Auth} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p class="lead fw-normal mb-0 me-3">Sign In</p>
                                </div>

                                <div class="divider d-flex align-items-center my-4">
                                    {/* <p class="text-center fw-bold mx-3 mb-0">Or</p> */}
                                </div>
                                <div class="form-outline mb-4">
                                    <label className="form-label">Email or Username</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div class="form-outline mb-4">
                                    <label className="form-label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Login</button>
                                    <p class="small fw-bold mt-2 pt-1 mb-0">
                                        Don't have an account?
                                        <a href="/register" class="link-danger">
                                            Register
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login