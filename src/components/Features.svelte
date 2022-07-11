<script>
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faImages, faMusic,faMapLocation, faComments, faStopwatch20, faFilm, faHeart, faAddressBook, faGift  } from '@fortawesome/free-solid-svg-icons/index.es'
    import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/index.es'
</script>

<section class="features">
        <div class="container">
            <h1>Fitur Undangan Website</h1>
            <p class="subtitle">Merencanakan pernikahan bisa menjadi pengalaman yang menyenangkan sekaligus menegangkan. Solusinya
                yaitu
                menggunakan undangan pernikahan online berbentuk website yang memberikan berbagai fitur yang
                menarik.
            </p>
            <ul>
                <li>
                    <div class="icon"><Fa icon={faImages}/></div>
                    <div>
                        <h4>Gallery Foto</h4>
                        <p>Tampilkan foto prewedding kalian di undangan. Bagikan momen indahmu kepada keluarga dan
                            kerabat.</p>
                    </div>
                </li>
                <li>
                    <div class="icon"><Fa icon={faMusic}/></div>
                    <div>
                        <h4>Musik</h4>
                        <p>Pilih lagu terbaik untuk undangan kalian, agar pembaca akan sekaligus mendengarkan musik
                            yang kalian tentukan</p>
                    </div>
                </li>
                <li>
                    <div class="icon"><Fa icon={faMapLocation}/></div>
                    <div>
                        <h4>Navigasi Lokasi</h4>
                        <p>Tidak ada kata tersesat, memudahkan tamu kalian menemukan lokasi pernikkahanmu. Hanya
                            dengan satu tombol.</p>
                    </div>
                </li>
                <li>
                    <div class="icon"><Fa icon={faComments}/></div>
                    <div>
                        <h4>Kolom Ucapan</h4>
                        <p>Kalian dapat membaca ucapan hangat dari saudara maupun kerabat kamu.</p>
                    </div>
                </li>
                <li>
                    <div class="icon"><Fa icon={faStopwatch20}/></div>
                    <div>
                        <h4>Hitung Mundur</h4>
                        <p>Countdown ditamplikan secara animasi menuju acara pernikahan kalian.</p>
                    </div>
                </li>
                <li>
                    <div class="icon"><Fa icon={faFilm}/></div>
                    <div>
                        <h4>Video</h4>
                        <p>Sisipkan video prewedding kamu. Biarkan saudara dan kerabat melihat kebahagiaanmu
                            menunggu
                            hari pernikahanmu.</p>
                    </div>
                </li>
                <li>
                    <div class="icon"><Fa icon={faWhatsapp}/></div>
                    <div>
                        <h4>Whatsapp Otomatis</h4>
                        <p>Kirim undangan sekali klik tanpa ribet. Hanya tuliskan nama tamu dan undangan langsung
                            tertuju.</p>
                    </div>
                </li>
                <li>
                    <div class="icon"><Fa icon={faHeart}/></div>
                    <div>
                        <h4>Cerita Cinta</h4>
                        <p>Ceritakan kepada tamu undangan tentang cerita cinta kalian dari awal bertemu sampai
                            akhirnya memutuskan untuk menikah</p>
                    </div>
                </li>
                <li>
                    <div class="icon"><Fa icon={faAddressBook}/></div>
                    <div>
                        <h4>Buku Tamu Digital</h4>
                        <p>Catatan kehadiran dapat dipantau dengan mudah dan lengkap.</p>
                    </div>
                </li>
                <li>
                    <div class="icon"><Fa icon={faGift}/></div>
                    <div>
                        <h4>Amplop Digital</h4>
                        <p>Donasi dapat dikumpulkan baik melalui website maupun di tempat acara.</p>
                    </div>
                </li>

            </ul>
        </div>
    </section>


    <style>

        .container {
            padding: 1rem 8rem;
            padding-bottom: 10rem;
        }

        h1 {
            margin-bottom: 1rem;
        }

        .subtitle {
            margin-bottom: 1rem;
        }


        ul {
            
            display: grid;
            grid-template-columns: 1fr 1fr;
            flex-wrap: wrap;
            margin-top: 2rem;
            padding: 00.8rem;
            gap: 0.5rem;

        }

        li {
            display: grid;
            grid-template-columns: 1fr 90%;
            margin-bottom: 1rem;
            margin-right: 2rem;
            align-items: center;
        }

        .icon {
            height: 3.8rem;
            width: 4.8rem;
            background: var(--primary-gradient);
            color: whitesmoke;
            display: grid;
            place-items: center;
            border-radius: 0.5rem;
            font-size: 1.1rem;
            margin-right: 1rem;
        }

        @media screen and (max-width: 768px) {
            .container {
                padding: 0.8rem;
                padding-bottom: 8rem;
            }

            ul {
                grid-template-columns: 1fr;
            }

            li {
                align-items: flex-start;
            }

            .icon {
                width: 3.8rem;
                height: 2.8rem;

            }
        }



    </style>