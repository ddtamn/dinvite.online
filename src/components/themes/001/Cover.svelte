<script>
    let hide = false
</script>

<section class="{hide ? 'hide' : ''}">
    <div class="container" style="background-image: url('https://cdn.imweb.me/upload/S201904265cc294845b98d/3aeac83be14ce.jpg');">
        <div class="overlay"></div>
        <div class="content">
            <p>Hai..</p>
            <p>You are invited to our wedding day</p>
            <h1>Andy & Indah</h1>
            <button on:click="{() => hide = true}">Let's Begin</button>
        </div>
    </div>
</section>



<style>
    section {
       position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        height: 100vh;
        width: 100vw;
        transition: 0.3s ease;
        line-height: 1;
    }

    section.hide {
        transform: translateY(-100%);
    }

    .container {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        height: 100%;
        color: whitesmoke;
        width: 100%;
        padding: 0;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #25252581;
        z-index: 1;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        height: 100%;
        width: 100%;
        padding: 1rem;
        position: absolute;
        z-index: 2;
        color: whitesmoke;
        text-align: center;
    }
    

    h1 {
        font-family: 'Arima', cursive;
        font-weight: 900;
        font-size: 3rem;
    }

    button {
        background-color: var(--primary-color);
        padding: 0.3rem 1rem;
        font-size: 1.1em;
        border: none;
        border-radius: 0.5em;
        color: whitesmoke;
        box-shadow: var(--box-shadow);
        cursor: pointer;
        margin-top: 1rem;
    }
</style>