import { onMounted, onUnmounted, shallowRef } from 'vue'
import type { ShallowRef } from 'vue'
import { load } from '@amap/amap-jsapi-loader'

export interface IUseCreateMapOptions {
  container: ShallowRef<HTMLDivElement | null>
  options?: AMap.MapOptions
  loadOptions: Parameters<typeof load>[0]
}

export default function useCreateMap({ container, options, loadOptions }: IUseCreateMapOptions) {
  const map = shallowRef<AMap.Map | null>(null)

  onMounted(async () => {
    try {
      await load(loadOptions)
      map.value = new AMap.Map(container.value! || container, options)
    } catch (error) {
      console.error('failed to create map: ', error)
    }
  })

  onUnmounted(() => {
    map.value?.destroy()
    map.value = null
  })

  return { map }
}
