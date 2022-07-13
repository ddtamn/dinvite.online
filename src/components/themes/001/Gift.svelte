<script>
    import Fa from 'svelte-fa'
    import {faGift, faMoneyCheck, faCopy, faXmark} from '@fortawesome/free-solid-svg-icons/index.es'

    let show = false
    
</script>

<section>
    <div class="container">
        <h3  data-aos="fade-up">Wedding Gift</h3>
        <p  data-aos="fade-up">Tanpa Mengurangi Rasa Hormat, Bagi Anda Yang Ingin Memberikan Tanda Kasih Untuk Mempelai, Dapat Melalui Virtual Account / E-Wallet</p>
        <button on:click="{() => show = true}"><Fa icon={faGift}/> Send Gift</button>
    </div>
</section>
<div class="modal {show ? 'show' : ''}" >
    <div class="container {show ? 'show' : ''}">
        <div class="close" on:click="{() => show = false}"><Fa icon={faXmark}/></div>
       <div class="head">
            <h3>Send Gift</h3>
            <p>Silahkan transfer hadiah melalui
            nomor rekening maupun dompet digital berikut</p>
            <div class="card">
                <div class="card-head">
                    <img src="/bank-card/bca.png" alt="">
                </div>
                <div class="card-body">
                    <div class="icon"><Fa icon={faMoneyCheck}/></div>
                    <div class="account">
                        <div class="number"><Fa icon={faCopy}/> <span>021 000 563 888 289</span></div>
                        <div class="name">Andi Putra Pratama</div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-head">
                    <img src="/bank-card/dana.png" alt="">
                </div>
                <div class="card-body">
                    <div class="icon"><Fa icon={faMoneyCheck}/></div>
                    <div class="account">
                        <div class="number"><Fa icon={faCopy}/> <span>0813 5491 1655</span></div>
                        <div class="name">Andi Putra Pratama</div>
                    </div>
                </div>
            </div>
       </div>
    </div>
</div>


<style>
    section {
        background-color: var(--primary-color);
    }
    .container {
        text-align: center;
        padding: 1rem;
        color: whitesmoke;
        padding-top: 2rem;
    }

    h3 {
        font-family: 'Arima', cursive;
        font-weight: 900;
        
    }

    p {
        font-size: 15px;
        font-weight: 200;
    }

    button {
        padding: 8px 20px;
        border-radius: 5px;
        outline: none;
        border: none;
        background: var(--secondary-color);
        font-size: 15px;
        cursor: pointer;
        color: whitesmoke;
        transition: all 0.25s ease-in-out;
        margin-top: 1rem;
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        background-color: rgba(0, 0, 0, 0.495);
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        opacity: 0;
        pointer-events: none;
        transition: all 0.1s ease-in;
    }

    .modal.show {
        opacity: 1;
        pointer-events: all;
    }

    .modal .container {
        background-color: whitesmoke;
        width: 90%;
        color: var(--primary-color);
        padding-bottom: 2rem;
        position: relative;
        transform: translateX(100%);
        opacity: 0;
        pointer-events: none;
        transition: all 0.5s ease-in-out;
        transition-delay: 0.2s;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
    }

    .modal .container.show {
        transform: translateX(0);
        opacity: 1;
        pointer-events: all;
    }

    .modal .card {
        background-image: url('/bank-card/bg.jpg');
        background-position: center center;
        background-size: cover;
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid var(--primary-color);
        margin-top: 1.8rem;
        box-shadow: var(--box-shadow);
    }

    .card-head {
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
        border-bottom: 1px solid var(--primary-color);
    }

    .card-head img {
        width: 25%;
    }

    .card-body {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
    }

    .icon {
        margin-right: auto;
        margin-bottom: 1rem;
    }

    .number, .name {
        font-family: 'Barlow Condensed', sans-serif;
        font-weight: 500;
        text-transform: uppercase;
    }

    .number {
        margin-bottom: 0.5rem;
        font-weight: 300;
    }

    .number span {
        margin-left: 0.5rem;
    }

    .close {
        position: absolute;
        top: 5px;
        right: 13px;
        cursor: pointer;
    }


</style>