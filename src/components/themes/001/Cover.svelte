<script>
    import { onMount } from "svelte";
    import Fa from 'svelte-fa'
    import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons/index.es'

    export let hide = false

    let guest;
    let audio;
    let play = false

    onMount(() => {
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.search);
        guest = params.get('to')
    })

    function openCover(e) {
        hide = true
        e.target.closest('.content').querySelector('audio').play()
        play = true
        audio = e.target.closest('.content').querySelector('audio')
    }

    function playPause() {
        if (audio.paused) {
            audio.play()
            play = true
        } else {
            audio.pause()
            play = false
        }
        
    }


    export let name;
    export let backgroundImage;
    export let backsong;
</script>

<section class="{hide ? 'hide' : ''}">
    <div class="container" style="background-image: url('{backgroundImage}');">
        <div class="overlay"></div>
        <div class="content" data-aos="zoom-in">
            <p style="font-weight: 300;">Hai, {guest || ''}</p>
            <p style="font-weight: 300;">You are invited to our wedding day</p>
            <h1>{name}</h1>
            <button on:click="{(e) => openCover(e)}">Let's Begin</button>
            <audio src="{backsong}" loop="true"></audio>
        </div>
    </div>
</section>

<!-- <section class="{hide ? 'hide' : ''}">
    <div class="container" style="background-image: url('https://cdn.imweb.me/upload/S201904265cc294845b98d/3aeac83be14ce.jpg');">
        <div class="overlay"></div>
        <div class="content" data-aos="zoom-in">
            <p style="font-weight: 300;">Hai, {guest || ''}</p>
            <p style="font-weight: 300;">You are invited to our wedding day</p>
            <h1>{name}</h1>
            <button on:click="{(e) => openCover(e)}">Let's Begin</button>
            <audio src="https://drive.google.com/uc?export=view&id=1-oLHjArCAM4KVhWURk66QKPEbnrDbXMo" loop="true"></audio>
        </div>
    </div>
</section> -->
<div class="audio-controls" on:click="{playPause}">
    <div class="pause"><Fa icon={play ? faPause : faPlay}/></div>
</div>



<style>
    section {
       position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        height: 100vh;
        width: 100vw;
        transition: 0.3s ease;
        line-height: 1;
    }

    section.hide {
        transform: translateY(-100%);
    }

    .container {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        height: 100%;
        color: whitesmoke;
        width: 100%;
        padding: 0;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #25252581;
        z-index: 1;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        height: 100%;
        width: 100%;
        padding: 1rem;
        position: absolute;
        z-index: 2;
        color: whitesmoke;
        text-align: center;
    }
    

    h1 {
        font-family: 'Arima', cursive;
        font-weight: 900;
        font-size: 3rem;
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

    .audio-controls {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        background-color: var(--primary-color);
        z-index: 998;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        color: whitesmoke;
        display: grid;
        place-items: center;
        cursor: pointer;
        box-shadow: var(--box-shadow);
    }
</style>