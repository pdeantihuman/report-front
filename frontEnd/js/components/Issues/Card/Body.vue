<template>
    <div class="card-body">
        <div class="d-block text-center">
            <div class="d-block text-center">
                <h4> {{ location }} </h4>
                <h6> {{ datetime }} </h6>
                <h5> {{ description }} </h5>
            </div>
            <primary :issue_id="issue_id"></primary>
            <secondary :is_grey="completed == 1" :issue_id="next_id"></secondary>
        </div>
    </div>
</template>

<script>
    import from './Card/Primary'
    import from './Card/Secondary'
    export default {
        data() {
            return {
                done: false
            }
        },
        components: {
            'primary' : Primary,
            'secondary' : Secondary
        },
        props: {
            issue_id: String,
            location: String,
            description: String,
            datetime: String,
            completed: String, // 子组件
            next_id: String, // 子组件
            completed: String // 子组件
        },
        computed: {

        }
    }
</script>

<style scoped>

</style>