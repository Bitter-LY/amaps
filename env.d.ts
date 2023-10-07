/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

type Nullable<T> = T | null
interface Task {
  status: 'completed' | 'uncompleted' | 'pass' | 'abort'
  description: string
  component: any
}
