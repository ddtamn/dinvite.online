<script>
    
let active = 'design'


</script>
<header>
    <div class="container">
        <div class="logo"><img src="/logo.png" alt=""></div>
        <ul>
            <li class="{active == 'design' ? 'active' : ''}">
                <h6>Design</h6>
            </li>
            <li class="{active == 'theme' ? 'active' : ''}">
                <h6>Theme</h6>
            </li>
            <li class="{active == 'settings' ? 'active' : ''}">
                <h6>Settings</h6>
            </li>
        </ul>
    </div>
</header>


<style>
    header {
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        background: var(--background-variant);
        box-shadow: var(--box-shadow);
        z-index: 999;
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        padding-bottom: 0.5rem;
    }

    .logo {
        width: 35px;
    }

    ul {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }

    li {
        cursor: pointer;
        color: var(--color-muted);
    }

    li.active {
        position: relative;
        color: var(--color);
        
    }

    li.active::before {
        content: '';
        position: absolute;
        bottom: -7px;
        left: 0;
        width: 100%;
        height: 3px;
        background: var(--primary-gradient);
    }

    h6 {
        font-size: 15px;
        font-weight: 600;
        text-transform: uppercase;
    }

    
</style>