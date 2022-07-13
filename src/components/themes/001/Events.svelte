<section>
    <div class="head" >
        <h3 data-aos="zoom-in">Our Wedding Day</h3>
        <p data-aos="zoom-out" style="font-weight: 200;">True love stands by each other’s side on good days and stands closer on bad days</p>
    </div>
    <div class="container">
        <div class="activity" data-aos="fade-right">
            <h3>Akad Nikah</h3>
            <p>Minggu, 12 April 2023</p>
            <p style="font-style: italic;">09:00 - 10:00</p>
            <p style="font-weight: 500; color: var(--secondary-color);">Rumah Mempelai Perempuan</p>
            <p style="font-size: 0.8rem;">Jl. Setia Budi Luwuk Banggai</p>
             <!-- svelte-ignore a11y-missing-attribute -->
            <div class="map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d381.75811685649677!2d122.78865638325985!3d-0.9481183995158275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d86a3e7ac7d28d5%3A0x9a2ef0fc7f1a2da9!2zMMKwNTYnNTMuMyJTIDEyMsKwNDcnMTguNyJF!5e0!3m2!1sid!2sid!4v1657702285355!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
            <button>Open Map</button>
        </div>
        <div class="activity" data-aos="fade-left">
            <h3>Resepsi</h3>
            <p>Minggu, 12 April 2023</p>
            <p style="font-style: italic;">19:30 - 22:30</p>
            <p style="font-weight: 500; color: var(--secondary-color);">Estrella Hotel & Conference Center</p>
            <p style="font-size: 0.8rem;">Jl. Dr. Moh. Hatta Kawasan Bukit Halimun, Tj. Tuwis, Luwuk, Kabupaten Banggai, Sulawesi Tengah 94715</p>
            <!-- svelte-ignore a11y-missing-attribute -->
            <div class="map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.2141964147722!2d122.79077731460545!3d-0.9970789992726605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe84979efe572067e!2sEstrella%20hotel%20%26%20d%20club!5e0!3m2!1sid!2sid!4v1657702420794!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
            <button>Open Map</button>
        </div>
    </div>
</section>


<style>
    .head {
        background-color: var(--secondary-color);
        padding: 2rem 1rem;
        text-align: center;
        color: whitesmoke;
    }

    .head h3 {
        font-family: 'Arima', cursive;
        font-weight: 900;
    }

    .container {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }

    .activity {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 0.5rem;
    }

    .map {
        overflow: hidden;
        border: 2px solid var(--primary-color);
        border-radius: 00.5rem;
        box-shadow: var(--box-shadow);
    }

    .map iframe {
        width: 100%;
        height: 300px;
    }

    .activity h3 {
        font-family: 'Arima', cursive;
        font-weight: 900;
        font-size: 1.5rem;
        color: var(--primary-color);
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