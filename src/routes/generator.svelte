<script>
     import '../css/themes/001.css'
    import '../css/style.css'
    let generatorLink;
    let result = ''
     let showResult = false
     let showMessage = false

    
    function generate() {
        let str = generatorLink
        let res = str.replace(' ', '%20')
        result = `https://dinvite.online/ayu-aldhi?to=${res}`
        showResult = true
    }

function copyLink() {
let text = `
Assalamu'alaikum Warahmatullahi Wabarakaatuh 

Tanpa mengurangi rasa hormat, izinkan kami mengundang Bapak/Ibu/Saudara/i
untuk hadir serta memberikan do'a restu pada acara pernikahan kami.

Link undangan :
${result}

Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i 
berkenan hadir.

Do'a restu Anda merupakan hadiah terindah bagi kami.

Atas kehadiran dan do'a restu yang telah diberikan, kami ucapkan terima kasih.

Kami yang berbahagia 
Ayu & Aldhi`
        
navigator.clipboard.writeText(text);
showMessage = true
        

setTimeout(() => {
showMessage = false
        }, 500)
    }

   
    
</script>

<section>
    <div class="container">
        <div class="title">Generator tamu undangan <br> Ayu & Aldhi</div>
        <input placeholder="tuliskan nama tamu" class="form-control" bind:value="{generatorLink}" type="text" >
        <button on:click="{generate}">Generate</button>
        {#if showResult}
            <!-- <input class="result" type="text" readonly value="{result}"> -->
            <textarea class="result" readonly value={result}></textarea>
            <button on:click="{copyLink}">Copy</button>
            {#if showMessage}
            <p>berhasil dicopy!</p>
            {/if}
        {/if}
        
    </div>
</section>



<style>
     section {
        display: grid;
        place-items: center;
        text-align: center;
        color: whitesmoke;
        
    }
   .container {
        width: 100vw;
        max-width: 750px;
        height: 100vh;
        padding: 1rem;
        padding-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color: #3F5978;
        
    }

    .title {
        font-size: 19px;
        font-weight: bold;
        margin-bottom: 2rem;
    }

    .form-control {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: block;
        width: 100%;
        padding: 5px;
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

    button {
        padding: 8px 20px;
        border-radius: 5px;
        outline: none;
        border: none;
        /* background: var(--primary-color); */
        font-size: 15px;
        cursor: pointer;
        color: var(--primary-color);
        transition: all 0.25s ease-in-out;
        margin-top: 1rem;
    }

</style>