<template>
    <div id="suggest">
      <datalist id="suggestlist"></datalist>
    </div>
</template>

<script>
    export default {

      data() {
        return {
          suggest: '',
          layout3: true
        }
      },
      beforeCreate: function () {
        var self = this;
        var seneca = this.$root.$options.seneca;
        seneca
          .add('omar:suggestions', function (msg, reply) {
            self.suggest = msg.suggestions
            var list = document.getElementById('suggestlist');
            document.getElementById('suggestlist').innerHTML = '';
            self.suggest.forEach(function (item) {
              var option = document.createElement('option');
              option.value = item;
              list.appendChild(option);
            });
            reply()
          })
      }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
