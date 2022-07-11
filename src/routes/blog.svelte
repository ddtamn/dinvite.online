<script>
    import { onMount } from 'svelte';
    import '../css/style.css';
    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';
    import WhatsappButton from '../components/WhatsappButton.svelte';

    onMount(() => {
        document.body.style.overflowY = 'scroll'
    })
</script>

<svelte:head>
    <title>Dinvite - Blog</title>
</svelte:head>


<main>
    <Header/>
    <section>

    </section>
    <Footer/>
    <WhatsappButton/>
</main>


<style>
    section {
        min-height: 50vh;
    }
</style>

