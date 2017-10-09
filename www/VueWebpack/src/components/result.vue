<template>
    <div id="result" v-cloak v-show="layout2">
        <div class="container" style="margin-top: 2%;">
            <div id="resultssection">
                <div class="col-md-12">
                    <div class="col-md-8">
                        <div v-show="matches">
                            <div class="alert alert-danger">
                                No matches found for</strong> {{nomatch}}</strong>
                            </div>
                        </div>
                        <div v-for="item in results">
                            <div class="panel panel-info">
                                <div class="panel-heading">
                                    <div class="row">
                                        <div class="col-xs-6 text-left">
                                            <a :href="item.npmurl" class="logo"><img src="images/npm-small.png"></a>
                                            <a :href="item.giturl" class="logo"><img src="images/github-small.png"></a>
                                            <a :href="item.namelink"><h3 class="infoname">{{ item.name }}</h3></a>
                                        </div>
                                        <div class="col-xs-6 text-right">
                                            <a v-on:click="moduleInfo(item.name)" class="btn btn-sq-lg info-more">
                                                <i class="glyphicon glyphicon-info-sign"></i><br/>
                                                Check module<br>info here
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    {{ item.version }}
                                    <br> {{ item.desc }}
                                </div>
                            </div>
                        </div>
                    </div>
                   <sidesection></sidesection>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import Side from './side.vue';

    export default {
        components: {
            sidesection: Side,
        },

        data() {
            return {
                matches: false,
                nomatch: '',
                results: '',
                layout2: true
            }
        },
        methods: {
            moduleInfo(item) {
                var self = this;
                var seneca = this.$root.$options.seneca;

                seneca.act({
                    role: 'web',
                    cmd: 'info',
                    name: item
                }, function (err, mod) {
                    if (mod) {
                        seneca.act({
                            ian: 'get_info',
                            name: mod
                        });
                        seneca.act({
                            hugh: 'module_name',
                            name: item
                        })
                    }
                });
                vm1.layout1 = false;
                this.$data.layout2 = false;
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
        },
        beforeCreate: function () {
            var self = this
            var seneca = this.$root.$options.seneca;
            seneca.add('ann:results', function (msg, reply) {
                    self.results = msg.results
                    self.results.forEach(function (item) {
                        if (!item.hasOwnProperty(item.giturl)) {
                            item.npmurl = "http://npmjs.com/package/" + item.name.toString()
                            item.namelink = item.npmurl
                        }

                        if ('giturl' in item) {
                            if (item.giturl.startsWith('git://')) {
                                var x = item.giturl.replace('git://', 'http://')
                                item.giturl = x
                                item.namelink = item.giturl
                            }
                            if (item.giturl.startsWith('git+')) {
                                var y = item.giturl.replace('git+', '')
                                item.giturl = y
                                item.namelink = item.giturl
                            }
                        } else {
                            item.npmurl = "http://npmjs.com/package/" + item.name.toString()
                            item.namelink = item.npmurl
                        }
                    })
                    reply()
                })
                .add('claire:clear_results', function (msg, reply) {
                    self.results = msg.results
                    self.matches = false
                    reply()
                })
                .add('noel:no_matches_found', function (msg, reply) {
                    self.nomatch = msg.matches
                    self.matches = true
                    reply()
                })
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
