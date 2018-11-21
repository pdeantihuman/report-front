<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between"><span>报修处理中心</span><span>过滤 <button
                class="btn btn-primary btn-sm" disabled>ON</button></span></div>
        <issues-list></issues-list>
    </div>
</template>

<script>
    import list from './List'

    export default {
        name: "IssuesCard",
        components: {
            'issues-list': list
        }
    }
</script>

<style scoped>

</style>