<template>
    <div class="container">
        <ul class="list-group">
            <issue-item
                    v-for="item in list"
                    :key="item.id.toString()"
                    :issues_id="item.id"
                    :location="item.alley + ' 教 ' + item.room + '教室'"
                    :description="item.description"
                    :is_open="item.is_open.toString()"
                    :datetime="item.created_at"
            >
            </issue-item>
            <li class="list-group-item" v-if="list.length != 0">
                <b-pagination size="md"
                              :total-rows="total"
                              v-model="currentPage"
                              :per-page="15"
                              @change="load"
                >
                </b-pagination>
            </li>
        </ul>
    </div>
</template>

<script>
    import issueItem from './Item'

    export default {
        name: "issueList",
        data() {
            return {
                list: [],
                currentPage: 1,
                total: 0,
                user: [],
                increments: []
            }
        },
        mounted() {
            axios.get('/api/issues').then((response) => {
                this.list = response.data.data
                this.currentPage = response.data.current_page
                this.total = response.data.total
            })
            setInterval(() => {
                location.reload()
            }, 60000)
            axios.get('/api/user')
                    .then((response) => {
                        this.user = response.data.data
                    })
        },
        methods: {
            load(event) {
                let data = {
                    page: this.currentPage
                }
                axios.get('/api/issues?page=' + event)
                    .then((response) => {
                        this.list = response.data.data
                    })

                clearInterval()
                setInterval(() => {
                    location.reload()
                }, 60000)
            }
        },
        components: {
            'issue-item': issueItem
        }
    }
</script>

<style scoped>

</style>