<template>
    <div class="columns">
        <div class="column is-narrow">
            <div class="tile is-vertical">
                <div class="tile" v-for="image in images" v-bind:key="image" style="margin-bottom: 10px;">
                    <figure class="image is-64x64" @mouseover="handleHover(image)" style="cursor:pointer;">
                        <img v-bind:src="image" alt="">
                    </figure>
                </div>
            </div>
        </div>
        <div class="column">
            <figure class="is-4by3">
                <img v-bind:src="inFrame || defaultImage" alt="">
            </figure>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'PDPImageGallery',
        props: ["images", "defaultImage"],
        data() {
            return {
                inFrame: ''
            }
        },
        methods: {
            handleHover(url) {
                console.log(url);
                this.inFrame = url;
            }
        }
    }
</script>