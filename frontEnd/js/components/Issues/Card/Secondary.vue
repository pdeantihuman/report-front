<template>
    <b-btn
            class="mt-3"
            v-bind:class="buttonClass"
            >
        下一个
    </b-btn>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        computed: {
            buttonClass() {
                return this.is_grey?"outline-secondary":"outline-danger"
            },
        },
        props: {
            is_grey: Boolean,
            issue_id: String,
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>