<template>
    <li class="list-group-item d-flex justify-content-between align-items-center">
        {{ location + ' 时间:' + datetime + ' 描述:' + abstract }}
        <b-modal ref="confirmModal" hide-footer title="请确认操作">
            <div class="d-block text-center">
                <h4> {{ location }} </h4>
                <h6> {{ datetime }} </h6>
                <h5> {{ description }} </h5>
            </div>
            <b-btn
                    class="mt-3"
                    variant="outline-primary"
                    block @click="hideModal()"
                    v-bind:class="[isUploading?dangerBtn:primaryBtn ]"
                    v-bind:disabled="isUploading">
                {{ btnMsg }}
            </b-btn>
        </b-modal>
        <button
                type="button"
                class="btn"
                v-bind:class="canUndo? 'btn-danger' : 'btn-primary'"
                v-bind:disabled="disabled"
                @click="showModal()"
        >
            {{ actionMsg }}
        </button>
    </li>
</template>

<script>
    import bModal from 'bootstrap-vue/es/components/modal/modal'
    import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
    export default {
        data() {
            return {
                isUploading: false,
                dangerBtn: "outline-danger",
                primaryBtn: "outline-primary",
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
            abstract(){
                let text = this.description.slice(0,25)
                if (this.description.length > 25){
                    text = text + '......'
                }
                return text
            },
            actionMsg(){
                return this.canUndo?"撤销":"解决"
            }
        },
        props: {
            issues_id: String,
            location: String,
            description: String,
            datetime:String,
            is_open: String,
        },
        components: {
            'b-modal' : bModal,
        },
        directives: {
            'b-modal' : bModalDirective
        },
        methods: {
            showModal() {
                if (this.canUndo){
                    axios.post(this.undoUrl)
                        .then(response => {
                            this.btnMsg = '撤销'
                            this.canUndo = false
                            this.btnMsg = "已解决 #"+this.issues_id
                        })
                } else {
                    this.$refs.confirmModal.show()
                }
            },
            hideModal() {
                axios.patch(this.patchUrl)
                    .then(response => {
                        this.isUploading = false
                        this.canUndo = true
                        this.$refs.confirmModal.hide()
                    });
                this.isUploading = true
                this.btnMsg = "请求上传中……"
            }
        }
    }
</script>

<style scoped>

</style>