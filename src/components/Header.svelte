<script>
    let open = false
    function mobileToggle() {
        open ? open = false : open = true
    }
</script>

<header>
    <div class="container">
        <a href="/" class="logo">dinvite</a>
        <div on:click="{mobileToggle}" class="mobile-toggle {open ? 'open' : ''}">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <nav class="{open ? 'show' : ''}">
            <ul>
                <li class="active">
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/tema">Tema</a>
                </li>
                <li>
                    <a href="/harga">Harga</a>
                </li>
                <li>
                    <a href="/blog">Blog</a>
                </li>
            </ul>
            <ul class="mobile-menu">
                <li>
                    <a href="/">Syarat & Ketentuan</a>
                </li>
                <li>
                    <a href="/">Tentang Kami</a>
                </li>
                <li>
                    <a href="/">Kebijakan Privasi</a>
                </li>
                <li>
                    <a href="/">FAQ</a>
                </li>
                <li>
                    <a href="/">Pesan Sekarang</a>
                </li>
            </ul>
        </nav>
    </div>
    
</header>


<style>
   header {
    position: fixed;
    width: 100vw;
    top: 0;
    z-index: 999;
    height: 4rem;
    background-color: var(--background);
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding-inline: 3rem;
}

.logo {
    font-family: "cano", sans-serif;
    color: var(--primary);
    font-size: 1.8rem;
}

ul {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.mobile-menu {
    display: none;
}

li.active a, li.active a:hover {
    color: var(--primary);
}

.mobile-toggle {
    display: none;
}

@media screen and (max-width: 768px) {
    header {
        border-bottom: 1px solid var(--border-color);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
    }
    .container {
        padding-inline:1rem ;
    }
    
    .mobile-toggle {
        display: block;
        width: 21px;
        height: 24px;
        position: relative;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .5s ease-in-out;
        -moz-transition: .5s ease-in-out;
        -o-transition: .5s ease-in-out;
        transition: .5s ease-in-out;
        cursor: pointer;
    }

    .mobile-toggle span {
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        background: var(--primary);
        border-radius: 9px;
        opacity: 1;
        left: 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    }

    .mobile-toggle span:nth-child(1) {
        top: 0;
    }

    .mobile-toggle span:nth-child(2), .mobile-toggle span:nth-child(3) {
        top: 8px;
    }

    .mobile-toggle span:nth-child(4) {
        top: 16px;

    }

    .mobile-toggle.open span:nth-child(1) {
        top: 8px;
        width: 0%;
        left: 50%;
    }

    .mobile-toggle.open span:nth-child(2) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .mobile-toggle.open span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    .mobile-toggle.open span:nth-child(4) {
        top: 8px;
        width: 0%;
        left: 50%;
    }

    nav {
        position: fixed;
        width: 100vw;
        top: 4rem;
        left: 0;
        padding-block: 1rem;
        transform: translateX(100%);
        opacity: 0;
        transition: 0.3s ease-in-out;
        pointer-events: none;
        padding: 1rem;
    }

    nav.show {
        transform: translateX(0);
        opacity: 1;
        background-color: var(--background);
        pointer-events: all;
       
    }

    ul {
        flex-direction: column;
        font-size: 1.3rem;
    }

    .mobile-menu {
        display: flex;
        margin-top: 1rem;
    }

}
</style>