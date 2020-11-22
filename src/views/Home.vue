<template>
    <div>
        <top-navigation-bar></top-navigation-bar>
        <section class="hero is-medium is-light is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        <a href="/" class="has-text-dark">Jetcart.com</a>
                    </h1>
                    <h2 class="subtitle">
                        One stop destination for all your needs
                    </h2>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container has-text-left">
                <h2 class="subtitle">Top Products</h2>
                <product-list-view v-bind:items="items"></product-list-view>
            </div>
        </section>
    </div>
</template>

<script>

    import TopNavigationBar from "../components/TopNavigationBar";
    import ProductListView from "../components/ProductListView";

    export default {
        name: 'Home',
        components: {ProductListView, TopNavigationBar},
        data() {
            return {items: []}
        },
        mounted() {
            fetch('http://localhost:5000/product')
                .then(response => response.json())
                .then(data => {
                    this.items = data;
                });
        }
    }
</script>
