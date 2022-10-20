<script>

    export let theDate;
    export let backgroundImage;
    export let calendarLink;
    let days = '00', hours = '00' , minutes = '00', seconds = '00'
    function countdown(date) {
        const countDate = new Date(date).getTime();
        const now = new Date().getTime();
        const gap = countDate - now;
        const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;

        if(gap < 0) {
            days = '00'
            hours = '00'
            minutes = '00'
            seconds = '00'
        } else {
            days = Math.floor(gap / day);
            hours = Math.floor((gap % day) / hour);
            minutes = Math.floor((gap % hour) / minute)
            seconds = Math.floor((gap % minute) / second)
        }
        
    }
    setInterval(() => {
       countdown(theDate || '12 April 2023');
    }, 1000);


    
</script>

<section style="background-image: url('{backgroundImage || 'https://media.dinvite.online/preview/5.jpg'}');">
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
            <a href="{calendarLink || 'https://calendar.google.com/calendar/u/0/r/eventedit?text=Pernikahan+Andi+%26+Indah&details=You+are+Invited+to+our+wedding+day&location=Jl.+Setia+Budi+Luwuk+Banggai&dates=20230412/20230412'}" target="_blank">Add to Calendar</a>
            
        </div>
    </div>
</section>


<style>
    section {
        /* background-image: url('https://cdn.imweb.me/upload/S201904265cc294845b98d/72d552aefd853.jpg'); */
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