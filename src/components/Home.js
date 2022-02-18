import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Image } from "react-bootstrap";

const Home = () => {
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState("");
    const [users, setUsers] = useState([]);
    const history = useHistory();
    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get("http://localhost:5000/token");
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            // setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    };

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {
                const response = await axios.get("http://localhost:5000/token");
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                setToken(response.data.accessToken);
                const decoded = jwt_decode(response.data.accessToken);
                // setName(decoded.name);
                setExpire(decoded.exp);
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const getUsers = async () => {
        const response = await axiosJWT.get("http://localhost:5000/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUsers(response.data);
    };

    return (
        <div className="container">
            <div className="d-none d-md-block">
                <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="d-flex h-100">
                            <div className="justify-content-center align-self-center" style={{ fontSize: "25px" }}>
                                <h2>
                                    <strong>Welcome to the Semarang city,</strong>
                                    <br />
                                    tourism object website
                                </h2>
                                <p>
                                    Ayo silahkan dibaca, mungkin anda akan <br />
                                    tertarik dengan objek-objek pariwisata
                                    <br />
                                    yang ada di Kota Semarang.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <Image src="assets/image/hero.svg" width="100%" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
