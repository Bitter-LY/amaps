<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { NCheckbox, NCheckboxGroup } from 'naive-ui'
import { taskRoutes } from '@/router/routes'
import { capitalize } from 'lodash-es'
import TaskColor from '@/enums/TaskColor'

const color = (status?: string) => {
  if (!status) return TaskColor.Completed
  return TaskColor[capitalize(status) as keyof typeof TaskColor]
}

const navFilter = shallowRef<string[]>(['completed', 'uncompleted', 'pass', 'abort'])
const tasks = computed(() => {
  return taskRoutes.filter((e) => {
    const status = e.meta?.task?.status
    if (!status) return false
    return navFilter.value.includes(status)
  })
})
</script>
<template>
  <div class="home">
    <nav class="nav">
      <ul>
        <li
          v-for="(item, i) in tasks"
          :key="i"
        >
          <RouterLink
            :to="item.path"
            :style="{ color: color(item.meta?.task?.status) }"
            >{{ item.meta?.task?.description }}</RouterLink
          >
        </li>
      </ul>
    </nav>

    <main class="content">
      <RouterView />
    </main>

    <div class="footer">
      <NCheckboxGroup
        v-model:value="navFilter"
        size="small"
      >
        <NCheckbox
          value="uncompleted"
          label="未完成"
          :style="{ '--n-text-color': TaskColor.Uncompleted }"
        />
        <NCheckbox
          value="completed"
          label="完成"
          :style="{ '--n-text-color': TaskColor.Completed }"
        />
        <NCheckbox
          value="abort"
          label="驳回"
          :style="{ '--n-text-color': TaskColor.Abort }"
        />
        <NCheckbox
          value="pass"
          label="通过"
          :style="{ '--n-text-color': TaskColor.Pass }"
        />
      </NCheckboxGroup>
    </div>
  </div>
</template>

<style scoped>
.home {
  --height-footer: 40px;
  --width-nav: 200px;

  display: grid;
  grid-template-columns: var(--width-nav) auto;
  grid-template-rows: auto var(--height-footer);
  height: 100vh;
}

.nav {
  padding: 15px 20px;
  border-right: 1px solid #eee;
  grid-area: 1 / 1 / 2 / 2;
}

.nav > ul {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  list-style: none;
  overflow-y: auto;
}

.content {
  flex: 1;
  height: 100%;
  padding: 15px 20px;
  grid-area: 1 / 2 / 2 / 3;
  overflow-y: auto;
}

.footer {
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  grid-area: 2 / 1 / 3 / 3;
}
</style>
