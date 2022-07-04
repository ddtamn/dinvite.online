<script>
    export let position;
</script>


<div class="{position == 'top' ? 'top-wave' : 'bottom-wave'}" >
        <svg width="100%" preserveAspectRatio="none" height="100px" viewBox="0 0 1300 100" version="1.1"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path
                d="M1300,0 L1300,99.9998042 L0,99.9998042 L0,60.1910374 C549.576968,-84.3633414 541.584175,191.147059 1300,0 Z"
                fill="#e9ebee" />
        </svg>
</div>

<style>
    .top-wave {
        margin-top: -100px;
        position: relative;
        z-index: 1; 
    }

    .bottom-wave {
        transform: rotate(180deg);
        margin-top: -10px;
        position: relative;
        z-index: 1;
    }
</style>