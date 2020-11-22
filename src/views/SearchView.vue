<template>
    <div>
        <top-navigation-bar></top-navigation-bar>
        <section class="section has-text-left is-marginless">
            <h2 class="subtitle">Searching for <strong>{{title}}</strong></h2>

            <span class="tag is-medium" style="margin-right: 10px;" v-for="facet in facets" v-bind:key="facet.name">
                {{facet.name}}&nbsp;({{facet.count}})
            </span>
        </section>
        <div class="container" v-if="items.length === 0">
            <div class="notification">
                <h1>No Results Found</h1>
            </div>
        </div>
        <product-list-view v-bind:items="items"></product-list-view>
    </div>
</template>
<script>
    import TopNavigationBar from "../components/TopNavigationBar";
    import ProductListView from "../components/ProductListView";

    export default {
        name: 'SearchView',
        components: {ProductListView, TopNavigationBar},
        data() {
            return {
                title: null,
                facets: [],
                items: []
            }
        },
        mounted() {
            console.log(this.$route.query);
            let title = this.$route.query.title || '';
            let filters = this.$route.query.filters || '{}';
            console.log(filters);
            fetch('http://localhost:5000/product/search?title=' + title + '&filters=' + encodeURIComponent(filters))
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    this.items = result.products;
                    this.title = title;
                    this.facade = [];
                    for (const [key, value] of Object.entries(result.facets)) {
                        this.facets.push({
                            name: key,
                            count: value
                        });
                    }
                });
        }
    }
</script>