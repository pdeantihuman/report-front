<template>
    <div class="card">
        <h5 class="card-header" v-text="location" :class="[header_text, header_bg]">处理报修</h5>
        <div class="card-body">
            <div>
                <h6> {{ datetime }} </h6>
                <h5> {{ description }} </h5>
            </div>
            <button class="btn-outline-primary btn btn-block" v-if="!processing" :disabled="!is_open" @click="solve">已解决 #{{issue_id}}</button>
            <button class="btn btn-outline-danger btn-block" v-if="can_undo" @click="undo">撤销</button>
            <button class="btn-secondary btn btn-block" disabled v-if="processing">请求上传中</button>
            <button class="btn btn-outline-primary btn-block" @click="next">下一个</button>
        </div>
    </div>
</template>

<script>
    import Primary from './Primary'
    import Secondary from './Secondary'

    export default {
        data() {
            return {
                location: '',
                description: '',
                datetime: '',
                is_open: false,
                completed: true,
                next_id: -1,
                processing: false,
                can_undo: false
            }
        },
        components: {
            'primary': Primary,
            'secondary': Secondary
        },
        computed: {
            header_bg() {
                return this.done ? "bg-primary" : "bg-white"
            },
            header_text() {
                return this.done ? "text-white" : "text-black"
            },
            is_grey() {
                return this.completed == 1
            },
        },
        props: {
            issue_id: String,
        },
        mounted() {
            this.load(this.issue_id)
        },
        methods: {
            load(id) {
                axios.get('/api/issues/' + id).then((response) => {
                    this.done = false
                    this.location = response.data.issue.alley + '教学楼' + response.data.issue.room + '教室'
                    this.description = response.data.issue.description
                    this.datetime = response.data.issue.created_at
                    this.is_open = response.data.issue.is_open == '1'
                    this.next_id = response.data.next_id
                    this.completed = response.data.completed
                })
            },
            next() {
                this.issue_id = this.next_id
                this.can_undo = false
                this.load(this.next_id)
            },
            solve() {
                this.processing = true
                axios.patch('/issues/' + this.issue_id)
                    .then(response => {
                        this.processing = false
                        this.can_undo = true
                        this.load(this.issue_id)
                    })
            },
            undo() {
                axios.post('/issues/' + this.issue_id + '/undo')
                    .then(response => {
                        this.can_undo = false
                        this.load(this.issue_id)
                    })
            }
        }
    }
</script>

<style scoped>

</style>