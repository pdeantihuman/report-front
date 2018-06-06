<template>
    <b-btn
            class="mt-3"
            block 
            @click="submit()"
            :class="buttonClass"
            :disabled="isUploading">
        {{ btnMsg }}
    </b-btn>
</template>

<script>
    export default {
        props: {
            issue_id: String,
        },
        data() {
            return {
                isUploading: false,
                canUndo: false
            }
        },
        computed: {
            patchUrl() {
                return '/issues/' + this.issues_id;
            },
            undoUrl() {
                return '/issues/' + this.issues_id + '/undo';
            },
            disabled() {
                return this.isUploading || (!this.canUndo)
            },
            buttonClass() {
                return this.canUndo ? "outline-danger" : "outline-primary"
            },
            btnMsg() {
                return isUploading ? "请求上传中" : this.btnState
            },
            btnState() {
                return canUndo? "撤销":"已解决 #"+this.issue_id,
            }

        },
        methods: {
            submit() {
                this.isUploading = true
                this.canUndo? this.undo(): this.do()
            },
            undo() {
                axios.patch(this.undoUrl)
                        .then(response => {
                            this.isUploading = false
                            this.canUndo = false
                        })
            },
            do() {
                axios.patch(this.patchUrl)
                        .then(response => {
                            this.isUploading = false
                            this.canUndo = true
                        })
            }


        }
    }
</script>

<style scoped>

</style>