<script>
    import { onMount } from 'svelte';
    import '../css/style.css'
    import Header from '../components/Header.svelte';
    import Hero from '../components/Hero.svelte';
    import Wave from '../components/Wave.svelte';
    import About from '../components/About.svelte';
    import Features from '../components/Features.svelte';
    import Pricelist from '../components/Pricelist.svelte';

    onMount(() => {
        document.body.style.overflowY = 'scroll'
    })
</script>

<svelte:head>
    <meta name="theme-color" content="#5a9fbf">
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
</main>


