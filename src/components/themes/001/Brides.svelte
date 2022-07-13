<script>
    import Fa from 'svelte-fa'
    import {faInstagram} from '@fortawesome/free-brands-svg-icons/index.es'
</script>

<section>
    <div class="container">
        <div class="head">
            <h3>Bride & Groom</h3>
            <p>Maha suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah, perkenankanlah kami merangkai kasih sayang yang Kau ciptakan di antara putra-putri kami:</p>
        </div>
        <div class="brides">
            <div class="image">
                <img src="https://cdn.imweb.me/upload/S201904265cc294845b98d/6648600291075.jpg" alt="">
            </div>
            <h3>Andi Putra Pratama, SE</h3>
            <p style="font-style: italic;">Putra dari pasangan</p>
            <p style="font-weight: 500; color: var(--secondary-color);">Bpk. Haris Sustyanto & Ibu. Bella Ayu</p>
            <a href="https://instagram.com/ddtamn"><Fa icon={faInstagram}/></a>
        </div>
        <div 
        style="margin-bottom: 1rem;
        color: var(--primary-color);
        font-size: 6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 1.5;
        font-family: 'Arima', cursive;
        font-weight: 900;"
        >&</div>
        <div class="brides">
            <div class="image">
                <img src="https://cdn.imweb.me/upload/S201904265cc294845b98d/70c569ab32e12.jpg" alt="">
            </div>
            <h3>Indah Permata Sari, SH., MM</h3>
            <p style="font-style: italic;">Putri dari pasangan</p>
            <p style="font-weight: 500; color: var(--secondary-color);">Bpk. Haris Sustyanto & Ibu. Bella Ayu</p>
            <a href="https://instagram.com/ddtamn"><Fa icon={faInstagram}/></a>
        </div>
    </div>
</section>


<style>
    .container {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-block: 2rem;
        gap: 2rem;
    }

    .head {
        margin-bottom: 3rem;
        color: var(--primary-color);
        line-height: 1.5;
    }

    h3 {
        font-family: 'Arima', cursive;
        font-weight: 900;
        color: var(--primary-color);
    }

    .brides {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .brides h3 {
        margin-top: 1rem;
    }

    .brides a {
        background-color: var(--primary-color);
        width: 2rem;
        height: 2rem;
        color: whitesmoke;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-top: 1rem;
    }

    .image {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>