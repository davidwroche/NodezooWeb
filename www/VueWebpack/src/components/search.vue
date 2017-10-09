<template>
    <div id="search">
            <div id="form-buscar">
                <div class="container">
                    <div class="form-group">
                        <div class="input-group">
                            <input id="1" class="form-control input-lg" type="text" name="search" list="suggestlist" v-on:keyup.13="search" v-model="query" v-on:click="clear" placeholder="module name" autocomplete="off" autofocus required/>
                            <suggestsection></suggestsection>
                            <span class="input-group-btn">
    <button type="submit" class="btn btn-success btn-lg" v-on:click="search">
    <i class="glyphicon glyphicon-search" aria-hidden="true"></i> Search
    </button>
    </span>
                        </div>
                    </div>
                </div>
            </div>
        <resultsection></resultsection>
        </div>

</template>

<script>
    import Result from './result.vue';
    import Suggest from './suggest.vue';



    export default {
        components: {
            resultsection: Result,
            suggestsection: Suggest,
        },
        data(){
                return {
                    query: '',
                    info: false,
                    layout1: true
                }
            },
        watch: {
            query(){
              var seneca = this.$root.$options.seneca;

                seneca.act({
                    role: 'web',
                    cmd: 'sug',
                    query: this.$data.query
                }, function (err, result) {
                    if (result) {
                        seneca.act({
                            omar: 'suggestions',
                            suggestions: result.sug
                        })
                    }
                })
            }
        },

        methods: {
            search() {
                var self = this;
                var seneca = this.$root.$options.seneca;

                seneca.act({
                    claire: 'clear_results',
                    results: ''
                })
                seneca.act({
                    role: 'web',
                    cmd: 'query',
                    query: this.$data.query
                }, function (err, out) {
                    console.log(out)
                    if (out.items.length != 0) {
                        seneca.act({
                            ann: 'results',
                            results: out.items
                        });
                    } else {
                        seneca.act({
                            noel: 'no_matches_found',
                            matches: self.query
                        })
                    }
                })
            },
            clear() {
              var seneca = this.$root.$options.seneca;

                seneca.act({
                    claire: 'clear_results',
                    results: ''
                })
            },
            fadeSearch() {
                var element = document.getElementById('resultssection')
                element.style.transition = "opacity 1s";
                element.style.opacity = "0.5"

            },
            unfadeSearch() {
                var element = document.getElementById('resultssection')
                element.style.transition = "opacity 1s";
                element.style.opacity = "1"
            },
            fadeInfo() {
                var element = document.getElementById('inforesults')
                element.style.transition = "opacity 1s";
                element.style.opacity = "0.5"
            },
            unfadeInfo() {
                var element = document.getElementById('inforesults')
                element.style.transition = "opacity 1s";
                element.style.opacity = "1"
            }
        },

        mounted(){
          var seneca = this.$root.$options.seneca;
          seneca
            .test('print')
            .client({
              type: 'browser',
              pin: 'role:web'
            })
        }


    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
