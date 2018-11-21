<template>
    <div>
        <b-alert :key="Math.floor(Math.random()*1000)" v-for="error in errors" show>{{ error }}</b-alert>
        <ul class="list-group p-2">
            <component
                    :is="morphic(environment)"
                    v-for="environment in environments"
                    :key="environment.key"
                    :item-key="environment.key"
                    :value="environment.value"
                    @patch_error="handle_error"
                    @success="handle_success"
            ></component>
        </ul>
        <ul class="list-group p-2" v-if="user != null">
            <component
                    is="user-number-item"
                    item-key="负责的教学楼"
                    :value="user.alleys.toString()"
                    :url="'/api/user/configuration/alley'"
                    :data_key="'alleys'"
            >
            </component>
            <component
                    is="user-number-item"
                    item-key="微信 open id"
                    :value="user.openid+''"
                    :url="'/api/user/configuration/openid'"
                    :data_key="'openid'"
            >
            </component>
            <component
                    is="user-button-item"
                    item_key="发送微信测试推送"
                    :is_disabled="false"
                    url="/api/user/configuration/message"
                    @error="handle_error"
            >

            </component>
        </ul>
    </div>

</template>

<script>
    import numberItem from './numberItem'
    import booleanItem from './booleanItem'
    import userNumberItem from './userNumberItem'
    import userButtonItem from './userButtonItem'

    export default {
        name: "list",
        data() {
            return {
                environments: [],
                user: null,
                errors: [],
            }
        },
        methods: {
            morphic(environment) {
                if (environment.type == "number")
                    return "number-item";
                if (environment.type == "boolean")
                    return "boolean-item"
            },
            handle_error(event) {
                this.errors = []
                this.errors.push(event)

            },
            handle_success($event) {
                this.errors = []
            }
        },
        mounted() {
            axios.get('/api/environment').then((response) => {
                this.environments = response.data
            });
            axios.get('/api/user/configuration/user').then(response => {
                this.user = response.data
            })
        },
        components: {
            'number-item': numberItem,
            'boolean-item': booleanItem,
            'user-number-item': userNumberItem,
            'user-button-item': userButtonItem
        }
    }
</script>

<style scoped>

</style>