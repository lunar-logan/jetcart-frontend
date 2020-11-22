<template>
    <div class="notification has-text-left">
        <nav class="level">
            <div class="level-left">Total Cart Value</div>
            <div class="level-right">₹{{cartValue.total_value}}</div>
        </nav>
        <nav class="level">
            <div class="level-left">Total Sales Tax</div>
            <div class="level-right">₹{{cartValue.total_sales_tax}}</div>
        </nav>
        <nav class="level">
            <div class="level-left"><h2 class="subtitle"><strong>Total Amount</strong></h2></div>
            <div class="level-right"><h2 class="subtitle"><strong>₹{{cartValue.total_payable_amount}}</strong></h2></div>
        </nav>
    </div>
</template>
<script>
    export default {
        name: 'OrderSummary',
        props: ["cartValue"]
    }
</script>