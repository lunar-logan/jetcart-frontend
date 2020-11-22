<template>
    <div>
        <TopNavigationBar></TopNavigationBar>
        <section class="section">
            <div class="container">
                <div class="notification is-light" v-if="cartId === null">
                    <div class="block">
                        <span class="icon is-large" style="font-size: 32px;">
                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div class="block">
                        <h1 class="title">Your cart is empty</h1>
                    </div>

                </div>
                <div class="columns" v-if="cartId !== null">
                    <div class="column">
                        <table class="table is-fullwidth has-text-left is-bordered">
                            <thead>
                            <tr>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Unit Price</th>
                                <th>Sales Tax</th>
                                <th>Tax Type</th>
                                <th>Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in cartData.items" v-bind:key="item.sku">
                                <td style="overflow: auto">
                                    <b>{{item.title}}</b>
                                    <br>
                                    <b>SKU:</b> {{item.sku}}
                                    <br>
                                    <figure class="image is-128x128">
                                        <img v-bind:src="item.image" alt="">
                                    </figure>
                                </td>
                                <td>{{item.quantity}}</td>
                                <td>{{item.unit_price}}</td>
                                <td>{{item.unit_sales_tax}}</td>
                                <td>{{item.sales_tax_type}}</td>
                                <td>{{(item.unit_price + item.unit_sales_tax) * item.quantity}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <nav class="level has-background-info-light" style="padding: 18px;">
                            <!-- Left side -->
                            <div class="level-left">
                                <h1 class="title">Grand Total</h1>
                            </div>

                            <div class="level-right">
                                <h1 class="title">₹{{cartData.value.total_payable_amount}}</h1>
                            </div>
                        </nav>
                    </div>
                    <div class="column is-one-third">
                        <order-summary v-bind:cart-value="cartData.value"></order-summary>
                        <a href="#" v-on:click="checkoutCart" class="button is-large is-primary is-fullwidth">Checkout
                            Cart</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import TopNavigationBar from "../components/TopNavigationBar";
    import OrderSummary from "../components/OrderSummary";

    export default {
        name: 'CheckoutView',
        components: {OrderSummary, TopNavigationBar},
        data() {
            return {
                cartId: null,
                cartData: null,
                productData: {},
                checkoutFailed: false,
            }
        },
        mounted() {
            this.cartId = localStorage.getItem("cartId");
            console.log(this.cartId);
            if (this.cartId !== "undefined" && this.cartId !== null) {
                this.loadCartData();
            }
        },
        methods: {
            loadCartData() {
                fetch('http://localhost:5000/v1/cart/' + this.cartId)
                    .then(response => {
                        console.log(response);
                        return response.json();
                    })
                    .then(json => this.cartData = json);
            },
            checkoutCart() {
                fetch('http://localhost:5000/v1/cart/' + this.cartId + '/checkout', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({})
                })
                    .then(response => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            this.checkoutFailed = true;
                            return Promise.reject();
                        }
                    })
                    .then(json => {
                        this.$router.push('/checkout/' + json.id);
                    })
            }

        }
    }
</script>