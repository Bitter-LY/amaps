<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import useViewer from '@/hooks/useViewer'

const loadOptions = {
  key: 'bfb9ad66b3ccb45e5d46039c36710bc5',
  version: '2.0'
}
const options: AMap.MapOptions = {
  viewMode: '2D',
  zoom: 12,
  center: [116.397428, 39.90923]
}

const SIZE = 4 // 地图网格大小 2 * 2
const containers = Array.from({ length: SIZE }, () => shallowRef<HTMLDivElement | null>(null))
containers.forEach((e, i) => {
  const { viewer: viewer } = useViewer({
    container: e,
    loadOptions,
    options
  })

  const unWatch = watch(
    () => viewer.value,
    (val) => {
      if (!val) return
      unWatch()
      handleViewerComplete(val)
      e.value!.insertAdjacentHTML('afterbegin', `<div class="complete">Viewer${i}</div>`)
    }
  )
})
const handleViewerComplete = (viewer: AMap.Map) => {
  viewer.add(new AMap.Marker({ position: [116.397428, 39.90923] }))
}
</script>

<template>
  <div class="viewers">
    <div
      v-for="(e, i) in containers"
      :ref="(c) => (e.value = c as HTMLDivElement)"
      :key="i"
    ></div>
  </div>
</template>

<style scoped>
.viewers {
  display: grid;
  grid-template-columns: repeat(calc(v-bind(SIZE) / 2), 1fr);
  grid-template-rows: repeat(calc(v-bind(SIZE) / (v-bind(SIZE) / 2)), 1fr);
  grid-gap: 5px;
  width: 100%;
  height: 100%;
}

:global(.complete) {
  position: absolute;
  z-index: 1;
  font-weight: 700;
  color: #fff;
  background-color: blue;
}
</style>
