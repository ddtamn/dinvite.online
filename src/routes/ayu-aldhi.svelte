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


    // array photo link
    let galleries= [
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/oqlrg5b1xem7cup8r60jyw__optimize__.jpg?v=1.1', 
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/3xgnyihpmxa1gqjn6i6zcn__optimize__.jpg?v=1.1', 
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/x15kpk58a5e239osag7qg5__optimize__.jpg?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/lbt31y0pgh9kgjjm8n924d__optimize__.jpg?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/cse28memclgdjkpvy59du8__optimize__.jpg?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/ww7wji15qrx1e96wvnrnr__optimize__.jpg?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/4iuz0cc5u090n54ujzduyu__optimize__.jpg?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/v10fhvsxa58us8u1flpyr__optimize__.jpg?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/av8j7yx8khicbj5k7gxusf__optimize__.JPG?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/824gkxpft5e50bwgmkgusu__optimize__.JPG?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/h8pkxdtsumt9u1fsl9mt59__optimize__.JPG?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/96fyqhe487a6m2qvaql0wj__optimize__.JPG?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/9dl13q941gaungdndwe5q__optimize__.JPG?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/pwqdju9t9g9urx71u3joas__optimize__.JPG?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/90mbhudmj0f0z9wzwsepcrp__optimize__.jpg?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/rs3b43h9y5tebom7aq2drv__optimize__.jpg?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/9z1pr6o7inddaua046vw77__optimize__.jpg?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/am5cqjq6h6w9i3bo55rms9__optimize__.jpg?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/vz0t9z60ykmiuh36bwork8__optimize__.jpg?v=1.1',
        'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/xhcb1ax8kxp3bkfzcdb8up__optimize__.jpg?v=1.1'
]
    
</script>

<svelte:head>
    <meta name="theme-color" content="#3f5978"/>
</svelte:head>

<main>
    <Cover name={'Ayu & Aldhi'} backgroundImage={'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/wwyj9ydj4dh2aunrmazil__optimize__.jpg?v=1.1'} backsong={'https://drive.google.com/uc?export=view&id=1fAvRooeA4y7dvyhgTCzvqgbWOOXpar9K'}/>
    <Hero title={'Ayu & Aldhi'} backgroundImage={'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/wwyj9ydj4dh2aunrmazil__optimize__.jpg?v=1.1'} date={'Sabtu, 13 Agustus 2022'}/>
    <Brides bride={'Ayu Tasyana Putri'} brideParents={'Bpk. Drs. Tasiman. S.PD.,SH.,MH & Ibu Hetty Dwiana'} brideImage={`${ayuImg2}`} brideIg={'https://www.instagram.com/ayutasyanaputri/'} groom={'Aldhi Harmawan Suni'} groomImage={`${aldhyImg}`} groomParents={'Bpk. Ir.H.Usman Suni. MM (Alm) & Ibu Hj, Harlinawati Sy Muid. SE.,M.Si'} groomIg={'https://www.instagram.com/aldhysuni/'} />
    <SaveTheDate theDate={'Sabtu, 13 Aug 2022'} backgroundImage={'https://d3n3bt0mjyudkt.cloudfront.net/uploads/__filtered__/albums/photoversion/ww7wji15qrx1e96wvnrnr__optimize__.jpg?v=1.1'} calendarLink={'https://calendar.google.com/event?action=TEMPLATE&tmeid=NXVkOW82aW0zZHVhcmJodnRjMWpsODg1cnIgZGlkaXRhbWluLm1AbQ&tmsrc=diditamin.m%40gmail.com'}/>
    <!-- <Story/> -->
    <Gallery {galleries}/>
    <Events secondEvent={'Sabtu, 13 Agustus 2022'} secondEventTime={'19 : 30 WITA s/d Selesai'} secondEventDesc={'Estrella Hotel & Conference'} secondEventAddress={'Desa Teku, Kecamatan Balantak Utara'} secondEventMapIframe={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.2142029141473!2d122.79077731528339!3d-0.99707363566158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d86a143afd18541%3A0xd1052911d7aedda4!2sEstrella%20Hotel%20%26%20Conference%20Center%20-%20Luwuk!5e0!3m2!1sid!2sid!4v1660148625156!5m2!1sid!2sid'} secondEventMapLink={'https://goo.gl/maps/2T8paMYyAjBA1UT17'}/>
    <Wish/>
    <Gift accountName={'AYU TASYANA PUTRI'} accountNumber={'6795129590'}/>
    <Footer brides={'Ayu & Aldi'} date={'Sabtu, 13 Agustus 2022'} />
</main>
