import Vue from 'vue'
import hljs from 'highlight.js'

Vue.directive('highlight', el => {
  let blocks = el.querySelectorAll('pre code')
  Array.prototype.forEach.call(blocks, hljs.highlightBlock)
})
