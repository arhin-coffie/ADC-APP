<template>
  <div class="mx-40 bg-[#e3ece4] mt-24">
    <!-- Notification Toast -->
    <div v-if="showSuccess" class="fixed top-50 right-4 z-50">
      <div class="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        {{ successMessage }}
      </div>
    </div>

    <!-- Error Notification Toast -->
    <div v-if="showError" class="fixed top-4 right-4 z-50">
      <div class="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        {{ errorMessage }}
      </div>
    </div>

    <div class="thank-you-banner ">
      <div class="thank-you-text">
        Sailors Polling Station 
      </div>
      <div class="thank-you-decoration">
        <svg class="w-24 h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
          <path d="M7 13L10 16L17 9" stroke="#046A38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <div class=" mt-0">
      <HeaderComponent 
        :isLink="false" 
        @btncall="openAddDialog"
        text="Add members" 
        type="Nkansa One"
        :count="members.length" 
      />
    </div>

    <!-- Search Section -->
    <div class="mx-auto">
      <div class=" shadow-sm p-4 mb-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="nameSearch" class="block text-sm font-medium text-gray-700 mb-1">Search by Name</label>
            <div class="relative">
              <input
                type="text"
                id="nameSearch"
                v-model="nameSearch"
                placeholder="Enter name..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button 
                v-if="nameSearch"
                @click="nameSearch = ''"
                class="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <label for="positionSearch" class="block text-sm font-medium text-gray-700 mb-1">Filter by Position</label>
            <select
              id="positionSearch"
              v-model="positionSearch"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Positions</option>
              <option v-for="position in uniquePositions" :key="position" :value="position">
                {{ position }}
              </option>
            </select>
          </div>
        </div>
        <div class=" text-sm text-gray-500" v-if="members.length > 0">
          Showing {{ filteredMembers.length }} of {{ members.length }} members
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 mt-4">
      <div class="bg-white rounded-xl shadow-sm overflow-visible">
        <table aria-label="user table" class="w-full">
          <thead class="bg-[#2f855a] text-white">
            <tr>
              <th class="px-6 py-4 text-left font-medium uppercase tracking-wider">Party ID</th>
              <th class="px-6 py-4 text-left font-medium uppercase tracking-wider">Name</th>
              <th class="px-6 py-4 text-left font-medium uppercase tracking-wider">Phone</th>
              <th class="px-6 py-4 text-left font-medium uppercase tracking-wider">Position</th>
              <th class="px-6 py-4 text-right font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="isLoading">
              <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                <div class="flex justify-center items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading members...
                </div>
              </td>
            </tr>
            <template v-else>
              <tr 
                v-for="(member) in filteredMembers" 
                :key="member.id" 
                class="hover:bg-green-50 transition-colors duration-150"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-green-700 font-medium">{{ member.idNumber }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span class="text-green-600 font-medium">
                        {{ member.name.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        <router-link 
                          :to="{ name: 'MemberDetails', params: { id: member.id } }"
                          class="text-sm font-medium text-blue-600 hover:underline"
                        >
                          {{ member.name }}
                        </router-link>
                      </div>
                      <div class="text-sm text-gray-500">{{ member.position }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatPhoneNumber(member.phone) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full" 
                    :class="positionClass(member.position)"
                  >
                    {{ member.position }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="relative inline-block text-left">
                    <button 
                      @click.stop="toggleDropdown(member.id)"
                      class="inline-flex justify-center w-8 h-8 rounded-full hover:bg-gray-100 focus:outline-none"
                    >
                      <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    
                    <div 
                      v-if="activeDropdown === member.id"
                      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                    >
                      <div class="py-1">
                        <a 
                          href="#" 
                          @click.stop="editMember(member)"
                          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <svg class="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </a>
                        <a 
                          href="#" 
                          @click.stop="confirmDelete(member)"
                          class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-800"
                        >
                          <svg class="mr-3 h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredMembers.length === 0 && members.length > 0">
                <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                  No members found matching your search criteria.
                </td>
              </tr>
              <tr v-if="members.length === 0 && !isLoading">
                <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                  No members found. Click "Add members" to get started.
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Member Dialog -->
    <GDialog v-model="dialogState" max-width="500">
      <div class="flex items-start justify-between p-4 border-b bg-[#2f855a] rounded-t dark:border-gray-600">
        <h3 class="H600 N900 text-white">
          {{ editMode ? "Edit party member" : "Add party member" }}
        </h3>
        <button type="button" @click="closeDialog"
          class="inline-flex items-center ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
          <img src="../../assets/cancel.svg" alt="close-circle-icon" />
        </button>
      </div>
    
      <form @submit.prevent="editMode ? updateMember() : addMember()">   
        <div class="px-4 mt-5">
          <InputField 
            type="text" 
            id="name" 
            label="Enter name" 
            :requireTag="true" 
            placeholder="Enter name"
            :maxlength="50" 
            :showlength="false" 
            v-model="currentMember.name" 
          />
        </div>
        <div class="px-4 mt-5">
          <InputField 
            type="tel" 
            id="phone" 
            label="Phone number" 
            :requireTag="true" 
            placeholder="Enter phone number"
            :maxlength="15" 
            :showlength="false" 
            v-model="currentMember.phone" 
          />
        </div>
        <div class="px-4 mt-5">
          <InputField 
            type="text" 
            id="idNumber" 
            label="Enter party ID number" 
            :requireTag="true" 
            placeholder="Enter ID number"
            :maxlength="20" 
            :showlength="false" 
            v-model="currentMember.idNumber" 
          />
        </div>
        <div class="px-4 mt-5">
          <div>
            <div class="flex justify-between">
              <label for="position" class="block mb-2 my-1 pt-0.5 P250 N800 dark:text-grey-300">Select position</label>
              <span class="requiredSpan text-[#DD5928] text-xs px-1.5 py-1.5mb-1.5 my-2 rounded-lg dark:text-grey-900">Required</span>
            </div>
            <select 
              id="position"
              v-model="currentMember.position"
              class="w-full bg-gray-50 border border-[#d8dae5] hover:border-[#1de383] text-gray-900 rounded-lg focus:outline-[#2f855a] focus:ring-[#1de383] focus:ring peer block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#F2BEAB] dark:focus:border[#d8dae5] p-2"
            >
              <option disabled :selected="!currentMember.position" value="">Select position</option>
              <option 
                v-for="position in allPositions" 
                :key="position.id" 
                :value="position.title"
              >
                {{ position.title }}
              </option>
            </select>
          </div> 
        </div>
        <div class="px-4 mt-5">
          <InputField 
            type="text" 
            id="description"  
            label="Description" 
            :requireTag="false" 
            placeholder="Enter description"
            :maxlength="100" 
            :showlength="false" 
            v-model="currentMember.description" 
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
            class="ml-4 text-white btn-shadow P200 bg-[#2f855a] hover:bg-[#58b787] rounded-lg px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#1de383] disabled:opacity-25 disabled:cursor-not-allowed flex"
            :disabled="loading"
          >  
            <div v-if="loading" role="status">
              <svg viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-[#DD5928]">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor" />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill" />
              </svg>
              <span class="sr-only">Loading...</span>
              &nbsp;
            </div>
            {{ editMode ? 'Update' : 'Save' }}
          </button>
        </div>
      </form>
    </GDialog> 

    <!-- Delete Confirmation Dialog -->
    <GDialog v-model="deleteDialogState" max-width="500">
      <div class="bg-white rounded-lg overflow-hidden shadow-xl">
        <div class="p-6">
          <div class="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mx-auto">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Delete Member
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Are you sure you want to delete {{ memberToDelete?.name }}? This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            @click="deleteMember"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Delete
          </button>
          <button
            type="button"
            @click="deleteDialogState = false"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </GDialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import HeaderComponent from '../../components/HeaderComponent.vue';
import InputField from '../../components/InputField.vue';
import { GDialog } from 'gitart-vue-dialog';

// State management
const members = ref([]);
const allPositions = ref([]);
const dialogState = ref(false);
const deleteDialogState = ref(false);
const activeDropdown = ref(null);
const editMode = ref(false);
const loading = ref(false);
const isLoading = ref(true);
const showSuccess = ref(false);
const showError = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const memberToDelete = ref(null);
const nameSearch = ref('');
const positionSearch = ref('');

// Current member being edited/added
const currentMember = ref({
  id: null,
  name: '',
  phone: '',
  idNumber: '',
  position: '',
  description: '',
  poll_Station: 'Sailors'
});

// Computed properties
const uniquePositions = computed(() => {
  const positions = new Set();
  members.value.forEach(member => {
    if (member.position) {
      positions.add(member.position);
    }
  });
  return Array.from(positions).sort();
});

const filteredMembers = computed(() => {
  if (!members.value || members.value.length === 0) return [];
  
  return members.value.filter(member => {
    const matchesName = member.name.toLowerCase().includes(nameSearch.value.toLowerCase());
    const matchesPosition = positionSearch.value === '' || member.position === positionSearch.value;
    return matchesName && matchesPosition;
  });
});

// Initialize with sample data or from localStorage
onMounted(async () => {
  try {
    const savedMembers = localStorage.getItem('partyMembers');
    members.value = savedMembers ? JSON.parse(savedMembers).filter(m => m.poll_Station === 'Sailors') : [];
    
    const savedPositions = localStorage.getItem('positions');
    allPositions.value = savedPositions ? JSON.parse(savedPositions) : [];
  } catch (error) {
    console.error('Error loading data:', error);
    showNotification('Failed to load members data', false);
  } finally {
    isLoading.value = false;
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative.inline-block.text-left')) {
      activeDropdown.value = null;
    }
  });
});

// Utility functions
const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
};

const positionClass = (position) => {
  switch(position) {
    case 'Chairman': return 'bg-green-100 text-green-800';
    case 'Secretary': return 'bg-blue-100 text-blue-800';
    case 'Treasure': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const saveToLocalStorage = () => {
  // Get all existing members from localStorage
  const existingMembers = JSON.parse(localStorage.getItem('partyMembers')) || [];
  
  // Filter out members from the same poll station
  const otherMembers = existingMembers.filter(m => m.poll_Station !== 'Sailors');
  
  // Combine with current members
  const allMembers = [...otherMembers, ...members.value];
  
  // Save back to localStorage
  localStorage.setItem('partyMembers', JSON.stringify(allMembers));
};

const showNotification = (message, isSuccess = true) => {
  if (isSuccess) {
    successMessage.value = message;
    showSuccess.value = true;
    setTimeout(() => showSuccess.value = false, 3000);
  } else {
    errorMessage.value = message;
    showError.value = true;
    setTimeout(() => showError.value = false, 3000);
  }
};

// Dialog functions
const openAddDialog = () => {
  currentMember.value = {
    id: null,
    name: '',
    phone: '',
    idNumber: '',
    position: '',
    description: '',
    poll_Station: 'Sailors'
  };
  editMode.value = false;
  dialogState.value = true;
};

const closeDialog = () => {
  dialogState.value = false;
};

const toggleDropdown = (memberId) => {
  activeDropdown.value = activeDropdown.value === memberId ? null : memberId;
};

// Member CRUD operations
const editMember = (member) => {
  currentMember.value = { ...member };
  editMode.value = true;
  dialogState.value = true;
  activeDropdown.value = null;
};

const addMember = () => {
  loading.value = true;
  try {
    setTimeout(() => {
      if (!currentMember.value.name || !currentMember.value.phone || !currentMember.value.position) {
        throw new Error('Please fill all required fields');
      }
      
      const newMember = {
        ...currentMember.value,
        id: Date.now() // Generate unique ID
      };
      members.value.unshift(newMember);
      saveToLocalStorage();
      loading.value = false;
      dialogState.value = false;
      showNotification('Member added successfully!');
    }, 1000);
  } catch (error) {
    loading.value = false;
    showNotification(error.message, false);
  }
};

const updateMember = () => {
  loading.value = true;
  try {
    setTimeout(() => {
      if (!currentMember.value.name || !currentMember.value.phone || !currentMember.value.position) {
        throw new Error('Please fill all required fields');
      }
      
      const index = members.value.findIndex(m => m.id === currentMember.value.id);
      if (index !== -1) {
        members.value[index] = { ...currentMember.value };
        saveToLocalStorage();
        showNotification('Member updated successfully!');
      } else {
        throw new Error('Member not found');
      }
      loading.value = false;
      dialogState.value = false;
    }, 1000);
  } catch (error) {
    loading.value = false;
    showNotification(error.message, false);
  }
};

const confirmDelete = (member) => {
  memberToDelete.value = member;
  deleteDialogState.value = true;
  activeDropdown.value = null;
};

const deleteMember = () => {
  try {
    if (!memberToDelete.value) {
      throw new Error('No member selected for deletion');
    }
    
    members.value = members.value.filter(m => m.id !== memberToDelete.value.id);
    saveToLocalStorage();
    deleteDialogState.value = false;
    showNotification('Member deleted successfully!');
    memberToDelete.value = null;
  } catch (error) {
    showNotification(error.message, false);
  }
};
</script>

<style scoped>
/* Table styling */
table {
  border-collapse: separate;
  border-spacing: 0;
}

th {
  position: sticky;
  top: 0;
}

tbody tr:last-child td {
  border-bottom: none;
}

/* Hover effects */
tbody tr {
  transition: all 0.2s ease;
}

tbody tr:hover {
  @apply shadow-md;
}

/* Success notification animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Dropdown styling */
.dropdown-content {
  animation: fadeIn 0.2s ease-out;
}

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

/* Thank You Banner Styles */
.thank-you-banner {
  @apply relative bg-gradient-to-r from-[#046A38] to-[#E40521] text-white py-2 rounded-t-xl shadow-lg overflow-hidden ;
  background-image: linear-gradient(135deg, #046A38 0%, #E40521 100%);
}

.thank-you-text {
  @apply text-center text-4xl md:text-5xl font-bold mb-4;
  font-family: 'Playfair Display', serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  background: linear-gradient(to right, #ffffff, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  padding: 0.5rem 0;
}

.thank-you-decoration {
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20;
  z-index: 1;
}

.thank-you-decoration svg {
  @apply w-20 h-20;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.5));
}

/* Search input styling */
.search-container {
  transition: all 0.3s ease;
}

.search-input:focus {
  box-shadow: 0 0 0 3px rgba(47, 133, 90, 0.2);
  border-color: #2f855a;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .search-inputs {
    grid-template-columns: 1fr;
  }
}

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
</style>