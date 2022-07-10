<section>
    <div class="container">
        <div class="content">
            <h1>Undangan Pernikahan Digital Website</h1>
            <p>solusi undangan pernikahan website kamu jadi lebih menarik & berkesan</p>
            <div class="buttons">
                <a class="order" href="/">Pesan Sekarang</a>
                <a class="pricelist" href="/">Pricelist</a>                
            </div>
        </div>
        <div class="image"><img src="/images/hero.png" alt=""></div>
    </div>
</section>

<style>
    section {
        min-height: calc(100vh - 4rem);

    }

    .container {
        display: flex;
        align-items: center;
        min-height: inherit;
    }

    .content {
        width: 55%;
    }

    h1 {
        font-size: 3rem;
    }

    p {
        color: var(--primary);
        font-size: 1.3rem;
        font-weight: 300;
    }

    .buttons {
        margin-top: 1rem;
    }


    .buttons a {
        background: var(--primary-gradient);
        color: whitesmoke;
        padding: 5px 8px;
        border-radius: 0.5rem;
        cursor: pointer;
        margin-right: 1rem;
    }

    .image {
        width: 45%;
        height: 100%;
        position: relative;
    }

    .image img {
        position: absolute;
        width: 150%;
        height: auto;
        top: -400px;
    }

    @media screen and (max-width: 768px) {
        .container {
           display: flex;
           flex-direction: column;
           min-height: auto;
           justify-content: center;
           align-items: center;
        }

        .content {
            width: 100%;
            margin-top: 1rem;
        }

        h1 {
            font-size: 2rem;
        }

        .image {
            width: 100%;
        }
        
        .image img {
            position: static;
            top: 0px;
            margin-left: -10rem;
            margin-top: 1rem;
        }
    }
</style>