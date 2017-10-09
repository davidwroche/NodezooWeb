<template>
    <div id="search">
            <button class="btn btn-info btn-lg search-corner" id="searchButton" v-on:click="searchLayout" @mouseover="fadeInfo" @mouseleave="unfadeInfo">
                <span class="glyphicon glyphicon-search search-menu spin-menu fa-5x"></span>
            </button>
            <button class="btn btn-info btn-lg info-corner" id="infoButton" v-on:click="infoLayout" @mouseover="fadeSearch" @mouseleave="unfadeSearch">
                <span class="glyphicon glyphicon-info-sign spin-menu fa-5x"></span>
            </button>

            <div class="container">
                <div class="row">
                    <div id="logo" class="text-center">
                        <a href="http://github.com/nodezoo/tao" class="logo"><img src=".././assets/images/nodezoo.png"></a>
                        <p v-if="layout1">Search for <a href="http://nodejs.org">Node.js</a> modules.</p>
                        <p v-else="layout1" v-cloak>Manually inject entries using the info service</p>
                    </div>
                </div>
            </div>
            <!-- <transition name="fade"> -->
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
        <footersection></footersection>
        </div>

</template>

<script>
    import Result from './result.vue';
    import Footer from './footer.vue';
    import Suggest from './suggest.vue'



    export default {
        components: {
            resultsection: Result,
            footersection: Footer,
            suggestsection: Suggest
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
            infoLayout() {
                this.layout1 = false;
                vm2.$data.layout2 = false;
                vm3.$data.layout3 = false;
                vm4.$data.layout4 = true;
                var info = document.getElementById('infoButton')
                var search = document.getElementById('searchButton')
                info.style.opacity = "1"
                info.style.borderWidth = "3px"
                info.style.borderColor = "#FFFF00 !important";
                search.style.opacity = "0.2"
                search.style.borderWidth = "2px"
                search.style.borderColor = "#268EC4";
            },
            searchLayout() {
                this.layout1 = true;
                vm2.$data.layout2 = true;
                vm3.$data.layout3 = true;
                vm4.$data.layout4 = false;
                var info = document.getElementById('infoButton')
                var search = document.getElementById('searchButton')
                search.style.opacity = "1"
                search.style.borderWidth = "3px"
                search.style.borderColor = "#FFFF00 !important";
                info.style.opacity = "0.2"
                info.style.borderWidth = "2px"
                info.style.borderColor = "#268EC4";
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
