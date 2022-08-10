<script>
    import '../css/themes/001.css'
    import '../css/flexbin.css'
    import Cover from '../components/themes/001/Cover.svelte';
    import Hero from '../components/themes/001/Hero.svelte';
    import Brides from '../components/themes/001/Brides.svelte';
    import SaveTheDate from '../components/themes/001/SaveTheDate.svelte';
    import Gallery from '../components/themes/001/Gallery.svelte';
    import Events from '../components/themes/001/Events.svelte';
    import Story from '../components/themes/001/Story.svelte';
    import Wish from '../components/themes/001/Wish.svelte';
    import Gift from '../components/themes/001/Gift.svelte';
    import Footer from '../components/themes/001/Footer.svelte'

    import AOS from 'aos'
    import "aos/dist/aos.css";
    import { onMount } from 'svelte';

    onMount(() => {
        AOS.init({
            duration : 1000
        })
    })

    let googleDriveLink = 'https://drive.google.com/uc?export=view&id='
    let aldhyImg = `${googleDriveLink}1nMjMOsvRpBKX1bmTmw2wr6sXwPyK7INk`
    let ayuImg = `${googleDriveLink}1zoIrl1P9kN8kg7ZC1YlRx1rB71cTIjpU`
    let ayuImg2 = `${googleDriveLink}1hH6TUw44w_wl6v-bfEkl0vAsjIYOJ5-e`
    
</script>

<svelte:head>
    <meta name="theme-color" content="#3f5978"/>
</svelte:head>

<main>
    <Cover name={'Ayu & Aldhi'} backgroundImage={'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/wwyj9ydj4dh2aunrmazil__optimize__.jpg?v=1.1'} backsong={'https://drive.google.com/uc?export=view&id=1aaLEA55VcmB_tDCEzfqMHXhL7p8yVWOd'}/>
    <Hero title={'Ayu & Aldhy'} backgroundImage={'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/wwyj9ydj4dh2aunrmazil__optimize__.jpg?v=1.1'} date={'Sabtu, 13 Agustus 2022'}/>
    <Brides bride={'Ayu Tasyana Putri'} brideParents={'Bpk. Drs. Tasiman. S.PD.,SH.,MH & Ibu Hetty Dwiana'} brideImage={`${ayuImg2}`} brideIg={'https://www.instagram.com/ayutasyanaputri/'} groom={'Aldhi Harmawan Suni'} groomImage={`${aldhyImg}`} groomParents={'Bpk. Mahdin Laadam & Ibu. Isra Ladomay'} groomIg={'https://www.instagram.com/aldhysuni/'} />
    <SaveTheDate theDate={'Sabtu, 13 Aug 2022'} backgroundImage={'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/ww7wji15qrx1e96wvnrnr__optimize__.jpg?v=1.1'}/>
    <!-- <Story/> -->
    <Gallery galleries={['1wou99zMIjUZPKgOIGsA2Mjor6iLomlhX', '1AFlYBncyriTYlwmwLEG7R7ZtNWZhSLuD', '1QolE9y8zfY6KhuJFzF7Ptf6q3ii7QcIN', '1v9BFj67e031-7ky1iq5Y3RLiCDe2Mreq', '16_gDm9qvqrWIHWxPfjhP6vC8_UGzc1gT', '14WFVFdPfhN9Y6bvXKwkJu6hvp8b0UIlc', '1sPkUtfT6wIizxo7WlgKYzJ9K1TN5wRbC', '1twEP9B1WMv1vNsdnc5nelFSWgI4sPiTj']}/>
    <Events firstEvent={'Sabtu, 27 Agustus 2022'} firstEventTime={'16 : 00 WITA'} firstEventDesc={'Kediaman Memepelai Wanita'} firstEventAddress={'Desa Teku, Kecamatan Balantak Utara'} firstEventMapIframe={'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1510.610231162741!2d123.44225925730078!3d-0.7735409546656831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sid!2sid!4v1660044876110!5m2!1sid!2sid'} firstEventMapLink={'https://goo.gl/maps/17KJ1baaCx1SdTu88'} secondEvent={'Sabtu, 27 Agustus 2022'} secondEventTime={'17.30 WITA'} secondEventDesc={'Kediaman Mempelai Wanita'} secondEventAddress={'Desa Teku, Kecamatan Balantak Utara'} secondEventMapIframe={'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1510.610231162741!2d123.44225925730078!3d-0.7735409546656831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sid!2sid!4v1660044876110!5m2!1sid!2sid'} secondEventMapLink={'https://goo.gl/maps/17KJ1baaCx1SdTu88'}/>

    <Wish/>
    <Gift/>
    <Footer/>
</main>
