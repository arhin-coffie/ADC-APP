<template>
  <div class="home z-999 bg-white">
    <div class="toogle-button  mb-5 pt-4">
      <div class=" nav-f ml-4">
        <button
          @click="pullToggle('sailers')"
          class="labelButton btn btn-outline-success text-green p200 btn-shadow text-center hover:bg-[#f75656] bg-[#8F95B2] focus:outline-none focus:ring-2 focus:bg-[#DD5928]"
          :class="sailersToggle ? 'active-toogle-button' : 'inactive-toogle-button'"
        >
          1
        </button>
        <p class="block N800 P200 ml-5 mr-5 mt-2 text-lowercase fs-6 px-1">
          Sailors<span class="arrow-color">></span>
        </p>
        <button
          @click="pullToggle('ase_Park')"
          class="labelButton text-green btn-shadow text-center hover:bg-[#B5461D] bg-[#8F95B2] btn btn-outline-success focus:outline-none focus:ring-2 focus:bg-[#DD5928] active:bg-[#DD5928]"
          :class="aseparkToggle ? 'active-toogle-button' : 'inactive-toogle-button'"
        >
          2
        </button>
        <p class="block N800 P200 ml-5 mr-5 mt-2 text-lowercase fs-6 px-1">
          Ase Park <span class="arrow-color">></span>
        </p>
        <button
          class="labelButton btn btn-outline-success text-green btn-shadow text-center hover:bg-[#B5461D] bg-[#8F95B2] focus:outline-none focus:ring-2 focus:bg-[#DD5928] active:bg-[#DD5928]"
        >
          3
        </button>
      </div>
    </div>
  </div>
  <SailorsComponent v-if=" sailersToggle" />
  <AseParkComponent v-if="aseparkToggle" />
</template>

<script setup>
import AseParkComponent from "../views/pullstations/AsePark.vue";
import SailorsComponent from "../views/pullstations/Sailors.vue";

import { ref } from "vue";
const sailersToggle = ref(true);
const aseparkToggle = ref(false);

const pullToggle = (view) => {
  if (view === "sailers") {
    sailersToggle.value = true;
    aseparkToggle.value = false;
  } else if (view === "ase_Park") {
    sailersToggle.value = false;
    aseparkToggle.value = true;
  } else {
    // this.sailersToggle = false;
    // this.aseparkToggle = true;
  }
};
</script>
<style scoped>
.labelButton {
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 35px;
}
.nav-f {
  display: flex;
}
.arrow-color {
  color: green;
  font-size: large;
}
.home{
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
}

.active-toogle-button {
  background-color: #198754;
  color: #ffffff;
}
</style>