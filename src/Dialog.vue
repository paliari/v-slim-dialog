<template lang="pug">
  .v-dialog(:class='{active: show, [`v-dialog-${item.size}`]: item.size}')
    .v-dialog-overlay(@click='onClose')
    .v-dialog-container
      .v-dialog-header
        a.v-dialog-btn.v-dialog-btn-close(aria-label='Fechar' @click='onClose')
        .v-dialog-title(v-if='item.title') {{ item.title }}
      .v-dialog-body
        .content
          div {{ item.message }}
          form(v-if='item.prompt' @submit.prevent='onClose(true)')
            .v-dialog-input(:is='item.prompt.component' v-model='item.prompt.value')
      .v-dialog-footer
        a.v-dialog-btn.v-dialog-btn-danger(@click='onClose(false)' v-if='item.cancelLabel')
          | {{ item.cancelLabel }}
        a.btn.btn-link.success(@click='onClose(true)') {{ item.okLabel }}
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    },
  },

  methods: {
    onClose(response) {
      this.$emit('close', this.item, response)
    }
  }

}
</script>

<style lang="stylus">
.v-dialog
  font-weight 100
  align-items center
  bottom 0
  display none
  -ms-flex-align center
  -ms-flex-pack center
  justify-content center
  left 0
  opacity 0
  overflow hidden
  padding 8px
  position fixed
  right 0
  top 0
  &.v-dialog-sm
    .v-dialog-container
      max-width 320px
      padding 0 8px
  &.v-dialog-lg
    .v-dialog-overlay
      background #fff
    .v-dialog-container
      box-shadow none
      max-width 960px

.v-dialog:target,
.v-dialog.active
  display flex
  display -ms-flexbox
  opacity 1
  z-index 400

.v-dialog:target .v-dialog-overlay,
.v-dialog.active .v-dialog-overlay
  background rgba(248, 249, 250, 0.75)
  bottom 0
  cursor default
  display block
  left 0
  position absolute
  right 0
  top 0

.v-dialog:target .v-dialog-container,
.v-dialog.active .v-dialog-container
  animation slide-down 0.2s ease 1
  z-index 1

.v-dialog-container
  background #fff
  border-radius 2px
  box-shadow 0 4px 10px rgba(69, 77, 93, 0.3)
  display flex
  display -ms-flexbox
  -ms-flex-direction column
  flex-direction column
  max-height 75vh
  max-width 640px
  padding 0 16px
  width 100%
  color #50596c
  &.v-dialog-fullheight
    max-height 100vh
  .v-dialog-header
    color #454d5d
    padding 16px
    .v-dialog-title
      font-size 110%
      font-weight 400
  .v-dialog-body
    overflow-y auto
    padding 16px
    position relative
    .v-dialog-input
      display block
      width 100%
  .v-dialog-footer
    padding 16px
    text-align right
  .v-dialog-btn
    -webkit-appearance none
    -moz-appearance none
    appearance none
    background transparent
    border none
    color #5cb85c
    cursor pointer
    display inline-block
    font-size 16px
    height 36px
    line-height 20px
    outline none
    padding 7px 8px
    text-align center
    text-decoration none
    -webkit-user-select none
    -moz-user-select none
    -ms-user-select none
    user-select none
    vertical-align middle
    white-space nowrap
    &.v-dialog-btn-danger
      color #d9534f
    &.v-dialog-btn-close
      height 16px
      line-height 16px
      margin-left 8px
      margin-right -2px
      padding 0
      width 16px
      float right
      color #50596c
      &::before
        content "\2715"
</style>
