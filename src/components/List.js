// import React, { useState, useEffect } from "react";
// import jwt_decode from "jwt-decode";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import { Image } from "react-bootstrap";

// const List = () => {
//     const [token, setToken] = useState("");
//     const [expire, setExpire] = useState("");
//     const [users, setUsers] = useState([]);
//     const history = useHistory();
//     useEffect(() => {
//         refreshToken();
//         getUsers();
//     }, []);

//     const refreshToken = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/token");
//             setToken(response.data.accessToken);
//             const decoded = jwt_decode(response.data.accessToken);
//             // setName(decoded.name);
//             setExpire(decoded.exp);
//         } catch (error) {
//             if (error.response) {
//                 history.push("/");
//             }
//         }
//     };

//     const axiosJWT = axios.create();

//     axiosJWT.interceptors.request.use(
//         async (config) => {
//             const currentDate = new Date();
//             if (expire * 1000 < currentDate.getTime()) {
//                 const response = await axios.get("http://localhost:5000/token");
//                 config.headers.Authorization = `Bearer ${response.data.accessToken}`;
//                 setToken(response.data.accessToken);
//                 const decoded = jwt_decode(response.data.accessToken);
//                 // setName(decoded.name);
//                 setExpire(decoded.exp);
//             }
//             return config;
//         },
//         (error) => {
//             return Promise.reject(error);
//         }
//     );

//     const getUsers = async () => {
//         const response = await axiosJWT.get("http://localhost:5000/users", {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         setUsers(response.data);
//     };

//     return (
//         <div class="CardList">
//             <div class="container mt-4">
//                 <h2>Daftar Pariwisata</h2>
//                 <div class="row mb-3">
//                     <div class="col-md-4 mt-4">
//                         <div class="card" style={{ width: "18rem" }}>
//                             <Image
//                                 class="card-img-top"
//                                 src="https://cdn0-production-images-kly.akamaized.net/YQbA5cwCszzqlEmatj2udL1zUVM=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2383620/original/066825900_1539590316-3.jpg"
//                                 alt="Card image cap"
//                             />
//                             <div class="card-body">
//                                 <h5 class="card-title">Card title</h5>
//                                 <p class="card-text">
//                                     Some quick example text to build on the card title and make up
//                                     the bulk of the card's content.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="col-md-4 mt-4">
//                         <div class="card" style={{ width: "18rem" }}>
//                             <Image
//                                 class="card-img-top"
//                                 src="https://cdn0-production-images-kly.akamaized.net/FhLsNrEaUq08HEA9xF_2ch4Zb2o=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2383618/original/083751200_1539590315-1.JPG"
//                                 alt="Card image cap"
//                             />
//                             <div class="card-body">
//                                 <h5 class="card-title">Card title</h5>
//                                 <p class="card-text">
//                                     Some quick example text to build on the card title and make up
//                                     the bulk of the card's content.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="col-md-4 mt-4">
//                         <div class="card" style={{ width: "18rem" }}>
//                             <Image
//                                 class="card-img-top"
//                                 src="https://cdn0-production-images-kly.akamaized.net/Xk-WtjElylSVR44zvgBPdEZDaYw=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2383619/original/044315600_1539590316-2.jpg"
//                                 alt="Card image cap"
//                             />
//                             <div class="card-body">
//                                 <h5 class="card-title">Card title</h5>
//                                 <p class="card-text">
//                                     Some quick example text to build on the card title and make up
//                                     the bulk of the card's content.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default List;

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
