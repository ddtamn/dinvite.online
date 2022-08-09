<script>
    import LightGallery from 'lightgallery'
    import 'lightgallery/css/lightgallery.css'
    import { onMount } from 'svelte';

    onMount(() => {
        LightGallery(document.getElementById('lightgallery'), {
            speed : 500,
            download : false,
        })
    })

    export let galleries;
    console.log(galleries);
</script>
<section>
    <div class="container">
        <div class="head" data-aos="zoom-in">
            <h3>Our Moment's</h3>
            <p style="font-weight: 200 ;">True love stands by each other’s side on good days and stands closer on bad days</p>
        </div>
        <div class="flexbin flexbin-margin" id="lightgallery">
            {#each galleries as gallery }
            <a href="https://drive.google.com/uc?export=view&id={gallery}" data-aos="zoom-in-down">
                <img src="https://drive.google.com/uc?export=view&id={gallery}" alt="">
            </a>
            {/each}
            <!-- <a href="https://cdn.imweb.me/upload/S201904265cc294845b98d/e6e512e4e7668.jpg" data-aos="zoom-in-down">
                <img src="https://cdn.imweb.me/upload/S201904265cc294845b98d/e6e512e4e7668.jpg" alt="">
            </a>
            <a href="https://cdn.imweb.me/upload/S201904265cc294845b98d/238d27e87b918.jpg" data-aos="zoom-in-down">
                <img src="https://cdn.imweb.me/upload/S201904265cc294845b98d/238d27e87b918.jpg" alt="">
            </a>
            <a href="https://cdn.imweb.me/upload/S201904265cc294845b98d/74e3f2d06773d.jpg" data-aos="zoom-in-down">
                <img src="https://cdn.imweb.me/upload/S201904265cc294845b98d/74e3f2d06773d.jpg" alt="">
            </a>
            <a href="https://cdn.imweb.me/upload/S201904265cc294845b98d/2aae3d50e20f6.jpg" data-aos="zoom-in-down">
                <img src="https://cdn.imweb.me/upload/S201904265cc294845b98d/2aae3d50e20f6.jpg" alt="">
            </a>
            <a href="https://cdn.imweb.me/upload/S201904265cc294845b98d/27c1b036ae3bc.jpg" data-aos="zoom-in-down">
                <img src="https://cdn.imweb.me/upload/S201904265cc294845b98d/27c1b036ae3bc.jpg" alt="">
            </a>
            <a href="https://cdn.imweb.me/upload/S201904265cc294845b98d/b2fdc287b3da6.jpg" data-aos="zoom-in-down">
                <img src="https://cdn.imweb.me/upload/S201904265cc294845b98d/b2fdc287b3da6.jpg" alt="">
            </a>
            <a href="https://cdn.imweb.me/upload/S201904265cc294845b98d/32d4161951e3d.jpg" data-aos="zoom-in-down">
                <img src="https://cdn.imweb.me/upload/S201904265cc294845b98d/32d4161951e3d.jpg" alt="">
            </a>
            <a href="https://cdn.imweb.me/upload/S201904265cc294845b98d/9955a968d7bae.jpg" data-aos="zoom-in-down">
                <img src="https://cdn.imweb.me/upload/S201904265cc294845b98d/9955a968d7bae.jpg" alt="">
            </a>
            <a href="https://cdn.imweb.me/upload/S201904265cc294845b98d/232fb3b70c156.jpg" data-aos="zoom-in-down">
                <img src="https://cdn.imweb.me/upload/S201904265cc294845b98d/232fb3b70c156.jpg" alt="">
            </a>
            <a href="https://cdn.imweb.me/upload/S201904265cc294845b98d/5d43ef2b2f57e.jpg" data-aos="zoom-in-down">
                <img src="https://cdn.imweb.me/upload/S201904265cc294845b98d/5d43ef2b2f57e.jpg" alt="">
            </a> -->
        </div>
    </div>
</section>


<style>
    section {
        background-color: var(--primary-color);
    }

    .container {
        padding: 0.5rem;
        padding-block: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: whitesmoke;
    }

    .head {
        margin-bottom: 2rem;
        /* line-height: 1.5; */
    }

    h3 {
        font-family: 'Arima', cursive;
        font-weight: 900;
    }
</style>