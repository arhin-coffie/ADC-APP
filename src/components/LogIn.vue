<template>
    <div>
 <GDialog v-model="changePasswordDialog " max-width="500">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Enter Admin Credentials</h3>
          <button  class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form  class="space-y-4">
          <div>
            <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
            <input v-model="checkPassWord.name" type="password" placeholder="Admin First Name" id="currentPassword" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600">
          </div>
          
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input  v-model="checkPassWord.pass" type="password"  placeholder="Admin Password" id="newPassword" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600">
          </div>
    
          
          <div class="flex justify-end space-x-3 pt-4">
            
            <button @click="login" type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Log In
            </button>
          </div>
        </form>
      </div>
    </GDialog>
    </div>
</template>





<script setup>
import { GDialog } from 'gitart-vue-dialog';
import {ref} from 'vue'

const changePasswordDialog = ref(true);

const checkPassWord = ref({
  name: '',
  pass: '',
})
const account=ref({name: 'Francis', pass: 1515})

import { useRouter } from 'vue-router';

const router = useRouter();

const login = () => {
  console.log('log', checkPassWord.value);

  if (
    checkPassWord.value.name === account.value.name &&
    Number(checkPassWord.value.pass) === account.value.pass
  ) {
    changePasswordDialog.value = false;

    setTimeout(() => {
      router.push('/dashboard');
    }, 1000); 
  } else {
    alert('Password or name incorrect');
    changePasswordDialog.value = true;
  }
};

</script>