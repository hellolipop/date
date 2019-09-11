<template>
  <div id="app">
    <!-- :value="now" @input="val=>value = val" -->
    <DatePicker v-model="now"></DatePicker>
  </div>
</template>

<script>
import DatePicker from './date-picker'
export default {
  name: 'app',
  components: {
    DatePicker
  },
  created () {
    console.log(this.now)
  },
  data () {
    return {
      now: new Date()
    }
  }
}
</script>

<style lang="scss">

</style>
