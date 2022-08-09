<script>
    import Fa from 'svelte-fa'
    import {faInstagram} from '@fortawesome/free-brands-svg-icons/index.es'
    import Flower001 from '../../decoration/flower001.svelte';
    

    export let bride;
    export let brideParents;
    export let brideImage;
    export let brideIg;
    export let groom;
    export let groomImage;
    export let groomParents;
    export let groomIg;
    

</script>

<section>
    <div class="container">
        <div class="head" data-aos="fade-up">
            <h3>Bride & Groom</h3>
            <p>Maha suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah, perkenankanlah kami merangkai kasih sayang yang Kau ciptakan di antara putra-putri kami:</p>
        </div>
        <div class="brides" data-aos="zoom-in">
            <div class="image">
                <img src="{brideImage}" alt="">
                <div class="flower" style="left: 10rem;"><Flower001 color={'var(--primary-color)'} width={'200px'} height={'200px'}/></div>
            </div>
            <h3>{bride}</h3>
            <p style="font-style: italic; font-weight: 300;">Putri dari pasangan</p>
            <p style="font-weight: 500; color: var(--secondary-color);">{brideParents}</p>
            <a target="_blank" href="{brideIg}"><Fa icon={faInstagram}/></a>
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
        <div class="brides" data-aos="zoom-in">
            <div class="image">
                <img src="{groomImage}" alt="">
                <div class="flower" style="transform: scale(-1);"><Flower001 color={'var(--primary-color)'} width={'200px'} height={'200px'}/></div>
            </div>
            <h3>{groom}</h3>
            <p style="font-style: italic; font-weight: 300;">Putra dari pasangan</p>
            <p style="font-weight: 500; color: var(--secondary-color);">{groomParents}</p>
            <a target="_blank" href="{groomIg}"><Fa icon={faInstagram}/></a>
        </div>
    </div>
</section>


<style>

    @keyframes -global-from-left {
    0% {
        transform: rotateX(50deg) translateX(-200vw) skewX(-50deg);
        opacity: 1;
    }
    100% {
        transform: rotateX(0deg) translateX(0) skewX(0deg);
        opacity: 1;
    }
    }
    .container {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-block: 2rem;
        gap: 2rem;
        overflow: hidden;
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

    .head p {
        font-weight: 300;
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
        /* overflow: hidden; */
        position: relative;
    }

    img {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        position: absolute;
        object-fit: cover;
        z-index: 2;
    }

    .flower {
        width: 50%;
        height: 50%;
        position: absolute;
        z-index: 1;
        left: -5rem;
        top: -2rem;
        transform: rotate(-10deg);
        opacity: 0.5;
        

    }
</style>