<script lang="ts">
    import star from '$lib/assets/star.png'
    import type { Product } from '$lib/types/Product';
    interface Props {
		product : Product
	  }

    let {product} : Props = $props();
</script>

<div class="flex flex-col lg:w-1/4 md:w-1/2 p-2">
  <a class=" w-full h-full hover:bg-gray-100 relative shadow-md p-4" href={'/product/'+product.id}>

    <div class="h-48 w-full relative">
      <img class="object-cover h-full mx-auto" src={product.image} alt="ecommerce">
    </div>
  
      <div class="mt-4 flex-grow">
          <h2 class="text-gray-900 font-medium">${product.price} </h2>
          <h2 class="text-gray-800 title-font text-md font-small mt-1">{product.title}</h2>
              <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
              <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1 inline-flex">{product.rating.rate} <img src={star} alt='' class="w-4 h-4"/> </h3>
        <p class="mt-3">{product.description}</p>
      </div>
  </a>
</div>

