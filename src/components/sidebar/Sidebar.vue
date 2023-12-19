<!-- eslint-disable no-unused-vars -->
<script setup>
// eslint-disable-next-line no-unused-vars
import SidebarLink from "./SidebarLink.vue";
import { collapsed, toggleSidebar, sidebarWidth } from "./state";
import SettingsComponent from "../SettingsComponent.vue";
import {ref} from 'vue';

const selectedComponent = ref(false)
const handleClick = () => {
  selectedComponent.value =!selectedComponent.value;
}
</script>

<template>
  <div class="sidebar  absolute flex" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>V</div>
        <div>S</div>
      </span>
      <div class="profile-image">
        <img
          src="https://cdn.modernghana.com/images/content/c28jbn4ayt_2ndc_1.png"
          alt="profile-image"
        />
      </div>
    </h1>
    <div class="mt-20 ">
    <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
    <SidebarLink to="/dashboard" icon="fas fa-columns">Dashboard</SidebarLink>
    <SidebarLink to="/analytics" icon="fas fa-chart-bar">Analytics</SidebarLink>
    <SidebarLink to="/friends" icon="fas fa-users">Friends</SidebarLink>
    <SidebarLink to="/image" icon="fas fa-image">Images</SidebarLink>
    <li @click="handleClick">Settings</li>

  </div>
  <ul>

<!-- <li @click="handleClick('settings')">home</li> -->

</ul>
    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
   
    <SettingsComponent v-if="selectedComponent"/>

  </div>
</template>
<style>
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}


.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
.profile-image {
  width: 100px;
  height: 100px;
  overflow: hidden;
}

.profile-image img {
  width: 80%;
  height: 80%;
  object-fit: cover;
  border-radius: 30%;
}
</style>

<style scoped>
/* .sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
} */

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
.profile-image {
  width: 100px;
  height: 100px;
  overflow: hidden;
}

.profile-image img {
  width: 80%;
  height: 80%;
  object-fit: cover;
  border-radius: 30%;
}
</style>
