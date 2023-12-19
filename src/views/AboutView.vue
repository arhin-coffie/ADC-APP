<template>
  <div class=" bg-midnight text-3xl font-bold underline">
    <h1>This is an about page</h1>
  </div>
  <GDialog v-model="dialogState" max-width="500">
    <div class="wrapper">
      <div class="content">
        <div class="title">Content</div>

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
    @click="OpenDialog"
  >
    Open Dialog
  </button>
</template>
<script setup>

import { ref } from 'vue';

const dialogState = ref(false);

const OpenDialog = () =>{
  dialogState.value =!dialogState.value;
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
