<template>
    <b-btn
            class="mt-3"
            block 
            :variant="variant"
            @click="submit()"
            :disabled="isUploading || disabled">
        {{ btnMsg }}
    </b-btn>
</template>

<script>
    export default {
        props: {
            issue_id: String,
            disabled: Boolean,
        },
        data() {
            return {
                isUploading: false,
                canUndo: false
            }
        },
        computed: {
            patchUrl() {
                return '/issues/' + this.issue_id;
            },
            undoUrl() {
                return '/issues/' + this.issue_id + '/undo';
            },
            variant() {
                return this.canUndo ? "outline-danger" : "outline-primary"
            },
            btnMsg() {
                return this.isUploading ? "请求上传中" : this.btnState
            },
            btnState() {
                return this.canUndo? "撤销":"已解决 #"+this.issue_id
            },

        },
        methods: {
            submit() {
                this.isUploading = true
                this.canUndo? this.undo(): this.do()
            },
            undo() {
                axios.post(this.undoUrl)
                        .then(response => {
                            this.isUploading = false
                            this.canUndo = false
                            this.$emit('undo');
                        })
            },
            do() {
                axios.patch(this.patchUrl)
                        .then(response => {
                            this.isUploading = false
                            this.canUndo = true
                            this.$emit('do')
                        })
            }


        }
    }
</script>

<style scoped>

</style>