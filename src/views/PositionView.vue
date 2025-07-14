<template>
  <div class="lg:mx-40 h-auto">
    <div class="top_section container mx-auto mt-40">
      <HeaderComponent 
        :isLink="false" 
        @btncall="openDialog" 
        alert="Setup your position"
        text="Create position" 
        type="position"
        :count="positions.length" 
      />
    </div>

    <div class="container mx-auto px-4 mt-16">
      <div class="bg-white rounded-xl shadow-sm overflow-visible">
        <table aria-label="position table" class="w-full">
          <thead class="bg-[#2f855a] text-white">
            <tr>
              <th class="px-6 py-4 text-left font-medium uppercase tracking-wider">ID</th>
              <th class="px-6 py-4 text-left font-medium uppercase tracking-wider">Position</th>
              <th class="px-6 py-4 text-left font-medium uppercase tracking-wider">Description</th>
              <th class="px-6 py-4 text-right font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr 
              v-for="(position, i) in positions" 
              :key="position.id" 
              class="hover:bg-green-50 transition-colors duration-150"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-green-700 font-medium">{{ position.id }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-gray-500 font-medium">{{ position.title }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-gray-500">{{ position.description }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="relative inline-block text-left">
                  <button 
                    @click.stop="toggleDropdown(position.id)"
                    class="inline-flex justify-center w-8 h-8 rounded-full hover:bg-gray-100 focus:outline-none"
                  >
                    <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                  
                  <div 
                    v-if="activeDropdown === position.id"
                    class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                  >
                    <div class="py-1">
                      <button
                        @click.stop="editPosition(position)"
                        class="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <svg class="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        @click.stop="confirmDelete(position.id)"
                        class="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-800"
                      >
                        <svg class="mr-3 h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="positions.length === 0">
              <td colspan="4" class="px-6 py-4 text-center text-gray-500">
                No positions found. Click "Create position" to get started.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Dialog -->
    <GDialog v-model="dialogState" max-width="500">
      <div class="flex items-start justify-between p-4 border-b bg-[#2f855a] rounded-t dark:border-gray-600">
        <h3 class="H600 N900 text-white">
          {{ editState ? "Edit position" : "Add position" }}
        </h3>
        <button 
          type="button" 
          @click="closeDialog"
          class="inline-flex items-center ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="editState ? updatePosition() : addPosition()">   
        <div class="px-4 mt-5">
          <InputField 
            type="text" 
            id="title" 
            data-cy="position" 
            label="Position name" 
            :requireTag="true" 
            placeholder="Enter position name"
            :maxlength="50" 
            :showlength="false" 
            v-model="currentPosition.title" 
          />
        </div>
        <div class="px-4 mt-5">
          <InputField 
            type="text" 
            id="description"  
            label="Description" 
            :requireTag="true" 
            placeholder="Enter description"
            :maxlength="50" 
            :showlength="false" 
            v-model="currentPosition.description" 
          />
        </div>

        <div class="flex justify-end w-11/12 ml-5 my-5">
          <button 
            type="button"
            id="cancelButton" 
            class="text-[#DD5928] SPC-MR-200 mr-4" 
            @click="closeDialog"
          >
            Cancel
          </button>
          <button 
            type="submit"
            id="updateButton" 
            v-if="editState" 
            class="text-white btn-shadow P200 bg-[#2f855a] hover:bg-[#58b787] rounded-lg px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#EB9C7F] disabled:opacity-25 disabled:cursor-not-allowed flex"
            :disabled="loading"
          >
            <span v-if="loading" class="inline-flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </span>
            <span v-else>Update</span>
          </button>
          <button 
            v-else 
            id="saveButton"  
            type="submit" 
            class="ml-4 text-white btn-shadow P200 bg-[#2f855a] hover:bg-[#58b787] rounded-lg px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#1de383] disabled:opacity-25 disabled:cursor-not-allowed flex"
            :disabled="loading"
          >  
            <span v-if="loading" class="inline-flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
            <span v-else>Save</span>
          </button>
        </div>
      </form>
    </GDialog> 
   
    <!-- Delete Confirmation Dialog -->
    <GDialog max-width="500" v-model="deleteDialogState" class="relative p-4 w-full max-w-md h-full md:h-auto">
      <div class="relative bg-white rounded-lg shadow">
        <button 
          @click="deleteDialogState = false"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <div class="p-6 text-center">
          <svg class="mx-auto mb-4 w-14 h-14 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500">
            Are you sure you want to delete this position?
          </h3>
          <div class="flex justify-center space-x-4">
            <button 
              @click="deleteDialogState = false"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
            >
              Cancel
            </button>
            <button 
              @click="deletePosition"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Yes, delete it
            </button>
          </div>
        </div>
      </div>
    </GDialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import InputField from '../components/InputField.vue';

// State management
const positions = ref(JSON.parse(localStorage.getItem('positions')) || []);
const activeDropdown = ref(null);
const dialogState = ref(false);
const deleteDialogState = ref(false);
const editState = ref(false);
const loading = ref(false);
const positionToDelete = ref(null);

const currentPosition = reactive({
  id: null,
  title: '',
  description: ''
});

// Dropdown toggle
const toggleDropdown = (id) => {
  activeDropdown.value = activeDropdown.value === id ? null : id;
};

// Dialog handlers
const openDialog = () => {
  resetCurrentPosition();
  editState.value = false;
  dialogState.value = true;
};

const closeDialog = () => {
  dialogState.value = false;
  resetCurrentPosition();
};

const resetCurrentPosition = () => {
  currentPosition.id = null;
  currentPosition.title = '';
  currentPosition.description = '';
};

// Position CRUD operations
const addPosition = () => {
  if (!currentPosition.title || !currentPosition.description) return;
  
  loading.value = true;
  
  setTimeout(() => {
    const newId = positions.value.length > 0 
      ? Math.max(...positions.value.map(p => p.id)) + 1 
      : 1;
    
    positions.value.push({
      id: newId,
      title: currentPosition.title,
      description: currentPosition.description
    });
    
    saveToLocalStorage();
    loading.value = false;
    closeDialog();
  }, 1000);
};

const editPosition = (position) => {
  currentPosition.id = position.id;
  currentPosition.title = position.title;
  currentPosition.description = position.description;
  editState.value = true;
  dialogState.value = true;
  activeDropdown.value = null;
};

const updatePosition = () => {
  if (!currentPosition.title || !currentPosition.description) return;
  
  loading.value = true;
  
  setTimeout(() => {
    const index = positions.value.findIndex(p => p.id === currentPosition.id);
    if (index !== -1) {
      positions.value[index] = { ...currentPosition };
      saveToLocalStorage();
    }
    
    loading.value = false;
    closeDialog();
  }, 1000);
};

const confirmDelete = (id) => {
  positionToDelete.value = id;
  deleteDialogState.value = true;
  activeDropdown.value = null;
};

const deletePosition = () => {
  positions.value = positions.value.filter(p => p.id !== positionToDelete.value);
  saveToLocalStorage();
  deleteDialogState.value = false;
  positionToDelete.value = null;
};

const saveToLocalStorage = () => {
  localStorage.setItem('positions', JSON.stringify(positions.value));
};
</script>

<style scoped>
/* Custom styles for dropdown */
.relative:hover .origin-top-right {
  display: block;
}

/* Smooth transitions */
.origin-top-right {
  transition: all 0.2s ease-out;
}

/* Button focus styles */


/* Table row hover effect */
tr:hover {
  background-color: rgba(47, 133, 90, 0.05);
}

/* Loading spinner animation */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>