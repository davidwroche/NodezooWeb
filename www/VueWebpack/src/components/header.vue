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
                <p v-if="search">Search for <a href="http://nodejs.org">Node.js</a> modules.</p>
                <p v-else="search" v-cloak>Manually inject entries using the info service</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    export default {

      data(){
        return{
          search:true
        }
      },

      methods:{
        infoLayout() {
          var info = document.getElementById('infoButton')
          var search = document.getElementById('searchButton')
          info.style.opacity = "1"
          info.style.borderWidth = "3px"
          info.style.borderColor = "#FFFF00 !important";
          search.style.opacity = "0.2"
          search.style.borderWidth = "2px"
          search.style.borderColor = "#268EC4";
          this.search = false
          this.$router.push('/info')
        },
        searchLayout() {
          var info = document.getElementById('infoButton')
          var search = document.getElementById('searchButton')
          search.style.opacity = "1"
          search.style.borderWidth = "3px"
          search.style.borderColor = "#FFFF00 !important";
          info.style.opacity = "0.2"
          info.style.borderWidth = "2px"
          info.style.borderColor = "#268EC4";
          this.search = true;
          this.$router.push('/')
        },
      }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
