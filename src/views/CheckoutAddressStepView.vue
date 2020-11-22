<template>
    <div>
        <top-navigation-bar></top-navigation-bar>

        <section class="section">
            <div class="container has-text-left">
                <div class="columns" v-if="orderData.state === 0">
                    <div class="column">
                        <div class="notification is-warning is-light" style="border: solid 1px;">
                            Orders are delivered within 5-7 working days
                        </div>

                        <div class="notification is-danger is-light" style="border: solid 1px" v-if="errorMessage">{{errorMessage}}</div>

                        <h1 class="subtitle">
                            Personal Information
                        </h1>

                        <div class="field">
                            <label class="label">Full name</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="eg. John Doe" v-model="customerName">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control">
                                <input class="input" type="email" placeholder="eg. john@example.com" v-model="customerEmail">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Phone</label>
                            <div class="control">
                                <input class="input" type="tel" placeholder="eg. +91 0000000000" v-model="customerPhone">
                            </div>
                        </div>

                        <hr>
                        <h1 class="subtitle">
                            Delivery address
                        </h1>



                        <div class="field">
                            <label class="label">Line 1</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Address line 1" v-model="addressLin1">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Line 2</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Address line 2" v-model="addressLin2">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">State</label>
                            <div class="control">
                                <div class="select">
                                    <select v-on:change="stateSelected" v-model="state">
                                        <option>Select:</option>
                                        <option v-for="state in states" v-bind:key="state">{{state}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">City</label>
                            <div class="control">
                                <div class="select">
                                    <select v-model="city">
                                        <option>Select:</option>
                                        <option v-for="city in cities" v-bind:key="city">{{city}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div class="field">
                            <label class="label">Postal Code</label>
                            <div class="control">
                                <input class="input" type="number" placeholder="eg. 226003" v-model="postalCode">
                            </div>
                        </div>


                    </div>
                    <div class="column is-one-third">
                        <OrderSummary v-bind:cart-value="orderData.cart.value"></OrderSummary>
                        <button class="button is-large is-primary is-fullwidth" v-on:click="placeOrder">Place Order
                        </button>
                    </div>
                </div>

                <div v-if="orderData.state === 5">
                    <div class="notification is-success is-light" style="border: solid 1px hsl(141, 71%, 48%);">
                        Order received successfully. Expected delivery in 5-10 business days from the date of order.
                    </div>

                    <h2 class="subtitle">Order Summary</h2>
                    <table class="table is-fullwidth is-bordered">
                        <tr>
                            <td>Order ID</td>
                            <td>{{this.orderId}}</td>
                        </tr>

                        <tr>
                            <td>Status</td>
                            <td><strong class="has-text-success">RECEIVED</strong></td>
                        </tr>

                        <tr>
                            <td>Delivery Address</td>
                            <td v-html="formatDeliveryAddress()"></td>
                        </tr>

                        <tr>
                            <td>Customer Email</td>
                            <td>{{this.orderData.customer.email}}</td>
                        </tr>

                        <tr>
                            <td>Customer Phone</td>
                            <td>{{this.orderData.customer.phone}}</td>
                        </tr>

                        <tr>
                            <td>Order Date</td>
                            <td>{{this.orderData.order_date}}</td>
                        </tr>

                        <tr>
                            <td>Order Value</td>
                            <td>{{this.orderData.payment.amount}}</td>
                        </tr>

                        <tr>
                            <td>Payment Type</td>
                            <td>{{this.orderData.payment.payment_type}}</td>
                        </tr>
                    </table>

                    <h2 class="subtitle">Cart Summary</h2>
                    <table class="table is-fullwidth is-bordered">
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                            <th>Unit Sales Tax</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in orderData.cart.items" v-bind:key="item.id">
                            <td><a v-bind:href="'/product/' + item.sku" class="has-text-dark">{{item.title}}</a></td>
                            <td>{{item.quantity}}</td>
                            <td>{{item.unit_price}}</td>
                            <td>{{item.unit_sales_tax}}</td>
                            <td>{{(item.unit_sales_tax + item.unit_price) * item.quantity}}</td>
                        </tr>
                        </tbody>
                    </table>

                    <table class="table is-fullwidth is-bordered">
                        <tr>
                            <td><strong>Grand Total</strong></td>
                            <td class="has-text-right"><strong>{{orderData.cart.value.total_payable_amount}}</strong>
                            </td>
                        </tr>
                    </table>

                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import TopNavigationBar from "../components/TopNavigationBar";
    import OrderSummary from "../components/OrderSummary";

    export default {
        name: 'CheckoutAddressStepView',
        components: {OrderSummary, TopNavigationBar},
        data() {
            return {
                orderId: null,
                orderData: {},
                states: ['Delhi', 'Haryana', 'Uttar Pradesh', 'West Bengal', 'Maharastra'],
                cities: [],
                stateCityMap: {
                    'Delhi': ['New Delhi', 'NCT'],
                    'Haryana': ['Gurugram'],
                    'Uttar Pradesh': ['Noida', 'Lucknow', 'Kanpur'],
                    'West Bengal': ['Kolkata'],
                    'Maharashtra': ['Mumbai']
                },

                customerName: null,
                customerEmail: null,
                customerPhone: null,
                addressLin1: null,
                addressLin2: null,
                city: null,
                state: null,
                postalCode: null,
                errorMessage: ''
            }
        },
        methods: {
            stateSelected(e) {
                if (e.target.value !== 'Select:') {
                    this.cities = this.stateCityMap[e.target.value];
                }
            },
            placeOrder() {
                console.log('Place order command');
                if (this.validate()) {
                    console.log("Lets roll");
                    fetch('http://localhost:5000/v1/order/' + this.orderId + '/place', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            delivery_address: {
                                line1: this.addressLin1,
                                line2: this.addressLin2,
                                city: this.city,
                                state: this.state,
                                postal_code: this.postalCode
                            },
                            payment_details: {
                                amount: this.orderData.cart.value.total_payable_amount
                            },
                            customer: {
                                name: this.customerName,
                                email: this.customerEmail,
                                phone: this.customerPhone
                            }
                        })
                    }).then(response => {
                        if (response.status === 200) {
                            return response.json();
                        }
                    })
                        .then(json => {
                            console.log(json);
                            localStorage.removeItem("cartId");
                            location.reload();
                        })
                }
            },
            validate() {
                if (!this.addressLin1 || this.city === 'Select:' || this.state === 'Select:' || !this.postalCode || !this.customerName || !this.customerEmail || !this.customerPhone) {
                    this.errorMessage = "Some fields are not specified";
                    return false;
                }
                this.errorMessage = '';
                return true;
            },
            formatDeliveryAddress() {
                return this.orderData.customer.name + '<br>' +
                    this.orderData.delivery_address.line1 + '<br/>' +
                    this.orderData.delivery_address.line2 + '<br/>' +
                    this.orderData.delivery_address.city + '<br/>' +
                    this.orderData.delivery_address.state + '<br/>' +
                    this.orderData.delivery_address.postal_code;
            }
        },
        mounted() {
            this.orderId = this.$route.params.id;
            let self = this;
            fetch('http://localhost:5000/v1/order/' + this.orderId)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                })
                .then(data => {
                    console.log(data);
                    self.orderData = data;
                });
        }
    }
</script>