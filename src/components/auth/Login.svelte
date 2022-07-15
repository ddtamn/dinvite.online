<script>
    import '../../css/style.css'
    import { auth } from "../../routes/ddtamn/firebase";
    import { signInWithEmailAndPassword } from "firebase/auth";
    import { request } from "../../routes/ddtamn/fetch.js";
    import { goto } from '$app/navigation';

    let email, password

    const login = async () => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const idToken = userCredential._tokenResponse.idToken
        await request("/ddtamn/auth", 'POST', {idToken});
        goto('ddtamn/app');
    }
  

</script>

<section>
    <div class="container">
        <a href="/"><img src="/favicon.png" alt=""></a>
        <!-- <p>{message}</p> -->
        <form action="" on:submit|preventDefault="{login}">
            <label for="email">Email</label>
            <input required bind:value="{email}" name="email" type="email" class="form-control">
            <label for="password">Password</label>
            <input required bind:value="{password}" name="password" type="password" class="form-control">
            <button type="submit">Login</button>
        </form>
        
    </div>
</section>


<style>
    section {
        display: grid;
        place-items: center;
        min-height: 100vh;
    }

    .container  {
        width: 100vw;
        display: grid;
        place-items: center;
        gap: 1rem;
    }

    img {
        width: 60px;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 1rem;
        width: 100%;
        max-width: 400px;
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
        box-shadow: 0 0 2px var(--primary);
        border: 1px solid var(--primary);
    
    }

    label {
        margin-bottom: -0.5rem;
    }

    button {
        padding: 8px 20px;
        border-radius: 5px;
        outline: none;
        border: none;
        background: var(--primary);
        font-size: 15px;
        cursor: pointer;
        color: whitesmoke;
        transition: all 0.25s ease-in-out;
        width: 100%;
    }
</style>