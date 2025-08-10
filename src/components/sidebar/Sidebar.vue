<template>
  <div class="flex min-h-screen z-40 pl-64 mt-16">
    <aside class="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-4 shadow-lg z-40 flex flex-col">
      <div class="flex justify-center items-center mb-8 mt-4">
        <img
          src="https://theheraldghana.com/wp-content/uploads/2022/03/NDC.jpg"
          alt="NDC Flag"
          class="w-24 h-24 object-contain rounded-full border-2 border-red-600 shadow-md"
        />
      </div>

      <nav class="flex-1 space-y-3">
        <RouterLink
          to="/dashboard"
          class="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200"
          :class="$route.path === '/dashboard' ? 'bg-red-600 text-white font-semibold shadow-md' : 'hover:bg-gray-700'"
        >
          <i class="fas fa-tachometer-alt text-lg"></i>
          <span>Dashboard</span>
        </RouterLink>

        <RouterLink
          to="/memberss"
          class="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200"
          :class="$route.path === '/memberss' ? 'bg-red-600 text-white font-semibold shadow-md' : 'hover:bg-gray-700'"
        >
          <i class="fas fa-users text-lg"></i>
          <span>Members</span>
        </RouterLink>

        <RouterLink
          to="/leadership"
          class="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200"
          :class="$route.path === '/leadership' ? 'bg-red-600 text-white font-semibold shadow-md' : 'hover:bg-gray-700'"
        >
          <i class="fas fa-user-tie text-lg"></i>
          <span>Leadership</span>
        </RouterLink>

        <RouterLink
          to="/region"
          class="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200"
          :class="$route.path === '/region' ? 'bg-red-600 text-white font-semibold shadow-md' : 'hover:bg-gray-700'"
        >
          <i class="fas fa-globe-africa text-lg"></i>
          <span>Region</span>
        </RouterLink>

        <RouterLink
          to="/constituency"
          class="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200"
          :class="$route.path === '/constituency' ? 'bg-red-600 text-white font-semibold shadow-md' : 'hover:bg-gray-700'"
        >
          <i class="fas fa-map-marked-alt text-lg"></i>
          <span>Constituencies</span>
        </RouterLink>

        <RouterLink
          to="/station"
          class="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200"
          :class="$route.path === '/station' ? 'bg-red-600 text-white font-semibold shadow-md' : 'hover:bg-gray-700'"
        >
          <i class="fas fa-vote-yea text-lg"></i>
          <span>Polling Stations</span>
        </RouterLink>

        <RouterLink
          to="/collation"
          class="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200"
          :class="$route.path === '/collation' ? 'bg-red-600 text-white font-semibold shadow-md' : 'hover:bg-gray-700'"
        >
          <i class="fas fa-file-alt text-lg"></i>
          <span>Collation Center</span>
        </RouterLink>

        <RouterLink
          to="/meeting"
          class="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200"
          :class="$route.path === '/meeting' ? 'bg-red-600 text-white font-semibold shadow-md' : 'hover:bg-gray-700'"
        >
          <i class="fas fa-handshake text-lg"></i>
          <span>Attendance/Aid</span>
        </RouterLink>

        <RouterLink
          to="/system-settings"
          class="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200"
          :class="$route.path === '/system-settings' ? 'bg-red-600 text-white font-semibold shadow-md' : 'hover:bg-gray-700'"
        >
          <i class="fas fa-cogs text-lg"></i>
          <span>Settings</span>
        </RouterLink>
      </nav>
    </aside>

    <main class="flex-1 p-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import '@fortawesome/fontawesome-free/css/all.min.css';
const $route = useRoute();
</script>

<style scoped>
/* Optional: Add custom styles here if needed */
</style>