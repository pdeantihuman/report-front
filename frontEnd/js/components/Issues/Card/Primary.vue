<template>
    <b-btn
            class="mt-3"
            block @click="submit()"
            v-bind:class="buttonClass"
            v-bind:disabled="isUploading">
        {{ btnMsg }}
    </b-btn>
</template>

<script>
    export default {
        props: {
            issues_id: String,
        },
        data() {
            return {
                isUploading: false,
                btnMsg: "已解决 #"+this.issues_id,
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
                return this.isUploading || (!( this.is_open == 1) && !this.canUndo)
            },
            buttonClass() {
                return this.canUndo ? "outline-danger" : "outline-primary"
            }
        },
        methods: {
            submit() {
                this.isUploading = true;
                this.btnMsg = "请求上传中……"
                if (this.canUndo) {
                    axios.patch(this.undoUrl)
                        .then(response => {
                            this.isUploading = false
                            this.canUndo = false
                        })
                } else {
                    axios.patch(this.patchUrl)
                        .then(response => {
                            this.isUploading = false
                            this.canUndo = true
                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>