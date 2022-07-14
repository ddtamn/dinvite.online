<script>
    import { onMount } from 'svelte';
    import '../css/style.css'
    import Header from '../components/Header.svelte';
    import Hero from '../components/Hero.svelte';
    import Wave from '../components/Wave.svelte';
    import About from '../components/About.svelte';
    import Features from '../components/Features.svelte';
    import Pricelist from '../components/Pricelist.svelte';
    import Footer from '../components/Footer.svelte';
    import WhatsappButton from '../components/WhatsappButton.svelte';
    

    onMount(() => {
        document.body.style.overflowY = 'scroll'
    })
</script>

<svelte:head>
    <!-- Primary Meta Tags -->
    <title>Dinvite - Undangan Pernikahan Digital Website</title>
    <meta name="title" content="Dinvite - Undangan Pernikahan Digital Website">
    <meta name="description" content="solusi undangan pernikahan website kamu jadi lebih menarik & berkesan">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website"> 
    <meta property="og:url" content="https://dinvite.online/">
    <meta property="og:title" content="Dinvite - Undangan Pernikahan Digital Website">
    <meta property="og:description" content="solusi undangan pernikahan website kamu jadi lebih menarik & berkesan">
    <meta property="og:image" content="https://dinvite.online/homepage.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://dinvite.online/">
    <meta property="twitter:title" content="Dinvite - Undangan Pernikahan Digital Website">
    <meta property="twitter:description" content="solusi undangan pernikahan website kamu jadi lebih menarik & berkesan">
    <meta property="twitter:image" content="https://dinvite.online/homepage.png">

    <meta name="robots" content="index, follow">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="revisit-after" content="15 days">
    <meta name="author" content="ddtamin">
    <meta name="theme-color" content="#5a9fbf"/>
    <title>Dinvite</title>

</svelte:head>

<main>
    <Header/>
    <Hero/>
    <Wave position={'top'}/>
    <About/>
    <Wave position={'bottom'}/>
    <Features/>
    <Wave position={'top'}/>
    <Pricelist/>
    <Footer/>
    <WhatsappButton/>
</main>





