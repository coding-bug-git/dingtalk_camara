<template>
  <div>
    <el-button @click="m1">ref click</el-button>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'Demo03',
  setup () {
    const ret = reactive({
      m1 () {
        console.log(111)
      }
    })
    return toRefs(ret)
  }
}
</script>W

<style scoped>

</style>
