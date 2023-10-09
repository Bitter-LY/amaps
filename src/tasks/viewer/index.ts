const task: Task = {
  status: 'completed',
  description: '初始化地图',
  component: () => import('./Viewer.vue')
}

export default task
