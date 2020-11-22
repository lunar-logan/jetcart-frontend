<template>
    <div>
        <TopNavigationBar></TopNavigationBar>
        <section class="section is-paddingless">
            <div class="container">
                <nav class="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li>
                            <a v-bind:href="'/search?filters=' + encodeURIComponent(JSON.stringify({category: data.category}))">{{data.category}}</a>
                        </li>
                    </ul>
                </nav>
                <div class="columns">
                    <div class="column is-one-third">
                        <PDPImageGallery
                                v-bind:images="data.images"
                                v-bind:default-image="data.images[0]"
                        >
                        </PDPImageGallery>

                    </div>
                    <div class="column has-text-left is-two-third">
                        <p class="subtitle"><strong>{{data.title}}</strong></p>
                        <p></p>
                        <p class="title">₹{{data.price}}</p>

                        <p class="content">
                            {{data.description || 'No Description Available'}}
                        </p>
                        <p></p>
                        <div class="field has-addons">
                            <div class="control has-icons-left">
                                <input class="input" type="text" placeholder="Enter Delivery Pincode">
                                <span class="icon is-small is-left">
                              <i class="fa fa-map-marker"></i>
                            </span>
                            </div>

                            <div class="control">
                                <a class="button is-light">
                                    Check
                                </a>
                            </div>
                        </div>
                        <div class="block">
                            <input type="button" class="button is-primary is-large" value="Add to cart"
                                   v-on:click="addItemToCart">
                        </div>
                        <div class="block">
                            <div v-if="itemInCart" class="notification is-info is-light" style="border:  solid 1px;">
                                Item added to cart
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import PDPImageGallery from "../components/PDPImageGallery";
    import TopNavigationBar from "../components/TopNavigationBar";

    export default {
        name: 'ProductDescriptionView',
        components: {TopNavigationBar, PDPImageGallery},
        data: function () {
            return {
                productId: null,
                apiBaseUrl: null,
                data: {},
                itemInCart: false,
            }
        },
        mounted() {
            this.productId = this.$route.params.id;
            this.apiBaseUrl = this.$route.query.apiBaseUrl || "http://localhost:5000/product";
            this.loadProductData()
        },
        methods: {
            loadProductData() {
                fetch(this.apiBaseUrl + "/" + this.productId)
                    .then(response => response.json())
                    .then(data => {
                        this.data = data
                    });
            },
            addItemToCart() {
                let cartId = localStorage.getItem("cartId");
                let productId = this.productId;
                if (cartId === "undefined" || cartId === null) {
                    console.log("As cart id is undefined, creating a new one");
                    fetch("http://localhost:5000/v1/cart", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            items: [{
                                unit_price: this.data.price,
                                sku: productId,
                                quantity: 1
                            }]
                        }),

                    }).then(response => response.json())
                        .then(cartData => {
                            localStorage.setItem("cartId", cartData.id);
                            this.itemInCart = true;
                            // location.reload();
                        });
                } else {
                    console.log('Cart exists, patching it');
                    this.patchCart(cartId);
                }
            },
            patchCart(cartId) {
                fetch('http://localhost:5000/v1/cart/' + cartId, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify([{
                        unit_price: this.data.price,
                        sku: this.productId,
                        quantity: 1
                    }])
                }).then(response => {
                    return response.json();
                }).then(json => {
                    console.log(json);
                    this.itemInCart = true;
                    // location.reload();
                })
            }
        }
    }
</script>