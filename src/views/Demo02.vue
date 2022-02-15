<template>

  <h1>demo02</h1>
  <el-button @click="show">show dialog</el-button>
  <devicePlayer ref="devicePlayer"></devicePlayer>
</template>

<script>

import Demo03 from '@/views/Demo03'
import player from '@/components/jessibuca.vue'
import devicePlayer from '@/components/devicePlayer'

import { reactive, ref, toRefs } from 'vue'

export default {
  name: 'Demo02',
  // eslint-disable-next-line vue/no-unused-components
  components: { Demo03, player, devicePlayer },
  setup () {
    const ret = reactive({
      video: 'http://lndxyj.iqilu.com/public/upload/2019/10/14/8c001ea0c09cdc59a57829dabc8010fa.mp4',
      videoUrl: '',
      videoHistory: {
        date: '',
        searchHistoryResult: [] // 媒体流历史记录搜索结果
      },
      showVideoDialog: false,
      streamId: '',
      app: '',
      mediaServerId: '',
      convertKey: '',
      deviceId: '',
      channelId: '',
      tabActiveName: 'media',
      hasAudio: false,
      loadingRecords: false,
      recordsLoading: false,
      isLoging: false,
      controSpeed: 30,
      timeVal: 0,
      timeMin: 0,
      timeMax: 1440,
      presetPos: 1,
      cruisingSpeed: 100,
      cruisingTime: 5,
      cruisingGroup: 0,
      scanSpeed: 100,
      scanGroup: 0,
      tracks: [],
      coverPlaying: false,
      tracksLoading: false,
      recordPlay: '',
      showPtz: true,
      showRrecord: true,
      tracksNotLoaded: false,
      sliderTime: 0,
      seekTime: 0,
      recordStartTime: 0,
      showTimeText: '00:00:00',
      videoError: ''
    })
    const devicePlayer = ref(null)
    const show = () => {
      devicePlayer.value.openDialog('media', 23, 43, {
        streamInfo: 11,
        hasAudio: true
      })
    }

    return { ...toRefs(ret), devicePlayer, show }
  }
}
</script>

<style scoped>

</style>
