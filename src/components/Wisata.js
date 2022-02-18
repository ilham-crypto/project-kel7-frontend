/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Container, Table } from "react-bootstrap";
const WisataList = () => {
    const [wisata, setwisata] = useState([]);

    useEffect(() => {
        getWisata();
    }, []);

    const getWisata = async () => {
        const wisata = await axios.get("http://localhost:4000/wisata");
        setwisata(wisata.data);
    };

    const deleteWisata = async (id) => {
        await axios.delete(`http://localhost:4000/wisata/${id}`);
        getWisata();
    };

    return (
        <Container>
            <main className="pt-3" style={{ marginTop: "60px" }}>
                <div className="row">
                    <div className="col-md-12">
                        <h4>TAMBAH WISATA</h4>
                    </div>
                </div>
                <Card.Header className="bg-dark text-white">
                    <h6 className="pt-2">
                        <i class="fas fa-plus-circle"></i>{" "}
                        <Link to="/addwisata" className="text-light noUnderline">
                            Tambahkan Data baru
                        </Link>
                    </h6>
                </Card.Header>
                <Table striped bordered hover variant="dark" className="text-center">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Foto</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wisata.map((wisatas, index) => (
                            <tr key={wisatas.id}>
                                <td>{index + 1}</td>
                                <td>{wisatas.foto}</td>
                                <td>{wisatas.nama}</td>
                                <td>{wisatas.alamat}</td>
                                <td>
                                    <Link to={`/Edit/${wisatas.id}`}>
                                        <Button variant="outline-light" size="sm">
                                            Edit
                                        </Button>
                                    </Link>{" "}
                                    <Button
                                        onClick={() => deleteWisata(wisatas.id)}
                                        className="button"
                                        variant="outline-light"
                                        size="sm"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </main>
        </Container>
    );
};

export default WisataList;
