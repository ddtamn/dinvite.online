<script context="module">
	export const load = async ({ session }) => {
		if (session.user.exists) {
			return {};
		} else {
			return {
				status: 301,
				redirect: '/ddtamn'
			};
		}
	};
</script>
<script>
	import { onMount } from 'svelte';

    import '../../../css/style.css';


	onMount(() => {
		document.body.style.overflowY = 'scroll'
	})
</script>

<main>
    <slot/>
</main>