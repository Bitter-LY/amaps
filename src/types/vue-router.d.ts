export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    task?: Task
  }
}
