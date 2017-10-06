var seneca = Seneca()
  .test('print')
  .client({
    type: 'browser',
    pin: 'role:web'
  })


// Start of Search Vue Instance
var vm1 = new Vue({
  el: '#search',
  data: {
    query: '',
    info: false,
    layout1: true
  },
  watch: {
    query() {

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
  }
})

// Start of Results Vue Instance
var vm2 = new Vue({
  el: '#results',
  data: {
    matches: false,
    nomatch: '',
    results: '',
    layout2: true
  },
  methods: {
    moduleInfo(item) {
      var self = this;
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

    seneca
      .add('ann:results', function (msg, reply) {
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
})



// Start of Suggest Vue Instance
var vm3 = new Vue({
  el: '#suggest',
  data: {
    suggest: '',
    layout3: true
  },
  beforeCreate: function () {
    var self = this;
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
})


// Start of Info Vue Instance
var vm4 = new Vue({
  el: '#info',
  data: {
    npm: '',
    github: '',
    name: '',
    information: '',
    layout4: false,
    error: false,
    nomatch: ''
  },
  methods: {
    getInfo() {
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
})
