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
</script>
<section>
    <div class="container">
        <div class="head" data-aos="zoom-in">
            <h3>Our Moment's</h3>
            <p style="font-weight: 200 ;">True love stands by each other’s side on good days and stands closer on bad days</p>
        </div>
        <div class="flexbin flexbin-margin" id="lightgallery">
            {#each galleries as gallery }
            <a href="{gallery}" data-aos="zoom-in-down">
                <img src="{gallery}" alt="">
            </a>
            {/each}
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