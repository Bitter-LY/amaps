<script setup lang="ts">
import MapContainer, { type IMapInstance } from '@/components/MapContainer/index.vue'
import { shallowRef } from 'vue'

const mapRef = shallowRef<IMapInstance | null>(null)
const mapRef2 = shallowRef<IMapInstance | null>(null)

function getMapIns() {
  const mapIns = mapRef.value?.getMapInstance()
  console.log('mapIns:', mapIns)
}
</script>

<template>
  <div class="container">
    <button @click="getMapIns">获取地图实例</button>

    <MapContainer
      style="width: 300px; height: 300px"
      ref="mapRef"
      :class="['testMap', 'testMap2', 'testMap3']"
      :map-loader-options="{
        key: 'bfb9ad66b3ccb45e5d46039c36710bc5',
        version: '2.0'
      }"
      :map-options="{
        viewMode: '2D',
        zoom: 12,
        center: [116.397428, 39.90923]
      }"
    />

    <MapContainer
      class="testMap"
      ref="mapRef2"
      :style="{ width: '500px', height: '500px' }"
      :map-loader-options="{
        key: 'bfb9ad66b3ccb45e5d46039c36710bc5',
        version: '2.0'
      }"
      :map-options="{
        viewMode: '2D',
        zoom: 11,
        center: [116.397428, 39.90923]
      }"
      @map-mounted="
        (map) => {
          console.log('map:', map)
        }
      "
    />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
