/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";

const EditSchool = () => {
    const [foto, setFoto] = useState("");
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState("");
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    const updateSchool = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:4000/wisata/${id}`, {
            foto: foto,
            nama: nama,
            alamat: alamat,
        });
        history.push("/wisata");
    };

    useEffect(() => {
        getSchoolById();
    }, []);

    const getSchoolById = async () => {
        const response = await axios.get(`http://localhost:4000/wisata/${id}`);
        setFoto(response.data.foto);
        setNama(response.data.nama);
        setAlamat(response.data.alamat);
    };

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
        <Container>
            <main className="pt-3" style={{ marginTop: "60px" }}>
                <div className="row">
                    <div className="col-md-12">
                        <h4>EDIT WISATA</h4>
                    </div>
                </div>
                <Card className="shadow">
                    <Card.Header className="bg-dark text-white">
                        <h6 className="pt-2">
                            <i class="fas fa-plus-circle"></i> Edit Wisata
                        </h6>
                    </Card.Header>
                    <Form
                        style={{
                            padding: "10px",
                        }}
                        onSubmit={updateSchool}
                    >
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextPassword"
                        >
                            <Form.Label column sm="2">
                                Foto
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    className="form-control"
                                    type="text"
                                    placeholder="nama"
                                    value={foto}
                                    onChange={(e) => setFoto(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextPassword"
                        >
                            <Form.Label column sm="2">
                                Nama Wisata
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    className="form-control"
                                    type="text"
                                    placeholder="nama"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextPassword"
                        >
                            <Form.Label column sm="2">
                                Alamat Wisata
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    className="form-control"
                                    type="text"
                                    placeholder="alamat"
                                    value={alamat}
                                    onChange={(e) => setAlamat(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Col>
                            <Button
                                variant="outline-dark"
                                style={{
                                    padding: "5px",
                                    borderRadius: "10px",
                                    float: "right",
                                }}
                                type="submit"
                            >
                                <strong>UPDATE</strong>
                            </Button>
                        </Col>
                    </Form>
                </Card>
            </main>
        </Container>
    );
};

export default EditSchool;
