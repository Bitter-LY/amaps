<script lang="ts">
export function unitUtil(value?: string | number, unit = 'px'): string | undefined {
  if (typeof value === 'string') {
    if (!/(px|rem|vw|vh|%)/.test(value)) {
      throw new Error('字符串必须包含css单位，如：px、rem、vw、vh、%等')
    }

    return value
  } else if (typeof value === 'number') return `${value}${unit}`
  else return undefined
}
</script>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

interface Props {
  width?: string | number
  height?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%'
})

const _w = computed(() => unitUtil(props.width))
const _h = computed(() => unitUtil(props.height))

let map: { destroy: () => void } | null = null

onMounted(() => {
  AMapLoader.load({
    key: 'bfb9ad66b3ccb45e5d46039c36710bc5',
    version: '2.0',
    plugins: []
  })
    .then((AMap) => {
      map = new AMap.Map('container', {
        viewMode: '2D',
        zoom: 12,
        center: [116.397428, 39.90923]
      })
    })
    .catch((e) => {
      console.log(e)
    })
})

onUnmounted(() => {
  map?.destroy()
})
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  width: v-bind('_w');
  height: v-bind('_h');
}
</style>
