<script>
    export let backgroundImage;
    export let title;
    export let date;
    export let text;

</script>

<section>
    <div class="container" style="background-image: url('{backgroundImage}');">
        <div class="overlay"></div>
        <div class="content" data-aos="zoom-in">
            <!-- svelte-ignore a11y-missing-attribute -->
            <div class="image"><img src="{backgroundImage}" loading="lazy"></div>
            <p style="margin-top: 1rem; font-weight: 300;">Wedding Invitation</p>
            <h1 style="text-align: center;">{title}</h1>
            <p  style="font-style: italic; font-weight: 300;">{text ? text : '#2gether4ever'}</p>
            <h3>{date}</h3>
        </div>
    </div>
</section>

<style>
    section {
        height: 100%;
        min-height: 100vh;
        position: relative;
    }

    .container {
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        position: absolute;
        width: 100%;
        padding: 1rem;
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
        height: 100%;
        margin-top: -1rem;
        padding: 1rem;
        position: absolute;
        z-index: 2;
        color: whitesmoke;
    }

    .image {
        width: 80%;
        aspect-ratio: 9 / 14;
        border-radius: 10px;
        overflow: hidden;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    h1 {
       font-family: 'Arima', cursive;
        font-weight: 900;
        font-size: 3rem;
    }

    h3 {
        transform: scaleX(1.1);
        letter-spacing: 3px;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 1rem;
    }
    
</style>