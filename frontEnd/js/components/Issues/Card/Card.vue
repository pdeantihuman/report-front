<template>
    <b-card header="处理报修"
          :header-text-variant="header_text"
          :header-bg-variant="header_bg"
          header-tag="header"
          :title="location">
    <p class="card-text">
        <div>
            <h6> {{ datetime }} </h6>
            <h5> {{ description }} </h5>
        </div>
        <primary :issue_id="issue_id"></primary>
        <secondary :is_grey="completed" :issue_id="next_id"></secondary>
    </p>
  </b-card>
</template>

<script>
    import Primary from './Primary'
    import Secondary from './Secondary'
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
        computed: {
            header_bg() {
                return this.done?"primary":"white"
            },
            header_text() {
                return this.done?"white":"black"
            }            
        }, 
        props: {
            issue_id: String,
            location: String,
            description: String,
            datetime: String,
            completed: String, // 子组件
            next_id: String, // 子组件 TODO: 可能需要根据情况隐藏 next_button
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>