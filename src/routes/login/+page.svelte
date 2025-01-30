<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import type { PageProps } from './$types';

    let { data, form }: PageProps = $props();
</script>

<div class="flex flex-row justify-center items-center mt-10">

</div>


<div class="flex flex-row justify-center items-center">
    <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Email
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email">
                {#if form?.missing}<p class="text-red-500 text-xs italic">The email field is required</p>{/if}
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************">
<!--                todo-->
                {#if form?.incorrect}<p class="text-red-500 text-xs italic">Invalid credentials!</p>{/if}
                {#if form?.taken}<p class="text-red-500 text-xs italic">Invalid credentials!</p>{/if}
            </div>
            <div class="flex items-center justify-between">
                <button class="bg-gray-900  hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" formaction="?/login">
                    Sign In
                </button>

                <button class="bg-gray-900  hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" formaction="?/register">
                    Register
                </button>

            </div>
        </form>
    </div>
</div>


