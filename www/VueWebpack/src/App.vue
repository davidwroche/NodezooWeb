<template>
    <div class="container overlord">
    <div class="row">
      <headersection></headersection>
            <div class="header">
                <router-view>
                </router-view>
            </div>
            <footersection></footersection>
        </div>
    </div>
</template>

<script>
    import Search from './components/search.vue';
    import Footer from './components/footer.vue';
    import Header from './components/header.vue';

    export default {
        components: {
            searchsection: Search,
            footersection: Footer,
            headersection: Header,
        },
        beforeCreate() {
          this.$router.push('/search')
        }
    }

</script>

<style>

</style>
