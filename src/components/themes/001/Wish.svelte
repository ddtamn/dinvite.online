<script>
    export let invitaionName;
</script>


<section>
    <div class="container">
        <div class="head" data-aos="fade-up">
            <h3>Wedding Wish</h3>
            <p style="font-weight: 200;">Thanks for all the wedding wishes! you made a great day even greater!</p>
        </div>
        <div class="form">
            <input placeholder="your name.." class="form-control" type="text" data-aos="fade-up">
            <textarea data-aos="fade-up" class="form-control" placeholder="write something.." rows="1"></textarea>
            <button data-aos="fade-up">Send</button>
        </div>
        <div class="comments" data-aos="fade-up">
            <div class="comment">
                <strong>ddtamn</strong>
                <p>Wishing you a lifetime of love and happinesss.</p>
                <small>19 May 2022, 01:53</small>
            </div>
        </div>
    </div>
</section>


<style>
    .container {
        padding: 1rem;
        padding-top: 2rem;
    }

    .head {
        color: var(--primary-color);
        text-align: center;
    }

    .form-control {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: block;
        width: 100%;
        padding: 10px;
        border: none;
        outline: none;
        border-radius: 7px;
        font-size: 15px;
        line-height: 22px;
        font-weight: 500;
        background: #fff;
        font-family: sans-serif;
        border: 1px solid rgba(0, 0, 0, 0.2);
        cursor: text;
        transition: 0.2s ease-in-out;
    }

    .form-control:focus {
        background: #fff;
        box-shadow: 0 0 2px var(--primary-color);
        border: 1px solid var(--primary-color);
    }

    input {
        margin-top: 1rem;
    }

    textarea {
        max-height: 350px;
        height: 1px;
        resize: vertical;
        min-height: 100px;
        margin-top: 1rem;
    }

    button {
        padding: 8px 20px;
        border-radius: 5px;
        outline: none;
        border: none;
        background: var(--primary-color);
        font-size: 15px;
        cursor: pointer;
        color: whitesmoke;
        transition: all 0.25s ease-in-out;
        margin-top: 1rem;
    }

    .comments {
        margin-top: 1rem;
        max-height: 300px;
        overflow: hidden;
        overflow-y: scroll;
    }

    .comment {
        margin-bottom: 1rem;
    }

    strong {
        color: var(--primary-color);
        font-family: 'Arima', cursive;
        font-weight: 900;
    }

    p {
        font-size: 15px;
        font-weight: 300;
        color: rgb(65, 65, 65);
    }

    small {
        font-size: 13px;
        color: rgb(65, 65, 65);
    }

    h3 {
        font-family: 'Arima', cursive;
        font-weight: 900;
        color: var(--primary-color);
    }
    
</style>