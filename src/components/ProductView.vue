<template>
    <div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <a v-bind:href="'/product/'+id">
                <img v-bind:src="image" alt="Placeholder image" style="object-fit: cover;">
                </a>
            </figure>
        </div>
        <div class="card-content">
            <div class="content has-text-left">
                <p><a v-bind:href="'/product/'+id" class="has-text-dark"><strong>{{title}}</strong></a></p>
                <p>
                    <span style="font-size: 20px;">₹{{price}}</span>&nbsp;
                    <span class="has-text-grey"><strike>₹{{discountedPrice}}</strike></span>&nbsp;
                    <span class="has-text-success">{{((price-discountedPrice)/price)*100}}% OFF</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProductView',
        props: ["title", "price", "discountedPrice", "image", "id"]
    }
</script>