<template >
    <div class="h-[50vh]">
    <!-- <div class="loader"> -->
        <div class="outer"></div>
        <div class="middle"></div>
        <div class="inner"></div>
    <!-- </div> -->
  </div>
  </template>
  <script setup lang="ts">
  
  </script>
  <style scoped>
  .loader {
      position: relative;
      margin-top: 40px;
    }
    
    .outer,
    .middle,
    .inner {
      border: 3px solid transparent;
      border-top-color: #dd5928;
      border-right-color: #dd5928;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
    }
    
    .outer {
      width: 120px;
      height: 120px;
      margin-left: -1.75em;
      margin-top: -1.75em;
      animation: spin 2s linear infinite;
    }
    
    .middle {
      width: 100px;
      height: 100px;
      margin-left: -1.05em;
      margin-top: -1.05em;
      animation: spin 1.75s linear reverse infinite;
    }
    
    .inner {
      width: 80px;
      height:80px;
      margin-left: -0.4em;
      margin-top: -0.4em;
      animation: spin 1.5s linear infinite;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  </style>