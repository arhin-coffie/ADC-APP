<template>
  <transition name="fade">
    <div class="settings-panel">
      <h6 class="settings-title">Settings</h6>
      <div class="settings-links">
        <SidebarLink to="/PullStation" icon="fas fa-columns" class="settings-link">
          <span class="link-text"> Create Polling Stations</span>
        </SidebarLink>
        <SidebarLink to="/Position" icon="fas fa-columns" class="settings-link">
          <span class="link-text">Create Positions</span>
        </SidebarLink>
         <SidebarLink to="/meeting" icon="fas fa-columns" class="settings-link">
          <span class="link-text">Create Meeting</span>
        </SidebarLink>
        <SidebarLink to="/Id-prefix" icon="fas fa-columns" class="settings-link">
          <span class="link-text">Create ID Prefix</span>
        </SidebarLink>
      </div>
    </div>
  </transition>
</template>

<script setup>
import SidebarLink from "../components/sidebar/SidebarLink.vue";
</script>

<style scoped>
.settings-panel {
  background-color: #ffffff;
  border-radius: 8px;
  /* margin-left: 10px; */
  padding: 1.5rem 1rem;
  min-height: 200px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center everything horizontally */
}

.settings-panel:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.settings-title {
  color: #2d3748;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #edf2f7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: 100%;
}

.settings-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  align-items: center;
  margin-right: 30px;
}

.settings-link {
  color: #4a5568;
  text-decoration: none;
  padding: 0.625rem 1.25rem;
  padding-left: calc(1.25rem + 3px); /* Offset for left bar */
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 80%;
  max-width: 200px;
  justify-content: center;
  position: relative;
  white-space: nowrap;
  background-color: transparent;
}

.link-text {
  white-space: nowrap;
}

.settings-link:hover {
  background-color: #f7fafc;
  color: #2b6cb0;
}

.settings-link:active,
.settings-link.router-link-active,
.settings-link.router-link-exact-active {
  background-color: #ebf8ff;
  color: #2b6cb0;
  font-weight: 500;
  
}

.settings-link:active::after,
.settings-link.router-link-active::after,
.settings-link.router-link-exact-active::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background-color: #4299e1;
  border-radius: 3px 0 0 3px;
}

/* Fade animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active {
  animation: fadeIn 0.3s ease-out;
}

.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
