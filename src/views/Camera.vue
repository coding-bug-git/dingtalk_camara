<template>
  <div>
    camera
  </div>
  <div>
    {{areaId}}
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: 'Camera',
  setup () {
    const route = useRoute()
    const areaId = route.params.areaId
    return { areaId }
  }
}
</script>

<style scoped>

</style>
