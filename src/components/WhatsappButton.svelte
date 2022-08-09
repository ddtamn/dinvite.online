<script>
    import Fa from 'svelte-fa/src/fa.svelte'
    import {faWhatsapp} from '@fortawesome/free-brands-svg-icons/index.es'
    import {faXmark} from '@fortawesome/free-solid-svg-icons/index.es'

    let show = false
</script>

<div class="whatsapp-button">
    <div class="icon" on:click="{()=> show ? show = false : show = true}"><Fa icon={faWhatsapp}/></div>
    <div class="container {show  ? 'show' : ''}">
        <div class="head">
            <div on:click="{() => show = false}" class="close-icon"><Fa icon={faXmark}/></div>
            <div class="avatar"><img src="/favicon.png" alt=""></div>
            <div class="text">
                <h4>dinvite</h4>
                <p>online</p>
            </div>
        </div>
        <div class="body">
            <div class="chat">
                <div class="nickname">dinvite</div>
                <div class="text">Hai kak, <br> Ada yang bisa kami bantu.?</div>
            </div>
        </div>
        <div class="footer">
            <a class="send" href="https://api.whatsapp.com/send?phone=6281342831419&text=halo%20admin%20saya%20tertarik%20membeli%20undangan%20digital%20website%20dari%20https://dinvite.online" target="_blank"><Fa icon={faWhatsapp}/> Start Chat</a>
            <p>
                ⚡ by
                <a href="/" target="_blank">dinvite.online</a>
            </p>
        </div>
    </div>
</div>

<style>
    .whatsapp-button {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        z-index: 999;
        width: 100vw;
    }

    .icon {
        width: 3rem;
        height: 3rem;
        background-color: #4dc247;
        position: absolute;
        right: 0;
        bottom: 0;
        display: grid;
        place-items: center;
        font-size: 1.8rem;
        color: whitesmoke;
        border-radius: 50%;
        cursor: pointer;
    }

    .container {
        position: absolute;
        bottom: 3.5rem;
        right: 0;
        width: 100vw;
        max-width: 360px;
        box-shadow: -2px 2px 10px rgb(0 0 0 / 25%);
        border-radius: 12px;
        overflow-x: hidden;
        transform: translateY(150%);
        opacity: 0;
        transition: all 0.35s ease-in-out;
        z-index: 1;
        padding: 0;
    }

    .container.show {
        transform: translateY(0);
         opacity: 1;
    }

    .head {
        background: #0a5f54;
        padding: 25px 20px;
        display: flex;
        align-items: center;
        position: relative;
    }

    .close-icon {
        position: absolute;
        top: 10px;
        right: 1rem;
        color: whitesmoke;
        cursor: pointer;
    }

    .avatar {
        width: 50px;
        height: 50px;
        margin-right: 20px;
        border-radius: 25px;
        background-color: var(--background-variant);
        display: grid;
        place-items: center;
        position: relative;
    }

    .avatar::before {
        content: "";
        width: 0.8rem;
        height: 0.8rem;
        background-color: #4dc247;
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 50%;
    }

    .avatar img {
        width: 65%;
        height: 65%;
        object-fit: cover;
    }

    .head .text {
        color: whitesmoke;
    }

    .head h4 {
        font-weight: bold;
        font-size: 1.1rem;
    }

    .head p {
        font-size: 0.8rem;
    }

    .body {
        background-image: url(https://katsudoto.id/media/kat/bg-wa-box-fix.jpg);
        background-position: center;
        background-size: cover;
        padding: 10px 20px;
    }

    .chat {
        background-color: whitesmoke;
        margin: 10px 0;
        padding: 10px 15px;
        border-radius: 12px;
        display: inline-block;
        text-align: left;
    }

    .nickname {
        color: #00000075;
        font-size: 14px;
        margin-bottom: 5px;
        font-weight: 700;
    }

    .chat .text {
        color: #111;
        font-size: 15px;
        line-height: 1.5;
    }

    .footer {
        background: #fff;
        padding: 20px;
        text-align: center;
    }

    .footer .send {
        background: #4dc247;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        text-align: center;
        color: #fff;
        border-radius: 50px;
        margin-bottom: 10px;
        gap: 0.5rem;
    }

    .footer p {
        font-size: 13px;
        color: #636363;
        font-style: italic;
        display: inline-block;
    }
    

    @media screen and (max-width: 768px) {
        .container {
            left: 1.5rem;

        }
    }



 
</style>