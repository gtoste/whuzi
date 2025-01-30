<script lang="ts">
	import '../app.css';
    import Navbar from "$lib/components/navbar.svelte";
    import NavbarLoggedIn from "$lib/components/navbarLoggedIn.svelte";
    import type {LayoutProps} from "../../.svelte-kit/types/src/routes/$types";
	let { children, data } : LayoutProps = $props();
    let user = data.user;
</script>

{#if user === null}
    <Navbar />
{:else }
    <NavbarLoggedIn user = {user} />
{/if}


{@render children()}
