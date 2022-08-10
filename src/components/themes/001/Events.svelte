<script>
    export let firstEvent;
    export let firstEventTime;
    export let firstEventDesc;
    export let firstEventAddress
    export let firstEventMapIframe;
    export let firstEventMapLink;

    export let secondEvent;
    export let secondEventTime;
    export let secondEventDesc;
    export let secondEventAddress;
    export let secondEventMapIframe;
    export let secondEventMapLink;
</script>

<section>
    <div class="head" >
        <h3 data-aos="zoom-in">Our Wedding Day</h3>
        <p data-aos="zoom-out" style="font-weight: 200;">True love stands by each other’s side on good days and stands closer on bad days</p>
    </div>
    <div class="container">
        {#if firstEvent}
        <div class="activity" data-aos="fade-right">
            <h3>Akad Nikah</h3>
            <p>{firstEvent}</p>
            <p style="font-style: italic;">{firstEventTime}</p>
            <p style="font-weight: 500; color: var(--secondary-color);">{firstEventDesc}</p>
            <p style="font-size: 0.8rem;">{firstEventAddress}</p>
             <!-- svelte-ignore a11y-missing-attribute -->
            <div class="map"><iframe src="{firstEventMapIframe}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
            <button><a style="text-decoration: none; color: whitesmoke;" href="{firstEventMapLink}" target="_blank">Open Map</a>p</button>
        </div>
        {/if}
        {#if secondEvent}
            <div class="activity" data-aos="fade-left">
                <h3>Resepsi</h3>
                <p>{secondEvent}</p>
                <p style="font-style: italic;">{secondEventTime}</p>
                <p style="font-weight: 500; color: var(--secondary-color);">{secondEventDesc}</p>
                <p style="font-size: 0.8rem;">{secondEventAddress}</p>
                <!-- svelte-ignore a11y-missing-attribute -->
                <div class="map"><iframe src="{secondEventMapIframe}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
                <button><a style="text-decoration: none; color: whitesmoke;" href="{secondEventMapLink}" target="_blank">Open Map</a></button>
            </div>
        {/if}
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