<script lang="ts">
    import type { Product } from "$lib/types/Product";
    import type { ChangeEventHandler } from "svelte/elements";
    import type { PageProps } from "./$types";

    let { data  } : PageProps = $props();
     const product : Product = data.product;

     const user = data.user;

     let amount = $state(1);
     const changehandlerer : ChangeEventHandler<HTMLInputElement> = (event) =>{
        let value = 1;
        event.target instanceof HTMLInputElement ? value = parseInt(event.target.value) : value = 1;
        amount = value > 0 ? value : 1;
     }



     let rating = $state(0);
     let opinion = $state('');
</script>

<div class="container mx-auto border-2 shadow-md p-4 mt-10">
    <div class="grid grid-cols-1 md:grid-cols-2">
        <img src={product.image} alt={"Zdjęcie " + product.title} class="h-96 object-cover mx-auto"/>
        <div class="p-2">
            <h1 class="text-2xl p-3 text-center font-bold text-white bg-gray-800 shadow-lg rounded-full mb-2">{product.title}</h1>
            <p class="bg-gray-100 p-4 rounded mt-4">
                {product.description}
            </p>
            <p class="text-2xl font-bold text-red-500 text-center m-5">
                ${product.price}
            </p>
            <div class="w-fit mx-auto">
            <input type="number" min=1 bind:value={amount} onchange={changehandlerer}  class="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <button class="bg-gray-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Dodaj do koszyka
            </button>
            </div>
        </div>
    </div>
</div>

<div class="container mx-auto border-2 shadow-md p-4">
    <form class="max-w-2xl bg-white rounded-lg border p-2 mx-auto">
        <div class="flex mx-auto w-fit">
            {#each Array(5) as _, i}
              <button class:filled={i < rating} onclick={() => rating = i+1}
                class="text-3xl "
                >★</button>
            {/each}
          </div>
        <div class="px-3 mb-2 mt-2">
            <textarea placeholder="comment" class="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            contenteditable
            bind:textContent={opinion}
            ></textarea>
        </div>
        <div class="flex justify-end px-4">
            <button type="submit" class="px-2.5 py-1.5 rounded-md text-white text-sm bg-gray-800">Wystaw</button>
        </div>
    </form>
</div>

<style>
    .filled{
        @apply text-yellow-500;
    }
</style>

