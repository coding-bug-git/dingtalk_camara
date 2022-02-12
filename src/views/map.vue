<template>
  <div class="_center-map">
    <div v-if="isBack" @click="init" class="back">返回上一级</div>
    <div class="main">
      <div class="chart" id="center-map"></div>
    </div>

    <div class="legend-box flex-row align-items-center">
      <img src="@/assets/images/analyse/car.png" />
      农机资源
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import mapJson from '@/assets/json/town_boundary.json'
import { njDtsx } from '@/serve/api'

export default {
  name: 'EchartsMap',
  setup () {
    // const Router = useRouter();
    const colors = ['#00758A', '#015d9e', '#8e3418', '#004D5B']
    const areaColor = '#70979C'
    const borderColor = 'rgba(116,196,203, 0.6)'
    const areaColor1 = '#85BBBA'
    const borderColor1 = 'rgba(44,255,214, 0.6)'
    const color = 'rgba(255,255,255)'
    const fontSize = '14px'
    const fontWeight = 'bold'
    const isBack = ref(false) // 是否展示返回按钮
    // const unit = inject("unit");
    // watch(
    //   () => unit.value,
    //   () => {
    //     setTimeout(() => {
    //       if (myEcharts) myEcharts.resize();
    //     }, 1000);
    //   }
    // );
    let myEcharts = null

    const list = ref([])
    const echartsOption = {
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: function (params) {
          return (
            "<div style='  letter-spacing: 4px;'><div style='font-size: 20px;line-height: 30px;'> " +
            params.name +
            '</div>' +
            " 正常农机数量: <span style='font-size: 18px;line-height: 25px;  text-shadow:#1380ff 0px 0px 4px ;'> " +
            params.value +
            ' </span>台 <br/>' +
            "正常农机手人数: <span style='font-size: 18px;line-height: 25px;  text-shadow:#1380ff 0px 0px 4px ;'> " +
            params.data.value1 +
            '</span>人<br/>' +
            "农田基本建设作业量:<span style='font-size: 18px;line-height: 25px;  text-shadow:#1380ff 0px 0px 4px ;'>  " +
            params.data.value2 +
            '</span>立方米<br/>' +
            "农机跨区作业面积:<span style='font-size: 18px;line-height: 25px;  text-shadow:#1380ff 0px 0px 4px ;'>  " +
            params.data.value3 +
            '</span>亩<br/>' +
            "生产托管作业面积:<span style='font-size: 18px;line-height: 25px;  text-shadow:#1380ff 0px 0px 4px ;'>  " +
            params.data.value4 +
            '</span>亩</div>'
          )
        },
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderColor: 'rgba(0,0,0,0.0)',
        borderWidth: 0,
        textStyle: {
          color: '#fff'
          // lineHeight: 100,
        }
      },
      geo: [
        {
          map: 'JEC',
          roam: false,
          selectedMode: 'single',
          zoom: 1.2 // 缩放比例，目前比较合适的是 1.2
        }
      ],
      series: [
        {
          name: '农机资源',
          type: 'map',
          roam: false, // 是否移动地图，这里控制不动地图
          map: 'JEC',
          zoom: 1.2, // 缩放比例，目前比较合适的是 1.2
          emphasis: {
            label: {
              show: true
            }
          },
          label: {
            show: true
          },
          data: []
        },
        {
          name: '1',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: [],
          symbol:
            'image://https://img.hzanchu.com/acimg/7e958e03ff92ea5ab2d23af0674f8b8d.png',
          symbolSize: [20, 20],
          hoverSymbolSize: 10,
          tooltip: {
            show: false
          },
          encode: {
            value: 2
          },
          label: {
            show: false
          }
        }
      ]
    }

    const init = () => {
      isBack.value = false
      echarts.registerMap('JEC', mapJson, {})
      myEcharts = echarts.init(document.getElementById('center-map'))
      getData()
    }
    // 获取数据
    const getData = async () => {
      const result = await njDtsx({ inFields: {} })
      if (result.errorCode === 1) {
        drawMap(result.data)
        list.value = result.data
      }
    }
    // 绘制地图
    const drawMap = (obj) => {
      const data = []
      const imgData = []
      const latList = [
        ['百丈漈镇', 119.99547079, 27.86144712],
        ['大峃镇', 120.08453428, 27.76823718],
        ['二源镇', 120.03713075, 27.88578576],
        ['公阳乡', 120.20086353, 27.71063081],
        ['桂山乡', 120.05832563, 27.57368201],
        ['黄坦镇', 119.92980773, 27.726112],
        ['巨屿镇', 120.08692227, 27.68824945],
        ['南田镇', 119.97980773, 27.896112],
        ['平和乡', 120.2139794, 27.73757906],
        ['珊溪镇', 120.05237277, 27.63720658],
        ['双桂乡', 120.14845732, 27.68959964],
        ['铜铃山镇', 119.83979527, 27.82247661],
        ['西坑镇', 119.92980773, 27.826112],
        ['峃口镇', 120.18351396, 27.76584003],
        ['玉壶镇', 120.15933919, 27.92631066],
        ['周壤镇', 120.13361459, 27.81984423],
        ['周山畲族乡', 120.15400923, 27.73088312]
      ]

      for (const item of obj) {
        data.push({
          name: item.town,
          value: item.zcnongji,
          value1: item.zcjishou,
          value2: item.njzyl,
          value3: item.njkqzymj,
          value4: item.sctgzymj,
          label: {
            color,
            fontWeight,
            fontSize
          },
          itemStyle: {
            areaColor: areaColor,
            borderColor: borderColor
          },
          select: {
            label: {
              color,
              fontWeight,
              fontSize
            },
            itemStyle: {
              areaColor: areaColor1,
              borderColor: borderColor1
            }
          },
          emphasis: {
            label: {
              color,
              fontWeight,
              fontSize
            },
            itemStyle: {
              areaColor: areaColor1,
              borderColor: borderColor1
            }
          }
        })
        if (item.zcnongji > 0) {
          // console.log(item);
          for (const item1 of latList) {
            if (item1[0] == item.town) {
              console.log(item1[0], item.town)
              imgData.push({
                name: item.town,
                value: [item1[1], item1[2], item.zcnongji]
              })
            }
          }
        }
      }

      echartsOption.series[0].data = data
      echartsOption.series[1].data = imgData
      myEcharts.setOption(echartsOption)
      // myEcharts.on("click", function (params) {
      //   // console.log(params);
      //   dealNextMap(params.data.name);
      //   isBack.value = true;
      // });
    }

    // 点击地图下钻处理
    const dealNextMap = (town) => {
      let nextMap = {}
      const obj = JSON.parse(JSON.stringify(mapJson))
      for (const item of obj.features) {
        if (item.properties.name == town) {
          nextMap = item
        }
      }
      obj.features = [nextMap]
      for (const item of list.value) {
        if (item.town == town) {
          drawNextMap(obj, item)
          break
        }
      }
    }

    // 重新绘制地图
    const drawNextMap = (map, data) => {
      myEcharts.off('click')
      echarts.registerMap('WC1', map, {})
      myEcharts = echarts.init(document.getElementById('center-map'))
      const echartsOptionNext = {
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (params) {
            return (
              "<div style='  letter-spacing: 4px;'><div style='font-size: 20px;line-height: 30px;'> " +
              params.name +
              '</div>' +
              " 正常农机数量: <span style='font-size: 18px;line-height: 25px;  text-shadow:#1380ff 0px 0px 4px ;'> " +
              params.value +
              ' </span>台 <br/>' +
              "正常农机手人数: <span style='font-size: 18px;line-height: 25px;  text-shadow:#1380ff 0px 0px 4px ;'> " +
              params.data.value1 +
              '</span>人<br/>' +
              "农田基本建设作业量:<span style='font-size: 18px;line-height: 25px;  text-shadow:#1380ff 0px 0px 4px ;'>  " +
              params.data.value2 +
              '</span>立方米<br/>' +
              "农机跨区作业面积:<span style='font-size: 18px;line-height: 25px;  text-shadow:#1380ff 0px 0px 4px ;'>  " +
              params.data.value3 +
              '</span>亩<br/>' +
              "生产托管作业面积:<span style='font-size: 18px;line-height: 25px;  text-shadow:#1380ff 0px 0px 4px ;'>  " +
              params.data.value4 +
              '</span>亩</div>'
            )
          },
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderColor: 'rgba(0,0,0,0.0)',
          borderWidth: 0,
          textStyle: {
            color: '#fff'
            // lineHeight: 100,
          }
        },
        geo: { show: false },
        series: [
          {
            name: '农机资源',
            type: 'map',
            roam: false, // 是否移动地图，这里控制不动地图
            map: 'WC1',
            zoom: 1.2, // 缩放比例，目前比较合适的是 1.2
            emphasis: {
              label: {
                show: true
              }
            },
            label: {
              show: true
            },
            data: [
              {
                name: data.town,
                value: data.zcnongji,
                value1: data.zcjishou,
                value2: data.njzyl,
                value3: data.njkqzymj,
                value4: data.sctgzymj,
                label: {
                  color,
                  fontWeight,
                  fontSize
                },
                itemStyle: {
                  areaColor: areaColor,
                  borderColor: borderColor
                },
                select: {
                  label: {
                    color,
                    fontWeight,
                    fontSize
                  },
                  itemStyle: {
                    areaColor: areaColor1,
                    borderColor: borderColor1
                  }
                },
                emphasis: {
                  label: {
                    color,
                    fontWeight,
                    fontSize
                  },
                  itemStyle: {
                    areaColor: areaColor1,
                    borderColor: borderColor1
                  }
                }
              }
            ]
          },
          {
            type: 'scatter',
            data: []
          }
        ]
      }
      myEcharts.setOption(echartsOptionNext)
    }

    onMounted(() => {
      init()
    })
    return { colors, list, isBack, init }
  }
}
</script>

<style scoped lang="less">
._center-map {
  position: relative;
  z-index: 30;
  width: 2000px;
  height: 1200px;
  margin-left: 70px;
  background-color: rgba(255, 255, 255, 0.2);

  .main {
    width: 100%;
    height: 100%;
    .chart {
      width: 100%;
      height: 100%;
    }
  }

  .legend-box {
    position: absolute;
    z-index: 1000;
    right: 100px;
    bottom: 80px;
    background: none;
    color: white;
    img {
      width: 40px;
      height: 36px;
      margin-right: 10px;
    }
  }

  .back {
    position: absolute;
    z-index: 1000;
    top: 100px;
    left: 140px;
    font-size: 40px;
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>
