<template>
  <div class="flex min-h-screen z-40 pl-64 mt-16">
    <!-- Sidebar Navigation -->
    <aside class="fixed top-0 left-0 h-screen w-64 bg-black text-white p-4 z-40">
   <div class="absolute top-4 right-4 w-16 h-16 md:w-20 md:h-20">
       <div class="flex h-12 mr-12 rounded-md overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
          <div class="w-6 bg-[#D21011]"></div>
          <div class="w-6 bg-white border-l border-r border-gray-200"></div>
          <div class="w-6 bg-[#006B3D]"></div>
          <div class="w-6 bg-black"></div>
        </div>
      </div>
      <nav class="space-y-2">
        <RouterLink
          to="/#"
          class="flex items-center gap-2 py-2 px-4 rounded hover:bg-red-600"
          :class="$route.path === '/login' ? 'bg-white text-black font-bold border-l-4 border-red-600' : ''"
        >
          <span>📊</span> Log IN
        </RouterLink>
        <RouterLink
          to="/dashboard"
          class="flex items-center gap-2 py-2 px-4 rounded hover:bg-red-600"
          :class="$route.path === '/dashboard' ? 'bg-white text-black font-bold border-l-4 border-red-600' : ''"
        >
          <span>📊</span> Dashboard
        </RouterLink>

        <RouterLink
          to="/memberss"
          class="flex items-center gap-2 py-2 px-4 rounded hover:bg-red-600"
          :class="$route.path === '/memberss' ? 'bg-white text-black font-bold border-l-4 border-red-600' : ''"
        >
          <span>👥</span> Members
        </RouterLink>

        <RouterLink
          to="/leadership"
          class="flex items-center gap-2 py-2 px-4 rounded hover:bg-red-600"
          :class="$route.path === '/leadership' ? 'bg-white text-black font-bold border-l-4 border-red-600' : ''"
        >
          <span>👥</span> Leadership
        </RouterLink>
          <RouterLink
          to="/region"
          class="flex items-center gap-2 py-2 px-4 rounded hover:bg-red-600"
          :class="$route.path === '/region' ? 'bg-white text-black font-bold border-l-4 border-red-600' : ''"
        >
          <span>📍</span> Region
        </RouterLink>  
        <RouterLink
          to="/constituency"
          class="flex items-center gap-2 py-2 px-4 rounded hover:bg-red-600"
          :class="$route.path === '/constituency' ? 'bg-white text-black font-bold border-l-4 border-red-600' : ''"
        >
          <span>📍</span> Constituencys
        </RouterLink>

        <RouterLink
          to="/station"
          class="flex items-center gap-2 py-2 px-4 rounded hover:bg-red-600"
          :class="$route.path === '/station' ? 'bg-white text-black font-bold border-l-4 border-red-600' : ''"
        >
          <span>📍</span> Polling Stations
        </RouterLink>

        <RouterLink
          to="/collation"
          class="flex items-center gap-2 py-2 px-4 rounded hover:bg-red-600"
          :class="$route.path === '/collation' ? 'bg-white text-black font-bold border-l-4 border-red-600' : ''"
        >
          <span>📄</span> Collation Center
        </RouterLink>
         <RouterLink
          to="/meeting"
          class="flex items-center gap-2 py-2 px-4 rounded hover:bg-red-600"
          :class="$route.path === '/meeting' ? 'bg-white text-black font-bold border-l-4 border-red-600' : ''"
        >
          <span>📄</span> Attendance
        </RouterLink>
            <RouterLink
          to="/system-settings"
          class="flex items-center gap-2 py-2 px-4 rounded hover:bg-red-600"
          :class="$route.path === '/system-settings' ? 'bg-white text-black font-bold border-l-4 border-red-600' : ''"
        >
          <span>📄</span> Settings
        </RouterLink>
      </nav>
    </aside>

    <!-- Main Content -->
     <main class="flex-1 p-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const $route = useRoute()
</script>
