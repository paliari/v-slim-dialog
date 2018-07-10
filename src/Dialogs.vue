<template lang="pug">
div
  .v-dialog(:class='{active: t.show}' v-for='t in items', :key='t.key')
    .v-dialog-overlay(@click='close(t)')
    .v-dialog-container
      .v-dialog-header
        a.btn.btn-clear.float-right(aria-label='Fechar' @click='close(t)')
        .v-dialog-title.h5(v-if='t.title') {{ t.title }}
      .v-dialog-body
        .content
          div {{ t.message }}
          div(v-if='t.prompt')
            div.v-dialog-input(:is='t.prompt.component' v-model='t.prompt.value')
      .v-dialog-footer
        a.v-dialog-btn.v-dialog-btn-danger(@click='close(t, false)' v-if='t.cancelLabel')
          | {{ t.cancelLabel }}
        a.btn.btn-link.success(@click='close(t, true)') {{ t.okLabel }}
</template>

<script>
const key = () => `${Date.now()}-${Math.random()}`
import Prompt from './Prompt'

export default {
  components: { Prompt },
  data() {
    return {
      items: []
    }
  },
  methods: {
    open({ message, title, cancelLabel, prompt, okLabel = 'OK' }) {
      console.log('prompt', prompt)
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
          resolve
        }
        this.items.push(item)
      })
    },

    alert(message, title, okLabel = 'OK') {
      return this.open({ message, title, okLabel })
    },

    confirm(message, title, cancelLabel = 'Cancelar', okLabel = 'OK') {
      return this.open({ message, title, cancelLabel, okLabel })
    },

    prompt(message, title, { okLabel = 'OK', prompt }) {
      prompt = Object.assign({ value: '', component: Prompt }, prompt)
      return this.open({ message, title, okLabel, prompt })
    },

    remove(item) {
      let i = this.items.indexOf(item)
      if (i >= 0) {
        this.items.splice(i, 1)
      }
    },

    close(item, response) {
      item.resolve(item.prompt ? item.prompt.value : response)
      item.show = false
      setTimeout(() => {
        this.remove(item)
      }, 500)
    }
  }
}
</script>

<style>
.v-dialog {
  align-items: center;
  bottom: 0;
  display: none;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  justify-content: center;
  left: 0;
  opacity: 0;
  overflow: hidden;
  padding: 0.4rem;
  position: fixed;
  right: 0;
  top: 0;
}

.v-dialog:target,
.v-dialog.active {
  display: flex;
  display: -ms-flexbox;
  opacity: 1;
  z-index: 400;
}

.v-dialog:target .v-dialog-overlay,
.v-dialog.active .v-dialog-overlay {
  background: rgba(248, 249, 250, 0.75);
  bottom: 0;
  cursor: default;
  display: block;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.v-dialog:target .v-dialog-container,
.v-dialog.active .v-dialog-container {
  animation: slide-down 0.2s ease 1;
  z-index: 1;
}

.v-dialog.v-dialog-sm .v-dialog-container {
  max-width: 320px;
  padding: 0 0.4rem;
}

.v-dialog.v-dialog-lg .v-dialog-overlay {
  background: #fff;
}

.v-dialog.v-dialog-lg .v-dialog-container {
  box-shadow: none;
  max-width: 960px;
}

.v-dialog-container {
  background: #fff;
  border-radius: 0.1rem;
  box-shadow: 0 0.2rem 0.5rem rgba(69, 77, 93, 0.3);
  display: flex;
  display: -ms-flexbox;
  -ms-flex-direction: column;
  flex-direction: column;
  max-height: 75vh;
  max-width: 640px;
  padding: 0 0.8rem;
  width: 100%;
}

.v-dialog-container.v-dialog-fullheight {
  max-height: 100vh;
}

.v-dialog-container .v-dialog-header {
  color: #454d5d;
  padding: 0.8rem;
}

.v-dialog-container .v-dialog-body {
  overflow-y: auto;
  padding: 0.8rem;
  position: relative;
}

.v-dialog-container .v-dialog-footer {
  padding: 0.8rem;
  text-align: right;
}
.v-dialog-container .v-dialog-footer .v-dialog-btn {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  border: none;
  color: #5cb85c;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  height: 36px;
  line-height: 20px;
  outline: none;
  padding: 7px 8px;
  text-align: center;
  text-decoration: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}
.v-dialog-container .v-dialog-footer .v-dialog-btn.v-dialog-btn-danger {
  color: #d9534f;
}
.v-dialog-container .v-dialog-body .v-dialog-input {
  display: block;
  width: 100%;
}
</style>
