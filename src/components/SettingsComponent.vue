<template>
    <transition name="fade">
      <div class="settings">
        <h6 class="text-center">Settings</h6>
            <SidebarLink to="/PullStation" icon="fas fa-columns" class="custom-link-style">Pull Station</SidebarLink>
           <SidebarLink to="/Position" icon="fas fa-columns" class="custom-link-style">Position</SidebarLink>
           <SidebarLink to="/Id-prefix" icon="fas fa-columns" class="custom-link-style">Id-prefix</SidebarLink>
        
      </div>
    </transition>
  </template>
  
  <script setup>
  import SidebarLink from "../components/sidebar/SidebarLink.vue";

  </script>
  
  <style scoped>
  .settings {
    background-color: #f8f8f8;
    border-radius:  5px 5px; 
    margin-left: 10px; 
    animation: fadeIn 0.5s ease-in;
    /* Increase the height of the settings component */
    min-height: 200px;
    color: black;
   } 
  /* .header {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    border-bottom: 2px solid #ccc;
    padding-bottom: 5px;
  }
  
  .settings h2 {
    margin-bottom: 10px;
  }
  
  .settings-list {
    list-style: none;
    padding: 0;
  }
  
  .settings-list li {
    padding: 5px 10px;
    /* border-bottom: 1px solid #ddd; */
  /* }
  
  .settings-list li:last-child {
    border-bottom: none;
  }
  .settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .settings-header h2 {
    margin: 0;
  } */
  
  /* .settings-header button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #555;
  }
  
  .settings-header button:hover {
    text-decoration: underline;
  }   */
  .custom-link-style {
    /* Add your desired styles here */
     	color: rgb(75 85 99);; /* Example text color */
    text-decoration: none; /* Remove underline */
    /* Add any other styles you want */
}
  
  /* Animation styles (same as before) */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>