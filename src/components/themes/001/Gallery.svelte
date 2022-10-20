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

    
    let galleries = [
        {
            link : 'https://media.dinvite.online/preview/1.jpg'
        },
        {
            link : 'https://media.dinvite.online/preview/2.jpg'
        },
        {
            link : 'https://media.dinvite.online/preview/3.jpg'
        },
        {
            link : 'https://media.dinvite.online/preview/4.jpg'
        },
        {
            link : 'https://media.dinvite.online/preview/5.jpg'
        },
        {
            link : 'https://media.dinvite.online/preview/6.jpg'
        },
        {
            link : 'https://media.dinvite.online/preview/7.jpg'
        },
        {
            link : 'https://media.dinvite.online/preview/8.jpg'
        },
        {
            link : 'https://media.dinvite.online/preview/9.jpg'
        },
        {
            link : 'https://media.dinvite.online/preview/10.jpg'
        },
        {
            link : 'https://media.dinvite.online/preview/11.jpg'
        },
        {
            link : 'https://media.dinvite.online/preview/12.jpg'
        },
        {
            link : 'https://media.dinvite.online/preview/13.jpg'
        },
        {
            link : 'https://media.dinvite.online/preview/14.jpg'
        },
        {
            link : 'https://media.dinvite.online/preview/15.jpg'
        },
    ]

    console.log(galleries[0].link);

</script>
<section>
    <div class="container">
        <div class="head" data-aos="zoom-in">
            <h3>Our Moment's</h3>
            <p style="font-weight: 200 ;">True love stands by each other’s side on good days and stands closer on bad days</p>
        </div>
        <div class="flexbin flexbin-margin" id="lightgallery">
            {#each galleries as gallery }
            <a href="{gallery.link}" data-aos="zoom-in-down">
                <img src="{gallery.link}" alt="">
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