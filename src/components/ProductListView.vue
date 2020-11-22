<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-one-quarter-widescreen is-one-third-desktop is-one-third-tablet is-full-mobile" v-for="item in items" v-bind:key="item.id">
                <ProductView
                        v-bind:title="item.title"
                        v-bind:price="item.price"
                        v-bind:discounted-price="item.price"
                        v-bind:image="item.images[0]"
                        v-bind:id="item.id"
                ></ProductView>
            </div>
        </div>
    </div>
</template>

<script>
    import ProductView from "./ProductView";
    export default {
        name: 'ProductListView',
        components: {ProductView},
        props: ["items"]
    }
</script>