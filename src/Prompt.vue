<template lang="pug">
  input(v-model='model')
</template>

<script>
export default {
  props: {
    value: [Number, String]
  },

  computed: {
    model: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },

  methods: {
    isValid() {
      return Boolean(String(this.model).trim())
    }
  },

  mounted() {
    this.$el.focus()
  }
}
</script>
