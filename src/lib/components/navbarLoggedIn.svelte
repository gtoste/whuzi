<script lang="ts">
    import type {User} from "$lib/types/User";
    interface Props {
        user : User
    }
    let {user} : Props = $props()

    async function logout() {
        await fetch('/api/logout', { method: 'POST' });
        location.reload();
    }
</script>

<header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/">
            <span class="text-2xl p-3 text-center font-bold text-white bg-gray-800 shadow-lg rounded-full">Whuzi</span>
        </a>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <h3 class="mr-5">Witaj {user.email}! </h3>

            <button class="mr-5 hover:text-gray-900" onclick={()=>{logout()}} >Wyloguj </button>

            <a class="mr-5 hover:text-gray-900" href="/koszyk">Koszyk </a>

        </nav>

    </div>
</header>