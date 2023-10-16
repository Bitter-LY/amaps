<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import useCreateMap from '@/hooks/useCreateMap'

const mapLoadOptions = {
  key: 'bfb9ad66b3ccb45e5d46039c36710bc5',
  version: '2.0'
}
const mapOptions = {
  viewMode: '2D',
  zoom: 3,
  center: [116.397428, 39.90923]
}

const mapContainer = shallowRef(null)

const { map } = useCreateMap({
  container: mapContainer,
  loadOptions: mapLoadOptions,
  options: mapOptions
})

watch(map, (val) => {
  val && handleMapActions(val)
})

function handleMapActions(map: AMap.Map) {
  map.setZoom(14)
}
</script>

<template>
  <div
    ref="mapContainer"
    class="container"
  ></div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
