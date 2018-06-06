<template>
    <div class="card-body">
        <div class="d-block text-center">
            <div class="d-block text-center">
                <h4> {{ location }} </h4>
                <h6> {{ datetime }} </h6>
                <h5> {{ description }} </h5>
            </div>
            <primary issue_id={{ issue_id }}></primary>
        </div>
    </div>
</template>

<script>
    import from './Card/Primary'
    export default {
        data() {
            return {
                done: false
            }
        },
        components: {
            'primary' : Primary
        },
        props: {
            issue_id: String,
            location: String,
            description: String,
            datetime: String,
            completed: String,
            next_id: String
        },
        computed: {

        }
    }
</script>

<style scoped>

</style>