<script setup lang="ts">
import { computed, onMounted, onUnmounted, shallowRef } from 'vue'
import { type CSSProperties, type Ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

export type IMapInstance = {
  getMapInstance: () => AMap.Map | null
}

interface IMapComponentProps {
  mapLoaderOptions: {
    key: string
    version: string
    plugins?: string[]
  }
  mapOptions?: AMap.MapOptions
  className?: string | string[]
  style?: CSSProperties
  mapRef?: Ref<HTMLDivElement | null>
}

interface IMapComponentEmits {
  (e: 'mapMounted', value: AMap.Map | null): void
}

const props = withDefaults(defineProps<IMapComponentProps>(), {})

const emits = defineEmits<IMapComponentEmits>()

const className = computed(() => {
  const _className = props.className
  return Array.isArray(_className) ? _className.join(' ') : _className
})
const style = computed(() => props.style)

const mapContainerRef = shallowRef<HTMLDivElement | null>(null)
const mapInstance = shallowRef<AMap.Map | null>(null)

function initMap() {
  AMapLoader.load(props.mapLoaderOptions)
    .then((AMap) => {
      const map = new AMap.Map(mapContainerRef.value, props.mapOptions)

      map?.on('complete', () => {
        emits('mapMounted', map)
      })

      mapInstance.value = map
    })
    .catch((e) => {
      console.log(e)
    })
}

onMounted(() => {
  initMap()
})

defineExpose<IMapInstance>({
  getMapInstance: () => mapInstance.value
})

onUnmounted(() => {
  mapInstance.value?.destroy()
})
</script>

<template>
  <div
    ref="mapContainerRef"
    :class="className"
    :style="style"
  ></div>
</template>
