<script>
    export let brides;
    export let date;
</script>

<section>
    <div class="container" data-aos="fade-up">
        <p style="font-size: 13px; text-align: center; font-style: italic; font-weight: 300;">"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. <br><br> (Ar-Rum: 21)"</p>
        <h2>{brides}</h2>
        <h4>{date}</h4>
    </div>
    <div class="foot" >
        <p style="font-weight:200 ;" data-aos="fade-up">created with ❤ by</p>
        <img src="/favicon.png" alt="" data-aos="fade-up">
        <h5 style="color: #E9EBEE;" data-aos="fade-up">dinvite.online</h5>
    </div>
</section>



<style>
    .container {
        padding: 1rem;
    }
    h2 {
        font-family: 'Arima', cursive;
        font-weight: 900;
        color: var(--primary-color);
        text-align: center;
        margin-top: 1rem;
    }

    h4 {
        color: var(--primary-color);
        text-align: center;
        font-weight: 300;
    }

    .foot {
        padding: 1rem;
        padding-block: 8rem;
        background-color: var(--primary-color);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        color: whitesmoke;
    }

    img {
        width: 55px;
    }
</style>