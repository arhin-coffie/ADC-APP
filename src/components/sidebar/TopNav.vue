<template>
  <div class="flex mx-64">
    <!-- Fixed Navigation Bar -->
    <nav class="fixed w-full bg-gradient-to-r from-[#D21011] via-white to-[#006B3D] px-8 py-4 shadow-lg ">
      <div class="container mx-auto flex justify-between items-center ">
        <!-- NDC Logo Section -->
        <div class="flex flex-col">
          <span class="font-serif text-4xl font-bold text-[#006B3D] tracking-tight"><strong class="text-[#006B3D]">N</strong><strong class="text-[#000]">D</strong><strong class="text-[#FFF]">C</strong></span>
          <span class="text-sm font-semibold text-[#fff     ] tracking-wider -mt-2 ml-px">
            National Democratic Congress
          </span>
        </div>
        
        <!-- Flag Representation -->
        <div class="flex h-12 mr-12 rounded-md overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
          <div class="w-6 bg-[#D21011]"></div>
          <div class="w-6 bg-white border-l border-r border-gray-200"></div>
          <div class="w-6 bg-[#006B3D]"></div>
          <div class="w-6 bg-black"></div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
// Composition API setup
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');


</style>