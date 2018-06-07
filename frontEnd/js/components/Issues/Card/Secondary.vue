<template>
    <b-btn
            class="mt-3"
            block
            v-if="issue_id != 0"
            :variant="variant"
            :href="href"
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
            variant() {
                return this.is_grey?"outline-secondary":"outline-danger"
            },
            href() {
                return '/issues/' + this.issue_id
            }
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