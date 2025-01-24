<script lang="ts">
    import type { PageProps } from './$types';
    import Navbar from "$lib/components/navbar.svelte";
    import ProductModal from "$lib/components/productModal.svelte";
    import Footer from '$lib/components/footer.svelte';
    import type { Product } from '$lib/types/Product';

    let { data  } : PageProps = $props();

    const products : Product[] = data.products; 
    let filter = $state('')
    let products_to_show : Product[] = $state(data.products);

    let search = () =>{
        console.log(filter)
        products_to_show = products.filter((product) => product.title.includes(filter) )
    }
</script>

<Navbar />

<div class="text-center">
    <input class="shadow appearance-none border rounded  w-300 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center" id="username" placeholder="Czego szukasz?..."
    bind:value={filter}
    oninput={search}
    >
</div>

<section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
            {#each products_to_show as product}
                <ProductModal product = {product} />
            {/each}

        </div>
    </div>
</section>

<Footer />