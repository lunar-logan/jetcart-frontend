<template>
    <div>

        <!-- Main container -->
        <nav class="level has-background-light" style="padding: 8px;">
            <!-- Left side -->
            <div class="level-left">
                <div class="level-item">
                    <p class="subtitle is-5">
                        <strong>Jetcart</strong>
                    </p>
                </div>
            </div>

            <div class="level-item">
                <div class="field" style="width: 50vw;">
                    <p class="control has-icons-left">
                        <input class="input" type="email" placeholder="Search for Products, Brands and more">
                        <span class="icon is-small is-left">
                            <i class="fas fa-search"></i>
                        </span>
                    </p>
                </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
                <!--                <p class="level-item"><strong>All</strong></p>-->
            </div>
        </nav>

        <section class="section">
            <div class="container">
                <input type="button" class="button is-primary" value="Load Products" v-on:click="loadProducts">
                <ProductListView v-bind:items="items"></ProductListView>
            </div>
        </section>
    </div>
</template>

<script>
    import ProductListView from "../components/ProductListView";

    export default {
        components: {ProductListView},
        data: function () {
            return {
                items: []
            }
        },
        methods: {
            loadProducts() {
                console.log("Loading Products...");
                fetch('http://localhost:5000/product')
                    .then(response => response.json())
                    .then(data => {
                        this.items = data;
                    })
            }
        }
    }
</script>