<template>

    <li class="list-group-item d-flex justify-content-between align-items-center">
        {{ item_key  }}
        <button class="btn btn-success btn-sm" v-if="!is_disabled && !processing" @click="toggle">ON</button>
        <button class="btn btn-secondary btn-sm" v-if="is_disabled && !processing" @click="toggle" disabled>OFF</button>
        <button class="btn-danger btn-sm" v-if="processing">Processing</button>
    </li>
</template>

<script>
    export default {
        name: "userButtonItem",
        props: {
            item_key: String,
            is_disabled: Boolean,
            url: String,
        },
        data() {
            return {
                processing: false,
            }
        },
        methods: {
            toggle() {
                this.processing = true
                axios.get(this.url).then((response) => {
                    this.processing = false
                }).catch((error)=> {
                    this.processing = false
                    this.$emit('error', error.response.data.errMsg)
                })
            }
        },
        computed: {
        }
    }
</script>

<style scoped>

</style>