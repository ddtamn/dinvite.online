
<script>
	// import { session } from '$app/stores';
	import { request } from '../../ddtamn/fetch.js';
	import { fly, fade } from 'svelte/transition';
    import {goto} from '$app/navigation'
	const signOut = async () => {
		await request('/ddtamn/auth', 'DELETE');
		window.location.replace('/ddtamn');
	};

	let promps = false;
    let title = ''
	let errorMessage = ''
	let slug = ''
	let changeSlug = false


    function getTitle() {
        if(title.length < 6) return errorMessage = 'title must be more than 6 letters'
		errorMessage = ''
		
		goto(`/ddtamn/dashboard/build?t=${createSlug(title)}`)
    }

	function createSlug(string) {
		string = string.toLowerCase();
		string = string.replace(/[^a-z0-9]+/g, '-');
		string = string.replace(/^-+|-+$/g, '');
    return string;
	}
</script>

<section>
	<div class="container">
		{#if !promps}
			<div class="content" in:fly={{ y: 200, duration: 500, delay: 500 }} out:fade>
				<h1>Welcome Admin!</h1>
				<button on:click={() => (promps = true)}>Buat Undangan</button>
				<button on:click={signOut}>Sign-out</button>
			</div>
		{/if}
		{#if promps}
			<div class="promps" in:fly={{ y: 200, duration: 500, delay: 500 }} out:fade>
				<p style="color: red;">{errorMessage}</p>
				<input on:keyup="{() => {slug = createSlug(title), changeSlug = true}}" class="form-control" name="title" type="text" bind:value="{title}" placeholder="eg:Andi & Indah" />
				<p style="font-size: 0.8rem; margin-top: 0.8rem;">https://dinvite.online/<span>{slug}</span></p>
				<!-- <span>{changeSlug ? 'change' : ''}</span> -->
                <div class="foot">
                    <button on:click={() => (promps = false)}>Back</button>
                    <button on:click={getTitle}>Next</button>
                </div>
			</div>
		{/if}
	</div>
</section>

<style>
	section {
		display: grid;
		place-items: center;
	}
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		min-height: 100vh;
		width: 100%;
		max-width: 400px;
		padding: 1rem;
	}

	button {
		all: unset;
		background: var(--primary-gradient);
		color: whitesmoke;
		padding: 5px 8px;
		border-radius: 0.5rem;
		border: none;
		cursor: pointer;
		margin-right: 1rem;
		margin-top: 1rem;
	}

	.promps {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		width: 100%;
	}
</style>


