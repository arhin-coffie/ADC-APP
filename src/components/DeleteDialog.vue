<template>
    <div>
      <div class="flex justify-between items-start p-4 rounded-t dark:border-gray-700 bg-[#2f855a]">
          <h3 class="H600 N90 text-white">{{ componentTitle }}</h3>
          <button
            @click="$emit('closeDialog')"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
          <img src="../assets/cancel.svg" alt="close-circle-icon" />
          </button>
        </div>
        <div>
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="p-4">
              <img src="../assets/messageImage.svg" alt="close-circle-icon" />
              <h3 class="mb-5 P200 N800 text-gray-500 dark:text-gray-400">
              <span v-html="deleteMessage"></span>
              </h3>
              <div class="grid justify-items-end">
                <div class="flex">
                  <button
                    @click="$emit('delete')"
                    type="button"
                    :data-cy= "dataCy? dataCy : 'delete'"
                    class="text-[#DD5928] mr-2"
                  >
                    {{ deleteBtn }}
                  </button>
  
                  <button
                    @click="$emit('closeDialog')"
                    type="button"
                    data-cy="cancelDelete"
                    class="text-white bg-[#2f855a] hover:bg-[#58b787] focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
   defineProps({
      componentTitle: {
          type: String,
          default:""},
      
      deleteMessage:{
          type: String,
          default:""},
      deleteBtn:{
          type: String,
          default:""},
      dataCy:{
        type:String,
      default:""}
  });
  </script>