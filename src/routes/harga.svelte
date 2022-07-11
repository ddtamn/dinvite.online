<script>
    import { onMount } from 'svelte';
    import '../css/style.css';
    import Header from '../components/Header.svelte';
    import Pricelist from '../components/Pricelist.svelte';
    import Footer from '../components/Footer.svelte';
    import WhatsappButton from '../components/WhatsappButton.svelte';

    onMount(() => {
        document.body.style.overflowY = 'scroll'
    })
</script>

<svelte:head>
    <title>Dinvite - Harga</title>
</svelte:head>


<main>
    <Header/>
    <section>
        <Pricelist/>
    </section>
    <Footer/>
    <WhatsappButton/>
</main>


<style>
    section {
        min-height: 50vh;
        margin-top: 5rem;
    }
</style>

