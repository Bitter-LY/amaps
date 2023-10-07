import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/Home.vue'

const modules = import.meta.glob<true, string, Task>(['../tasks/*/index.ts'], {
  import: 'default',
  eager: true
})

export const taskRoutes = createTasksRoutes()
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'tasks' }
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: Home,
    redirect: { name: taskRoutes[0]?.name },
    children: taskRoutes
  }
]

function createTasksRoutes() {
  const tasks: RouteRecordRaw[] = []
  for (const path in modules) {
    const name = path.match(/\.\/tasks\/(.*)\/index\.(vue|tsx?)$/)![1]
    const task: Task = modules[path]

    tasks.push({
      path: `/tasks/${name}`,
      name: `tasks-${name}`,
      component: task.component,
      meta: {
        title: name,
        task
      }
    })
  }

  return tasks
}
