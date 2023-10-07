const task: Task = {
  status: 'uncompleted',
  description: '初始化地图',
  component: () => import('./Viewer.vue')
}

export default task
