<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import {fetchCollection} from "@/apiService.ts";
import type {HalLinks} from "@/hal/types.ts";

const props = defineProps<{
  resourcePath: string;
}>();

const items = ref<Array<Record<string, unknown> & { _links?: HalLinks }>>([]);
const columns = ref<string[]>([]);
const loading = ref(false);

const loadData = async () => {
  loading.value = true;
  try {
    const data = await fetchCollection(props.resourcePath);

    items.value = data as Array<Record<string, unknown> & { _links?: HalLinks }>;
    if (items.value.length > 0) {
      const first = items.value[0];
      if (first) {
        columns.value = Object.keys(new Object(first)).filter(k => k !== '_links');
      } else {
        columns.value = [];
      }
    } else {
      columns.value = [];
    }

  } catch (e) {
    console.error("Ошибка загрузки", e);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);
watch(() => props.resourcePath, loadData);
</script>

<template>
  <div>
    <h3>Data from: {{ resourcePath }}</h3>

    <div v-if="loading">Loading...</div>

    <table v-else border="1" cellpadding="5">
      <thead>
      <tr>
        <th v-for="col in columns" :key="col">{{ col }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td v-for="col in columns" :key="col">
          {{ item[col] }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
