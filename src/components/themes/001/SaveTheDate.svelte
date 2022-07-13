<section>
    <div class="container">
        <div class="overlay"></div>
        <div class="content" data-aos="zoom-in">
            <h1>save the date</h1>
            <div class="counter">
                <div class="count"><h6>00</h6><p>Days</p></div>
                <div class="count"><h6>00</h6><p>Hours</p></div>
                <div class="count"><h6>00</h6><p>Minutes</p></div>
                <div class="count"><h6>00</h6><p>Seconds</p></div>
            </div>
            <a href="#d">Add to Calendar</a>
        </div>
    </div>
</section>


<style>
    section {
        background-image: url('https://cdn.imweb.me/upload/S201904265cc294845b98d/72d552aefd853.jpg');
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        height: 300px;
    }

    .container {
        padding: 1rem;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* background: #25252581; */
        z-index: 1;
        background: var(--primary-color);
        opacity: 0.7;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 2rem;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        position: absolute;
        z-index: 2;
        color: whitesmoke;
    }

    h1 {
        font-size: 2rem;
        letter-spacing: 0.5rem;
        text-transform: uppercase;
        font-family: 'Arima', cursive;
        font-weight: 900;
    }
    

    .counter {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.3rem;
    }

    .counter h6 {
        font-weight: bold;
        font-size: 1.3rem;
    }


    a {
        border-radius: 5px;
        border: 1px solid whitesmoke;
        padding: 0.5rem 0.8rem;
        font-size: 0.8rem;
        background-color: var(--primary-color);
        color: whitesmoke;
        text-decoration: none;
        box-shadow: var(--box-shadow);
    }
</style>