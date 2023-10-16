import '@amap/amap-jsapi-types'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    task?: Task
  }
}
