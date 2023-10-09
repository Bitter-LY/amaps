import { isRef, onMounted, onUnmounted, shallowRef, type ShallowRef } from 'vue'
import { load } from '@amap/amap-jsapi-loader'

export interface UseViewerOptions {
  container: ShallowRef<HTMLDivElement | null> | HTMLDivElement
  options?: AMap.MapOptions
  loadOptions: Parameters<typeof load>[0]
}

export default function useViewer({ container, options, loadOptions }: UseViewerOptions) {
  const viewer = shallowRef<AMap.Map>()
  onMounted(async () => {
    await load(loadOptions)
    viewer.value = new AMap.Map(isRef(container) ? container.value! : container, options)
  })
  onUnmounted(() => viewer.value?.destroy())

  return {
    viewer
  }
}
