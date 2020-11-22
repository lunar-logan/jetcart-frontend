<template>
    <nav class="level has-background-light" style="padding: 8px;">
        <div class="level-left">
            <div class="level-item">
                <p class="subtitle is-5">
                    <a href="/">
                        <strong>Jetcart</strong>
                    </a>
                </p>
            </div>
        </div>

        <div class="level-item">
            <div class="field" style="width: 50vw;">
                <p class="control has-icons-left">
                    <input class="input" type="email" placeholder="Search for Products, Brands and more"
                           v-model="searchTitle" v-on:keydown="handleSearch">
                    <span class="icon is-small is-left">
                        <i class="fas fa-search"></i>
                    </span>
                </p>
            </div>
        </div>

        <div class="level-right">
            <p class="level-item">
                <a href="/cart" class="button is-light">
                    <span class="icon is-small">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    </span>
                    <span v-if="this.itemCountInCart > 0">Cart ({{itemCountInCart}})</span>
                    <span v-else>Cart</span>
                </a>
            </p>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "TopNavigationBar",
        mounted() {
            let cartId = localStorage.getItem('cartId');
            if (cartId !== null) {
                console.log("Cart ID: " + cartId);
                this.fetchCart(cartId);
            }
        },
        data() {
            return {
                apiBaseUrl: "http://localhost:5000/v1/cart/",
                itemCountInCart: 0,
                searchTitle: (this.$route.path === '/search' ? this.$route.query.title: null)
            }
        },
        methods: {
            fetchCart(cartId) {
                fetch(this.apiBaseUrl + cartId)
                    .then(response => response.json())
                    .then(cartData => {
                        if (cartData.state === 0) {
                            let val = 0;
                            cartData.items.forEach(it => {
                                val += it.quantity;
                            });
                            this.itemCountInCart = val;
                        } else {
                            localStorage.removeItem("cartId");
                        }
                    });
            },
            handleSearch(e) {
                if (e.key === 'Enter') {
                    if(this.$route.path === '/search') {
                        location.href='/search?title=' + this.searchTitle;
                    } else {
                        this.$router.push('/search?title=' + this.searchTitle);
                    }
                }
            }
        }
    }
</script>