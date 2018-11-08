<template>

    <li class="list-group-item d-flex justify-content-between align-items-center">
        {{ itemKey  }}
        <button class="btn btn-success btn-sm" v-if="itemValue=='1' && !processing" @click="toggle">ON</button>
        <button class="btn btn-black btn-sm" v-if="itemValue=='0' && !processing" @click="toggle">OFF</button>
        <button class="btn-danger btn-sm" v-if="processing">Processing</button>
    </li>
</template>

<script>
    export default {
        name: "booleanItem",
        props: {
            itemKey: String,
            value: String,
        },
        data() {
            return {
                itemValue: this.value,
                processing: false,
            }
        },
        methods: {
            toggle() {
                this.processing = true
                let data = {
                    key: this.itemKey,
                    value: this.itemValue=="1"?'0':'1'
                }
                axios.patch('/api/environment', data).then((response) => {
                    this.itemValue = response.data.value
                    this.processing = false
                })
            }
        },
        computed: {
        }
    }
</script>

<style scoped>

</style>