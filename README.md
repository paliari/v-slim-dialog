# v-slim-dialog

## Slim Dialog for Vuejs

## Installation

```bash
yarn add v-slim-dialog
```

## Development

```bash
# install dependencies
yarn install

# build with minification
yarn release

# publish
bin/publish
```

# Usage

```js
import Vue from 'vue'

import 'v-slim-dialog/dist/v-slim-dialog.css'
import SlimDialog from 'v-slim-dialog'

Vue.use(SlimDialog)
```

## In your component

```js
//...
methods: {
  /**
   * @param String message
   * @param Object options default { title, okLabel = 'OK', size }
   */
  showAlert() {
    const options = {title: 'Info', size: 'sm'}
    this.$dialogs.alert('Your message', options)
    .then(res => {
      console.log(res) // {ok: true|false|undefined}
    })
  },

  /**
   * @param String message
   * @param Object options default { title, cancelLabel = 'Cancel', okLabel = 'OK', size }
   */
  showConfirm() {
    const options = {title: 'Confirm?', cancelLabel: 'No'}
    this.$dialogs.confirm('Your message!', options)
    .then(res => {
      console.log(res) // {ok: true|false|undefined}
    })
  },

  /**
   * @param String message
   * @param Object options default { title, okLabel = 'OK', size, prompt }
   */
  showPrompt() {
    const options = {title: 'Continue?', okLabel: 'Continue'}
    this.$dialogs.prompt('Your message!', options)
    .then(res => {
      console.log(res) // {value: 'user input', ok: true|false|undefined}
    })

    // with custom input prompt
    const options = {title: 'Continue?', prompt: {component: 'cpf-cnpj'}}
    this.$dialogs.prompt('Your message!', options)
    .then(res => {
      console.log(res) // {value: 'user input', ok: true|false|undefined}
    })

    // or
    import YourComponent from './YourComponent'
    const options = {title: 'Continue?', prompt: {component: YourComponent}}
    this.$dialogs.prompt('Your message!', options)
    .then(res => {
      console.log(res) // {value: 'user input', ok: true|false|undefined}
    })

  }

}
//...
```
