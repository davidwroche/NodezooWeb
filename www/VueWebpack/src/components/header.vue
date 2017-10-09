<template>
  <div id ="header">
    <button class="btn btn-info btn-lg search-corner" id="searchButton" v-on:click="searchLayout">
        <span class="glyphicon glyphicon-search search-menu spin-menu fa-5x"></span>
    </button>
    <button class="btn btn-info btn-lg info-corner" id="infoButton" v-on:click="infoLayout">
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
  </div>
</template>

<script>
    export default {

      methods:{
        infoLayout() {
          console.log('info')
          this.$router.push('/info')
        },
        searchLayout() {
          console.log('search')
          this.$router.push('/search')
        },
      }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
