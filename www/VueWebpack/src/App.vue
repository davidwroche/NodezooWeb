<template>
    <div class="container overlord">
    <div class="row">
            <div class="header">
                <searchsection></searchsection>
            </div>
        </div>
    </div>
</template>

<script>
    import Search from './components/search.vue';

    export default {
        components: {
            searchsection: Search,
        }
    }

</script>

<style>

</style>