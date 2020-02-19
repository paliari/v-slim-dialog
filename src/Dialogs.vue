<template lang="pug">
.v-dialogs
  v-dialog(:show='item.show' v-for='item in items', :item='item', @close='onClose', :key='item.key')
</template>

<script>
const key = () => `${Date.now()}-${Math.random()}`
import Prompt from './Prompt'
import VDialog from './Dialog'

export default {
  components: { VDialog },
  data() {
    return {
      items: []
    }
  },
  methods: {
    open( message, { title, cancelLabel, prompt, size, okLabel = 'OK' }) {
      if (!this.$parent) {
        this.$mount()
        document.body.appendChild(this.$el)
      }
      return new Promise(resolve => {
        const item = {
          key: key(),
          show: true,
          message,
          title,
          cancelLabel,
          okLabel,
          prompt,
          size,
          resolve
        }
        this.items.push(item)
      })
    },

    alert(message, options = {}) {
      const { title, okLabel = 'OK', size } = options
      return this.open( message, { title, okLabel, size })
    },

    confirm(message, options = {}) {
      const { title, cancelLabel = 'Cancel', okLabel = 'OK', size } = options
      return this.open( message, { title, cancelLabel, okLabel, size })
    },

    prompt(message, options = {}) {
      let { title, okLabel = 'OK', size, prompt, cancelLabel } = options
      prompt = Object.assign({ value: '', invalidMessage: 'invalid!', component: Prompt }, prompt)
      return this.open(message, { title, okLabel, prompt, size, cancelLabel })
    },

    remove(item) {
      let i = this.items.indexOf(item)
      if (i >= 0) {
        this.items.splice(i, 1)
      }
    },

    onClose(item, ok) {
      const response = {ok}
      if (item.prompt) response.value = item.prompt.value
      item.resolve(response)
      item.show = false
      this.remove(item)
    },

    keyUp(e) {
      if ('Escape' === e.key) {
        if (this.items.length > 0) {
          this.onClose(this.items[this.items.length - 1])
        }
      }
    }
  },

  created() {
    window.addEventListener('keyup', this.keyUp)
  }
}
</script>
