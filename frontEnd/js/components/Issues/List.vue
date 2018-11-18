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
                    @processing="clearReload"
                    @processed="setReload"
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
                increments: [],
                intervalId: -1
            }
        },
        mounted() {
            axios.get('/api/issues').then((response) => {
                this.list = response.data.data
                this.currentPage = response.data.current_page
                this.total = response.data.total
            })
            this.setReload()
            axios.get('/api/user')
                    .then((response) => {
                        this.user = response.data.data
                    })
        },
        methods: {
            load(event) {
                axios.get('/api/issues?page=' + event)
                    .then((response) => {
                        this.list = response.data.data
                    })
                this.clearReload()
                this.setReload()
            },
            setReload() {
                console.log(this.intervalId)
                if (this.intervalId != -1)
                    return;
                this.intervalId = setInterval(() => {
                    this.load(this.currentPage)
                }, 6000)
            },
            clearReload() {
                console.log(this.intervalId)
                if (this.intervalId == -1)
                    return;
                clearInterval(this.intervalId)
                this.intervalId = -1
            }
        },
        components: {
            'issue-item': issueItem
        }
    }
</script>

<style scoped>

</style>