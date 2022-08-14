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

    

    let data = [{
        name : 'ddtddamn',
        msg : 'happy wedding'
    }]

    let giftData = [
        {
            bankName : 'bri',
            accountName : 'Indra Siodja',
            accountNumber : '1797-01-008076-50-4'
        },
        {
            bankName : 'bsi',
            accountName : 'Gisman la adam',
            accountNumber : '7123209545'
        },
    ]

    let googleDriveLink = 'https://drive.google.com/uc?export=view&id='
</script>

<svelte:head>
    <meta name="title" content="The Wedding of Indah & Gisman">
    <meta name="description" content="You are invited to the wedding of Indha & Gisman">
    <meta name="keywords" content="undangan digital, undangan web, ">
    <meta name="robots" content="index, follow">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="revisit-after" content="30 days">
    <meta name="author" content="ddtamn">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://dinvite.online/indah-gisman">
    <meta property="og:title" content="The Wedding of Indah & Gisman">
    <meta property="og:description" content="You are invited to the wedding of Indah & Gisman">
    <meta property="og:image" content="https://dinvite.online/uploads/indahgisman.jpeg">
    <meta name="theme-color" content="#3f5978"/>
</svelte:head>

<main style="--primary-color : #606350; --secondary-color: #393b2b" >
    <Cover name={'Indah & Gisman'} backgroundImage={'https://dinvite.online/uploads/indahgisman.jpeg'} backsong={'https://drive.google.com/uc?export=view&id=1aaLEA55VcmB_tDCEzfqMHXhL7p8yVWOd'}/>
    <Hero title={'Indah & Gisman'} backgroundImage={'https://dinvite.online/uploads/indahgisman.jpeg'} date={'Sabtu, 27 Agustus 2022'}/>
    <Brides bride={'Indra Siodja, A. Md.AK'} brideParents={'Bpk. Haswan Siodja & Ibu. Irna Manasai'} brideImage={'https://drive.google.com/uc?export=view&id=1OQve2H59bXVaGIDddgU7djK-WF-QM7q1'} brideIg={'https://www.instagram.com/indahsiodja67/'} groom={'Gisman Laadan, A.Md.Ft'} groomImage={'https://drive.google.com/uc?export=view&id=1UO_miwox-7LpAgXHX8-8mLXHvtV0rWJG'} groomParents={'Bpk. Mahdin Laadam & Ibu. Isra Ladomay'} />
    <SaveTheDate theDate={'Sabtu 27 Aug 2022'} backgroundImage={'https://drive.google.com/uc?export=view&id=1wou99zMIjUZPKgOIGsA2Mjor6iLomlhX'}/>
    <!-- <Story/> -->
    <Gallery galleries={[`${googleDriveLink}1wou99zMIjUZPKgOIGsA2Mjor6iLomlhX`, `${googleDriveLink}1AFlYBncyriTYlwmwLEG7R7ZtNWZhSLuD`, `${googleDriveLink}1QolE9y8zfY6KhuJFzF7Ptf6q3ii7QcIN`, `${googleDriveLink}1v9BFj67e031-7ky1iq5Y3RLiCDe2Mreq`, `${googleDriveLink}16_gDm9qvqrWIHWxPfjhP6vC8_UGzc1gT`, `${googleDriveLink}14WFVFdPfhN9Y6bvXKwkJu6hvp8b0UIlc`, `${googleDriveLink}1sPkUtfT6wIizxo7WlgKYzJ9K1TN5wRbC`, `${googleDriveLink}1twEP9B1WMv1vNsdnc5nelFSWgI4sPiTj`]}/>
    <Events firstEvent={'Sabtu, 27 Agustus 2022'} firstEventTime={'16 : 00 WITA'} firstEventDesc={'Kediaman Memepelai Wanita'} firstEventAddress={'Desa Teku, Kecamatan Balantak Utara'} firstEventMapIframe={'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1510.610231162741!2d123.44225925730078!3d-0.7735409546656831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sid!2sid!4v1660044876110!5m2!1sid!2sid'} firstEventMapLink={'https://goo.gl/maps/17KJ1baaCx1SdTu88'} secondEvent={'Sabtu, 27 Agustus 2022'} secondEventTime={'17.30 WITA'} secondEventDesc={'Kediaman Mempelai Wanita'} secondEventAddress={'Desa Teku, Kecamatan Balantak Utara'} secondEventMapIframe={'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1510.610231162741!2d123.44225925730078!3d-0.7735409546656831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sid!2sid!4v1660044876110!5m2!1sid!2sid'} secondEventMapLink={'https://goo.gl/maps/17KJ1baaCx1SdTu88'}/>

    <!-- <Wish messageData={data}/> -->
    <Gift data={giftData} />
    <Footer brides={'Indah & Gisman'} date={'Sabtu, 27 Agustus 2022'} />
</main>
