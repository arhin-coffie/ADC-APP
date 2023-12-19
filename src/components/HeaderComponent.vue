<template>
    <div :class="className" class="px-2 sm:px-4 overflow-x-hidden container-custom lg:mx-auto">
      <!-- Starting of page Info Alert -->
      <div
        v-show="alertState"
        v-if="showMessage && showMsg"
        class="add-files-popup flex p-3 mt-5 text-sm border border-[#E6E8F0] text-gray-700 bg-[#FAFBFF] rounded-lg dark:bg-gray-700 dark:text-gray-300 SPC-MB-300"
        role="alert"
        
      >
        <div class="close_btn pt-1 SPC-MR-200">
          <img src="../assets/cancel.svg" alt="info-icon" />
        </div>
        <div class="P200">
          <!-- <span class="N800">{{ alert }}</span> -->
          <span class="N800">
            {{ alert }} <a href="/learnmore" class="400">{{ learnMorr }}.</a>
          </span>
        </div>
        <button
          type="button"
          @click="showMessage = false"
          class="close_btn text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
        <img src="../assets/cancel.svg" alt="info-icon" />
        </button>
      </div>
      <!-- Ending of page Info Alert -->
      <!-- Page header -->
      <header
        v-if="showButton"
        class="flex mt-10 sm:mt-5 flex-row sm:flex-row items-center sm:justify-between SPC-MB-200"
      >
      <h3>
  <span class="H400 N900 text-lg font-semibold pr-2">{{ type }} </span>
  <span v-if="showCount" class="text-[#a83636] text-lg font-semibold">({{ count }})</span>
</h3>        <!-- add project button -->
        <div v-if="isLink && create" class="flex justify-center sm:justify-end mt-2 sm:mt-0">
          <a :href="link">
            <button
              @click="[$emit('btncall')]"
              class="text-white btn-shadow P200 bg-[#DD5928] hover:bg-[#B5461D] rounded-lg px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#EB9C7F] addEventButton"
              data-cy="createEvent"
            >
              <div v-if="isMobile">+</div>
              <div v-else>{{ text }}</div>
            </button>
          </a>
        </div>
        <div v-else-if="create" class="flex justify-center sm:justify-end mt-2 sm:mt-0">
          <button
            @click="[$emit('btncall')]"
            class="text-white btn-shadow P200 bg-[#2f855a] hover:bg-[#38a169] rounded-lg px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#1de383] addEventButton"
            data-cy="createSpecialization"
          >
            <div v-if="isMobile">+</div>
            <div v-else>{{ text }}</div>
          </button>
        </div>
  
        <!-- add project button -->
      </header>
      <!-- End of Page header -->
    </div>
  </template>
  <script setup lang="ts">
  import { ref } from "vue";
  

  // const emit = defineEmits(['cleateClient'])
  
  // let dialogState = ref(false);
  // let editMode = ref(false);
  let alertState = ref(true);
  let showMessage = ref(true);
  
  defineProps({
    link: {
      type: String,
      default: "",
    },
    isLink: {
      type: Boolean,
      default: false,
    },
    showButton: {
      type: Boolean,
      default: true,
    },
    showCount: {
      type: Boolean,
      default: true,
    },
    showMsg: {
      type: Boolean,
      default: true,
    },
    create: {
      type: Boolean,
      default: true,
    },
    count: {
      type: Number,
    },
    alert: {
      type: String,
      default: "text",
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
    learnMorr: {
      type: String,
      default: "text",
    },
    type: {
      type: String,
      default: "",
    },
    allSpecialization: {
      type: Number,
      default: Number,
    },
    allClient: {
      type: Number,
      default: Number,
    },
    text: {
      type: String,
      default: "text",
    },
    className: {
      type: String,
    },
  });
  </script>
  <style scoped>
  @media (max-width: 670px) {
    header {
      display: flex;
      justify-content: space-between;
    }
    .container-custom {
      margin-top: 20px;
    }
    .flex {
      align-items: center;
    }
    .close_btn {
      width: 50px;
    }
  }
  </style>