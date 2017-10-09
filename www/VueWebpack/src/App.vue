<template>
    <div class="container overlord">
      <headersection></headersection>
       <router-view></router-view>
      <footersection></footersection>
    </div>
</template>

<script>
    import Footer from './components/footer.vue';
    import Header from './components/header.vue';

    export default {
        components: {
            footersection: Footer,
            headersection: Header,
        },
        beforeCreate() {
          this.$router.push('/')
        }
    }

</script>

<style>

</style>
