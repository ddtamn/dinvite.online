<script>
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faFacebook, faInstagram, faWhatsapp, } from '@fortawesome/free-brands-svg-icons/index.es'
    import {faEnvelope} from '@fortawesome/free-solid-svg-icons/index.es'

</script>

<footer>
    <div class="top">
        <div class="container">
            <p>Terima kasih untuk kamu yang sudah membaca isi dari website ini. Semoga kita dapat berbincang lebih lanjut.</p>
            <a href="https://wa.me/6281342831419" target="_blank"><button>Hubung Kami</button></a>
        </div>
    </div>
    <div class="bottom">
        <div class="container">
            <p>Lebih dekat dengan kami :</p>
            <ul class="socials">
                <li>
                    <a href="/"><Fa icon={faFacebook}/></a>
                </li>
                <li>
                    <a href="/"><Fa icon={faInstagram}/></a>
                </li>
                <li>
                    <a href="/"><Fa icon={faWhatsapp}/></a>
                </li>
                <li>
                    <a href="/"><Fa icon={faEnvelope}/></a>
                </li>
            </ul>
            <ul class="menu">
                <li>
                    <a href="/">Syarat & Ketentuan</a>
                </li>
                <li>
                    <a href="/">Tentang Kami</a>
                </li>
                <li>
                    <a href="/">Kebijakan Privasi</a>
                </li>
                <li>
                    <a href="/">FAQ</a>
                </li>
            </ul>
            <p>
            Copyright 2021 - {new Date().getFullYear()} | <a href="/"><strong style="color: var(--primary)">dinvite.online</strong></a> Jasa pembuatan
            undangan
            digital website - All rights reserved. <br> self-developed by
            <strong style="color: #666666"> diditamin.m </strong>from Luwuk Banggai.
        </p>
        </div>
    </div>
</footer>

<style>
    .top {
        background: var(--primary-gradient);
        text-align: center;
        padding-block: 1rem;
    }

    .top p {
        color: whitesmoke;
        font-weight: 400;
    }

    .top button {
        all: unset;
        color: whitesmoke;
        padding: 5px 8px;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;
        margin-right: 1rem;
        margin-top: 1rem;
        background: #ecb62e;
        color: inherit;
    }

    .bottom {
        text-align: center;
    }


    .bottom p {
        font-size: 14px;
    }

    .socials {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-block: 1rem;
    }

    .socials a {
        background: var(--primary-gradient);
        width: 2rem;
        height: 2rem;
        display: grid;
        place-items: center;
        color: whitesmoke;
        border-radius: 50%;
    }

    .menu {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }

     .menu a:hover {
        color: var(--primary);
    }

    .menu a::after {
        content: "|";
        margin: 0 1rem;
        color: #464646;
    }

    .menu li:last-child a::after {
        content: '';
    }

    @media screen and (max-width: 768px) {
        .container {
            text-align: left;
        }
        .menu {
            align-items: flex-start;
            flex-direction: column;
        }

        .menu a::after {
            content: '';
        }

        .socials {
            justify-content: flex-start;
        }

        .bottom p:last-child {
            text-align: center;
        }

        
    }
    
</style>