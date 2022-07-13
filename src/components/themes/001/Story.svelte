<section>
    <div class="container">
        <div class="head" data-aos="fade-up">
            <h3>Love Story</h3>
            <p>Marriage is the golden ring in a chain whose beginning is a glance and whose ending is eternity</p>
        </div>
        <div class="timeline" data-aos="fade-down">
            <div class="inner" data-aos="fade-down">
                <div class="content" data-aos="fade-right">
                    <h4>First Meet</h4>
                    <p>Kisah ini berawal dari pertemuan kita di bulan mei tahun 2018.</p>
                </div>
                <div class="content" data-aos="fade-right">
                    <h4>Relationship​</h4>
                    <p>Setelah menjalani hubungan selama 3 tahun, kita berkomitmen untuk masa depan hubungan kita.</p>
                </div>
                <div class="content" data-aos="fade-right">
                    <h4>Engagement​​</h4>
                    <p>Pada tgl 02 Januari 2021 Andi memberanikan diri membawa keluarganya bersilaturahmi ke rumah saya, dan meminta saya untuk menikah dengannya.</p>
                </div>
            </div>
        </div>
    </div>
</section>


<style>
    .container {
        padding: 1rem;
    }

    .head {
        text-align: center;
        color: var(--primary-color);
    }

    h3 {
        font-family: 'Arima', cursive;
        font-weight: 900;
        
    }

    h4 {
        font-family: 'Arima', cursive;
        font-weight: 900;
    }

    .head p {
        font-weight: 300;
    }

    .timeline {
        position: relative;
    }

    .timeline::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 3px;
        background-color: darkgrey;
    }

    .timeline p {
        font-weight: 200;
    }

    .inner {
        position: relative;
        padding-block: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        padding-left: 2rem;
        color: whitesmoke;
    }

    .inner::before {
        content: '';
        position: absolute;
        top: 0;
        left: -6px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: darkgrey;
    }
    .inner::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: -6px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: darkgrey;
    }

    .content {
        background: var(--primary-color);
        padding: 1rem;
        border-radius: 00.5rem;
        position: relative;
        /* box-shadow: var(--box-shadow); */
        border-left: 1px solid var(--secondary-color);
        color: whitesmoke;
        
    }

    .content::before {
        content: '🤍';
        position: absolute;
        left: -45px;
        top: 12px;
        height: 30px;
        width: 30px;
        background-color: var(--primary-color);
        text-align: center;
        display: grid;
        place-items: center;
        border-radius: 50%;
        color: whitesmoke;
    }

    .content::after {
        content: '';
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 9px 9px 9px 0;
        left: 0;
        top: 18px;
        margin-left: -9px;
        border-right-color: var(--secondary-color);

    }
</style>