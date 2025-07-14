<template>
  <div class="under-construction">
    <div class="construction-content">
      <!-- 3D Construction Icon -->
      <div class="construction-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="#FFD700" d="M503.5 204.6L307.3 8.4c-6.2-6.2-16.4-6.2-22.6 0l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6l76.8 76.8L176.3 241.9l-76.8-76.8c-6.2-6.2-16.4-6.2-22.6 0L54.3 187.7c-6.2 6.2-6.2 16.4 0 22.6l196.2 196.2c6.2 6.2 16.4 6.2 22.6 0l22.6-22.6c6.2-6.2 6.2-16.4 0-22.6l-76.8-76.8 184.8-184.8 76.8 76.8c6.2 6.2 16.4 6.2 22.6 0l22.6-22.6c6.3-6.3 6.3-16.4 0-22.7z"/>
          <path fill="#FFA500" d="M361.4 150.6l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6l22.6 22.6c6.2 6.2 16.4 6.2 22.6 0l22.6-22.6c6.2-6.2 6.2-16.4 0-22.6l-22.6-22.6c-6.2-6.2-16.4-6.2-22.6 0z"/>
          <path fill="#FF6347" d="M150.6 361.4l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6l22.6 22.6c6.2 6.2 16.4 6.2 22.6 0l22.6-22.6c6.2-6.2 6.2-16.4 0-22.6l-22.6-22.6c-6.2-6.2-16.4-6.2-22.6 0z"/>
        </svg>
      </div>

      <!-- Animated Construction Hat -->
      <div class="construction-hat">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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
        <div class="progress-bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnderConstruction'
}
</script>

<style scoped>
.under-construction {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 1rem;
}

.construction-content {
  text-align: center;
  max-width: 28rem;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
}

.construction-icon {
  margin: 0 auto 2rem;
  width: 8rem;
  height: 8rem;
  transform: rotate(12deg);
  filter: drop-shadow(0 10px 15px rgba(251, 191, 36, 0.3));
}

.construction-icon svg {
  transition: transform 0.5s ease;
}

.construction-icon:hover svg {
  transform: rotateY(25deg) rotateX(15deg);
}

.construction-hat {
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 4rem;
  height: 4rem;
  filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.2));
  animation: bounce 2s infinite;
}

.construction-title {
  font-size: 1.875rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.construction-message {
  font-size: 1.25rem;
  color: #4a5568;
  margin-bottom: 0.25rem;
}

.construction-submessage {
  color: #718096;
  margin-bottom: 1.5rem;
}

.construction-progress {
  height: 0.5rem;
  background: #edf2f7;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #f6ad55 0%, #f56565 100%);
  width: 65%;
  animation: progress 2s ease-in-out infinite alternate;
}

@keyframes bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-0.5rem);
  }
}

@keyframes progress {
  0% {
    width: 65%;
  }
  100% {
    width: 75%;
  }
}
</style>