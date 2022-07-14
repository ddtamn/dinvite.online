<script>
    let days = '00', hours = '00' , minutes = '00', seconds = '00'
    function countdown(date) {
        const countDate = new Date(date).getTime();
        const now = new Date().getTime();
        const gap = countDate - now;
        const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
        days = Math.floor(gap / day);
        hours = Math.floor((gap % day) / hour);
        minutes = Math.floor((gap % hour) / minute)
        seconds = Math.floor((gap % minute) / second)
    }
    setInterval(() => {
       countdown('Minggu 12 April 2023');
    }, 1000);
</script>

<section>
    <div class="container">
        <div class="overlay"></div>
        <div class="content" data-aos="zoom-in">
            <h1>save the date</h1>
            <div class="counter">
                <div class="count"><h6>{days}</h6><p style="font-weight: 200;">Days</p></div>
                <div class="count"><h6>{hours}</h6><p style="font-weight: 200;">Hours</p></div>
                <div class="count"><h6>{minutes}</h6><p style="font-weight: 200;">Minutes</p></div>
                <div class="count"><h6>{seconds}</h6><p style="font-weight: 200;">Seconds</p></div>
            </div>
            <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20230209%2F20231018&details=Special%20Inivited%20for%20you&location=https%3A%2F%2Fgoo.gl%2Fmaps%2FcVQmACWGxEZyp2KY7&text=Pernikahan%20Andi%20%26%20Indah" target="_blank">Add to Calendar</a>
            
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