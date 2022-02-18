import React from "react";
// import { Iframe } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center text-lg-start">
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Pariwisata Semarang</h5>
                        <hr />
                        <p>
                            Kota Semarang adalah ibu kota Provinsi Jawa Tengah, Indonesia
                            sekaligus kota metropolitan terbesar kelima di Indonesia setelah
                            Jakarta, Surabaya, Medan, dan Bandung. Sebagai salah satu kota
                            paling berkembang di Pulau Jawa, Kota Semarang mempunyai jumlah
                            penduduk sekitar 1,7 juta jiwa.
                        </p>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Object</h5>
                        <hr />

                        <ul className="list-unstyled mb-0">
                            <li>Lawang Sewu</li>
                            <li>Kota Lama</li>
                            <li>Sam Poo Kong</li>
                            <li>Kampung Pelangi</li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 class="text-uppercase">Contact</h5>
                        <hr />
                        <p>
                            <i class="bi bi-house-door-fill"></i> Semarang, NY 2022, US
                        </p>
                        <p>
                            <i class="bi bi-envelope"></i> info@example.com
                        </p>
                        <p>
                            <i class="bi bi-telephone-forward"></i> + 01 234 567 88
                        </p>
                    </div>
                </div>
            </div>

            <div
                className="text-center p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
                © 2022 Copyright :
                <a className="text-white" href="https://mdbootstrap.com/">
                    Bootcamp.com
                </a>
            </div>
        </footer>
    );
};

export default Footer;
