<section class="price-lists">
        <div class="container">
            <h1>Harga Bersahabat Sesuai Dengan Kebutuhan</h1>
            <p>Semua paket undangan website sudah mendapatkan halaman website, e-guestbook, fitur bahasa, navigasi
                peta, quotes, & dukungan teknis</p>
            <div class="packages">
                <div class="package">
                    <div class="head">
                        <h4>Paket Standard</h4>
                    </div>
                    <ul>
                        <li>Pilihan Tema Standard</li>
                        <li>Detail Info Acara</li>
                        <li>Profil Pasangan</li>
                        <li>Protokol Kesehatan</li>
                        <li>Background Music (sesuai list)</li>
                        <li>Navigasi Lokasi</li>
                        <li>Ingatkan di Google Calendar</li>
                        <li>2 Jadwal Acara</li>
                        <li>Ucapan & Kehadiran</li>
                        <li>Love Stories</li>
                        <li>Gallery foto (max 10)</li>
                        <li>Generator Tamu Undangan</li>
                        <li>Masa aktif 3 Bulan</li>
                    </ul>
                    <div class="footer">
                        <h3>idr 149.000</h3>
                        <button class="button">Pesan Sekarang</button>
                    </div>
                </div>
                <div class="package">
                    <div class="head">
                        <h4>Paket Premium</h4>
                        <span>Hemat 101rb</span>
                    </div>
                    <ul>
                        <li>Pilihan Tema Standard & Premium</li>
                        <li>Semua Fitur paket basic</li>
                        <li>Gallery foto (max 20)</li>
                        <li>Tampilkan tombol Live Streaming</li>
                        <li>Amplop Digital</li>
                        <li>QR Scanner untuk Buku Tamu di Lokasi</li>
                        <li>Kisah Cinta Berupa Timeline</li>
                        <li>5 Kali Revisi</li>
                        <li>Masa Aktif 6 Bulan</li>
                    </ul>
                    <div class="footer">
                        <h3>idr 199.000 <span>300rb</span></h3>
                        <button class="button">Pesan Sekarang</button>

                    </div>
                </div>
                <div class="package">
                    <div class="head">
                        <h4>Paket Special</h4>
                        <span>Hemat 500rb</span>
                    </div>
                    <ul>
                        <li>Custom Domain (.com, .id, dll)</li>
                        <li>Semua Fitur paket Premium</li>
                        <li>Smart Dashboard</li>
                        <li>Bebas Pilih Tema</li>
                        <li>Bisa Custom Tema yang ada</li>
                        <li>Bisa Custom tema sesuai permintaan</li>
                        <li>Gallery Foto (unlimited)</li>
                        <li>Gallery Video</li>
                        <li>Background Music (Bisa Request)</li>
                        <li>Gratis undangan JPEG</li>
                        <li>Dukungan teknis 24/7</li>
                        <li>Revisi Sampai Puas</li>
                        <li>Masa Aktif 1 Tahun</li>
                    </ul>
                    <div class="footer">
                        <h3>idr 1.500.000 <span>2JT</span></h3>
                        <button class="button">Pesan Sekarang</button>
                        <p>*Pemesanan Minimal 1 Bulan sebelum Hari H</p>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <style>
        section {
            background-color: var(--background-variant);
            position: relative;
            margin-top: -10px;
        }


        h1 {
            text-align: center;
        }
        p {
            margin-bottom: 1rem;
            text-align: center;
        }

        .packages {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1rem;
            margin-top: 2rem;
            padding-inline: 8rem;
        }

        .package {
            padding: 1rem;
            border-radius: 10px;
            border: 1px solid #bebebe;
            position: relative;
            overflow: hidden;
        }

        .head {
            position: absolute;
            background: var(--primary-gradient);
            width: 100%;
            height: 3rem;
            left: 0;
            top: 0;
            display: grid;
            place-items: center;
            color: whitesmoke;
            font-weight: bold;
            text-transform: uppercase;
        }

        .head span {
            color: #fcc437;
            font-size: 0.8rem;
            margin-top: -1rem;
        }

        ul {
            margin-top: 3rem;
        }

        li {
            text-align: left;
            position: relative;
            padding-left: 1.8rem;
            margin-bottom: 1rem;
            font-size: 0.8rem;
            border-bottom: 1px solid #bebebe;
            padding-bottom: 0.3rem;
        }

        li::before {
            content: "\2713";
            position: absolute;
            left: 0;
            top: 0;
            color: #eff0f0;
            font-size: 1rem;
            color: var(--primary);
        }

        h3 {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 1.3rem;
            color: var(--primary);
        }

        .footer {
            text-align: center;
        }

        .footer span {
            color: #858585;
            margin-left: 0.8rem;
            text-decoration: line-through;
            text-decoration-thickness: 0.5px;
        }

        .footer p {
            font-size: 0.7rem;
            margin-top: 0.5rem;            
        }

        button {
            all: unset;
            background: var(--primary-gradient);
            color: whitesmoke;
            padding: 5px 8px;
            border-radius: 0.5rem;
            border: none;
            cursor: pointer;
            margin-right: 1rem;
        }

        @media screen and (max-width: 768px) {
            .container {
                padding: 0.8rem;
            }

            .packages {
                grid-template-columns: 1fr;
                padding-inline: 1rem;
            }

            h1, p {
                text-align: left;
            }
        }
        
        
    </style>