<template>
  <div id="info">
    <div id="form-buscar">
      <div class="container">
        <div class="form-group">
          <div class="input-group">
            <input id="1" class="form-control input-lg" type="text" v-model="name" v-on:keyup.13="getInfo" placeholder="module name" autocomplete="off" autofocus required/>
            <span class="input-group-btn">
<button type="submit" class="btn btn-success btn-lg" v-on:click="getInfo">
<i class="glyphicon glyphicon-info-sign smaller" aria-hidden="true"></i> Get Info!
</button>
</span>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="margin-top: 2%;">
      <div id="inforesults">
      <div class="col-md-12">
        <div class="col-md-8">
          <div v-show="error">
            <div class="alert alert-danger">
              Collecting info for </strong> {{nomatch}}</strong>
              </div>
          </div>
            <div class="panel panel-info" v-if="github">
              <div class="panel-heading">
                <div class="row">
                  <div class="col-xs-6 text-left">
                    <img src="/src/assets/images/github-small.png">
                    <h3 class="infoname">{{ github.owner }}</h3>
                  </div>
                  <div class="col-xs-6 text-right">
                    <div class="col-xs-4 text-left">
                      <span class="infotext"><img src="/src/assets/images/star.png">{{github.stars}}</span>
                    </div>
                    <div class="col-xs-4 text-center">
                      <span class="infotext"><img src="/src/assets/images/watch.png">{{github.watches}}</span>
                    </div>
                    <div class="col-xs-4 text-right">
                      <span class="infotext"><img src="/src/assets/images/fork.png">{{github.forks}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel-body">
                <h5>Last Updated: {{ github.last }} </h5>
              </div>
            </div>
            <div class="panel panel-info" v-if="npm">
              <div class="panel-heading">
                <div class="row">
                  <div class="col-xs-6 text-left">
                    <img src="/src/assets/images/npm-small.png">
                    <h3 class="infoname">{{ npm.name }}</h3>
                  </div>
                  <div class="col-xs-6 text-center">
                    <span class="infoversion">Version: {{npm.version}}</span>
                  </div>
                </div>
              </div>
              <div class="panel-body">
                <h5>{{ npm.desc }} </h5>
              </div>
            </div>
        </div>
        <div class="col-md-4 stick">
          <div class="col-xs-6 text-center">
            <p class="point">Resources</p>
            <p class="subpoint">The code for this engine, including the ranking algorithm, is all on the
              <a href="https://github.com/nodezoo/tao" class="gold">nodezoo github repository</a>.
            </p>
          </div>
          <div class="col-xs-6 text-center">
            <p class="point">
              Questions?</p>
            <p class="subpoint"> Tweet me <a href="https://twitter.com/rjrodger" class="gold">@rjrodger</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>

  </div>

</template>

<script>
import Header from './header.vue';

    export default {
      components: {
          headersection: Header,
        },

      data(){
      return {
          npm: '',
          github: '',
          name: '',
          information: '',
          error: false,
          nomatch: ''
        }
      } ,
      methods: {
        getInfo() {
          var seneca = this.$root.$options.seneca;
          seneca.act({
            role: 'web',
            cmd: 'info',
            name: this.$data.name
          }, function (err, mod) {
            if (mod) {
              seneca.act({
                ian: 'get_info',
                name: mod
              });
            }
          });
        },
      },
      beforeCreate: function () {
        var self = this;
        var seneca = this.$root.$options.seneca;
        seneca
          .add('ian:get_info', function (msg, reply) {
            if (msg.name.no_github == true && msg.name.no_npm == false) {
              if (Object.keys(msg.name.npm).length == 3) {
                console.log(msg)
                self.npm = ''
                self.github = ''
                self.error = true
                self.nomatch = msg.name.npm.id
              } else {
                console.log(msg)
                self.error = false
                self.github = msg.name.github
                self.npm = msg.name.npm
              }
            } else if (msg.name.no_github == true && msg.name.no_npm == true) {
              console.log(msg)
              self.npm = ''
              self.nomatch = self.name
              self.error = true
              self.github = ''
            } else {
              console.log(msg)
              self.error = false
              self.github = msg.name.github
              self.npm = msg.name.npm
            }
            reply()
          })
          .add('hugh:module_name', function (msg, reply) {
            self.nomatch = msg.name
            self.name = msg.name
            reply()
          })
      }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
