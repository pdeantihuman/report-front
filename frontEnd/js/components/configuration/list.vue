<template>
    <ul class="list-group">
        <component :is="morphic(environment)" v-for="environment in environments" :key="environment.key" :item-key="environment.key" :value="environment.value"></component>
    </ul>
</template>

<script>
    import numberItem from './numberItem'
    import booleanItem from './booleanItem'
    export default {
        name: "list",
        data() {
            return {
                environments : []
            }
        },
        methods: {
            morphic(environment) {
                if (environment.type == "number")
                    return "number-item";
                if (environment.type == "boolean")
                    return "boolean-item"
            }
        },
        mounted() {
            axios.get('/api/environment').then((response) => {
                this.environments = response.data
            });
        },
        components: {
            'number-item': numberItem,
            'boolean-item' : booleanItem
        }
    }
</script>

<style scoped>

</style>