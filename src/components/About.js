import { Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "axios";

const About = () => {
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
                    <div className="col">
                        <div className="d-flex h-100">
                            <div className="justify-content-center align-self-center" style={{ fontSize: "19px" }}>
                                <h2>
                                    <strong>Objek Wisata di Kota Semarang</strong>
                                </h2>
                                <p>
                                    Kami akan mengajak Anda untuk menjelajahi berbagai tempat
                                    wisata Semarang dan sekitarnya. Wisata Semarang selalu menarik
                                    untuk dikunjungi karena menawarkan pesona keindahan yang luar
                                    biasa.
                                </p>
                                <p>
                                    Ada banyak pilihan destinasi wisata di ibukota Provinsi Jawa
                                    Tengah itu, antara lain wisata alam, mulai pantai, pegunungan,
                                    hingga air terjun. Ada wisata budaya serta wahana wisata yang
                                    menawarkan berbagai atraksi menarik.
                                </p>
                                <p>
                                    Untuk mempermudah Anda memilih objek wisata yang akan
                                    dikunjungi, kami akan membagi wisata Semarang berdasarkan
                                    lokasi yang dituju, yakni wisata sejarah dan budaya, wisata
                                    alam, dan wisata edukasi dan permainan.
                                </p>
                                <p>
                                    Semarang punya banyak destinasi wisata sejarah dan budaya yang
                                    cukup menarik untuk dikunjungi. Berikut rekomendasi tempat
                                    wisata sejarah dan budaya di Semarang.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <Image src="assets/image/aboutpage.svg" width="100%" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
