/**
 * Vue code generator
 */

const { toPascalCase } = require('../utils');

function generateVue(component) {
  const componentName = toPascalCase(component.name);

  return `<template>
  <!-- ${component.name} - PDA Design System -->
  <div class="${componentName.toLowerCase()}">
    <!-- Implementation based on design spec -->
  </div>
</template>

<script setup lang="ts">
// ${component.name}
// Design spec: ${component.overview || component.name}
defineProps<{
  variant?: string;
}>();
</script>

<style scoped>
.${componentName.toLowerCase()} {
  /* Extract from design spec tables */
}
</style>
`;
}

module.exports = { generateVue };
