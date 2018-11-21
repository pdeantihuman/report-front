<template>
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span v-if="!editing">
            {{ itemKey + ' : ' + itemValue }}
        </span>
        <div class="col-4 px-0" v-else><input type="text" class="form-control" :placeholder="itemValue" v-model="input"></div>
        <button class="btn btn-warning btn-sm" @click="edit" v-if="!editing && !processing">编辑</button>
        <button class="btn btn-warning btn-sm" @click="update" v-if="editing && !processing">更新</button>
        <button class="btn btn-danger btn-sm" v-if="processing">Processing</button>
    </li>
</template>

<script>
    export default {
        name: "userNumberItem",
        data() {
            return {
                editing: false,
                processing: false,
                itemValue: this.value,
                input: '',
            }
        },
        props: {
            itemKey: String,
            value: String,
            url: String,
            data_key: String
        },
        computed: {

        },
        methods: {
            edit() {
                this.editing = true
            },
            update() {
                this.processing=true
                if (this.input == "") {
                    this.processing = false
                    this.editing = false
                    return;
                }
                let data = {}
                data[this.data_key] = this.input
                axios.patch(this.url, data).then((response) => {
                    this.editing = false
                    this.processing = false
                    this.itemValue = response.data[this.data_key]
                })

            },
            // translate(key){
            //     map = {
            //         minimum_alley: '最小的教学楼号',
            //         maximum_alley: '最大的教学楼号'
            //     }
            // }
        }
    }
</script>

<style scoped>

</style>