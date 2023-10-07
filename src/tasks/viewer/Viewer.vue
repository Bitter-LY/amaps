<script setup lang="ts"></script>
<template>
  <div>
    <p
      v-for="i in 1000"
      :key="i"
    >
      Viewer{{ i }}
    </p>
  </div>
</template>
