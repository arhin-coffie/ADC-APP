<template>
  <div class="under-construction">
    <div class="construction-content">
      <!-- 3D Construction Icon -->
      <div class="construction-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-32 h-32">
          <path fill="#FFD700" d="M503.5 204.6L307.3 8.4c-6.2-6.2-16.4-6.2-22.6 0l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6l76.8 76.8L176.3 241.9l-76.8-76.8c-6.2-6.2-16.4-6.2-22.6 0L54.3 187.7c-6.2 6.2-6.2 16.4 0 22.6l196.2 196.2c6.2 6.2 16.4 6.2 22.6 0l22.6-22.6c6.2-6.2 6.2-16.4 0-22.6l-76.8-76.8 184.8-184.8 76.8 76.8c6.2 6.2 16.4 6.2 22.6 0l22.6-22.6c6.3-6.3 6.3-16.4 0-22.7z"/>
          <path fill="#FFA500" d="M361.4 150.6l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6l22.6 22.6c6.2 6.2 16.4 6.2 22.6 0l22.6-22.6c6.2-6.2 6.2-16.4 0-22.6l-22.6-22.6c-6.2-6.2-16.4-6.2-22.6 0z"/>
          <path fill="#FF6347" d="M150.6 361.4l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6l22.6 22.6c6.2 6.2 16.4 6.2 22.6 0l22.6-22.6c6.2-6.2 6.2-16.4 0-22.6l-22.6-22.6c-6.2-6.2-16.4-6.2-22.6 0z"/>
        </svg>
      </div>

      <!-- Animated Construction Hat -->
      <div class="construction-hat animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-16 h-16">
          <path fill="#FF4500" d="M480 288H32c-17.7 0-32 14.3-32 32v128c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32z"/>
          <path fill="#FF8C00" d="M256 0L32 288h448L256 0z"/>
        </svg>
      </div>

      <!-- Message -->
      <h1 class="construction-title">Page Under Construction</h1>
      <p class="construction-message">We're working hard to build something awesome!</p>
      <p class="construction-submessage">Please check back soon.</p>

      <!-- Animated Progress Bar -->
      <div class="construction-progress">
        <div class="progress-bar animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for basic under construction component
</script>

<style scoped>
.under-construction {
  @apply min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4;
}

.construction-content {
  @apply text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-2xl relative;
  transform-style: preserve-3d;
}

.construction-icon {
  @apply mx-auto mb-8 transform rotate-12;
  filter: drop-shadow(0 10px 15px rgba(251, 191, 36, 0.3));
  perspective: 1000px;
}

.construction-hat {
  @apply absolute -top-8 left-1/2 transform -translate-x-1/2;
  filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.2));
}

.construction-title {
  @apply text-3xl font-bold text-gray-800 mb-2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.construction-message {
  @apply text-xl text-gray-600 mb-1;
}

.construction-submessage {
  @apply text-gray-500 mb-6;
}

.construction-progress {
  @apply h-4 bg-gray-200 rounded-full overflow-hidden;
}

.progress-bar {
  @apply h-full bg-gradient-to-r from-yellow-400 to-orange-500;
  width: 65%;
  animation: progress 2s ease-in-out infinite alternate;
}

@keyframes progress {
  0% { width: 65%; }
  100% { width: 75%; }
}

/* 3D effect for the main icon */
.construction-icon svg {
  transform: rotateY(20deg) rotateX(10deg);
  transition: transform 0.5s ease;
}

.construction-icon:hover svg {
  transform: rotateY(25deg) rotateX(15deg);
}
</style>