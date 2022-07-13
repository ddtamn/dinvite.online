<script>
    import '../../../css/themes/001.css'
    import '../../../css/flexbin.css'
    import Cover from '../../../components/themes/001/Cover.svelte';
    import Hero from '../../../components/themes/001/Hero.svelte';
    import Brides from '../../../components/themes/001/Brides.svelte';
    import SaveTheDate from '../../../components/themes/001/SaveTheDate.svelte';
    import Gallery from '../../../components/themes/001/Gallery.svelte';
    import Events from '../../../components/themes/001/Events.svelte';
    import Story from '../../../components/themes/001/Story.svelte';
    import Wish from '../../../components/themes/001/Wish.svelte';

    import AOS from 'aos'
    import "aos/dist/aos.css";
    import { onMount } from 'svelte';

    onMount(() => {
        AOS.init({
            duration : 1000
        })
    })
</script>

<svelte:head>
    <meta name="theme-color" content="#3f5978"/>
</svelte:head>

<main>
    <Cover/>
    <Hero/>
    <Brides/>
    <SaveTheDate/>
    <Story/>
    <Gallery/>
    <Events/>
    <Wish/>
</main>
