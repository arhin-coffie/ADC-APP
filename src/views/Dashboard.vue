<!-- eslint-disable vue/no-duplicate-attributes -->
<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div>
    <h1>The sidebar is {{ collapsed ? "closed" : "open" }}</h1>
    <!-- <button @click="toggleSidebar">Toggle Sidebar</button> -->
  
    <select multiple v-model="selectedOptions">
      <option v-for="option in options" :value="option.value" :key="option.value">
        {{ option.label }}
      </option>
    </select>
  
    <div>Selected options: {{ selectedOptions }}</div>
    <GDialog v-model="dialogState" max-width="500">
    <div class="wrapper p-4">
      <div class="content">
        <div class="title underline text-black bg-blue-500 " >Content</div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Porro, ratione!
        </p>
      </div>

      <div class="actions">
        <button
          class="btn btn--outline-gray"
          @click="dialogState = false"
        >
          Submit
        </button>
      </div>
    </div>
  </GDialog>

  <button
    class="btn btn--primary"
    @click="openDialog"
  >
    Open Dialog
  </button>
</div>
  </template>
  
  <script setup>
  // import { collapsed, toggleSidebar } from "@/components/sidebar/state";
  
  // export default {
  //   setup() {
  //     return { collapsed, toggleSidebar };
  //   },
  // };
  
  import { ref } from "vue";
  
  // eslint-disable-next-line no-unused-vars
  const options = ref([
    { label: "Option 1", value: 1 },
    { label: "Option 2", value: 2 },
    { label: "Option 3", value: 3 },
  ]);
  
  const dialogState = ref(false);
  
  const openDialog = () => {
    dialogState.value = !dialogState.value;
  };
  // eslint-disable-next-line no-unused-vars
  const selectedOptions = ref([]);
  
  // eslint-disable-next-line no-unused-vars
  // const selectedOptionLabels = computed(() => {
  //   return selectedOptions.value.map((optionValue) => {
  //     const option = options.value.find((o) => o.value === optionValue);
  //     return option.label;
  //   });
  // });
  // eslint-disable-next-line no-unused-vars
  </script>
  <style scoped>
  select {
    width: 200px;
  }
  </style>
  