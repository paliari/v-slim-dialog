import Dialogs from './Dialogs'

Dialogs.install = (Vue, options) => {
  Vue.prototype.$dialogs = new (Vue.extend(Dialogs))({ propsData: options })
  Vue.dialogs = Vue.prototype.$dialogs
}

export default Dialogs
