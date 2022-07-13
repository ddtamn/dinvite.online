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





