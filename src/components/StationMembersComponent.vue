<template>
  <div class="container mx-auto px-4 py-6">

      <div class="thank-you-banner ">
      <div class="thank-you-text">
      <h1 class="text-4xl font-bold text-white font-serif mb-2">{{ stationName }} Station Members({{ members.length }})</h1>
      </div>
      <div class="thank-you-decoration">
        <svg class="w-24 h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
          <path d="M7 13L10 16L17 9" stroke="#046A38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
          </div>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search by name..." 
            class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <div class="relative">
            <select 
              v-model="genderFilter"
              class="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <ChevronDownIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div class="relative">
            <select 
              v-model="positionFilter"
              class="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Positions</option>
              <option value="Chairman">Chairman</option>
              <option value="Secretary">Secretary</option>
              <option value="Organizer">Organizer</option>
              <option value="Treasurer">Treasurer</option>
              <option value="W/Organizer">W/Organizer</option>
              <option value="Y/Organizer">Y/Organizer</option>
              <option value="Comm.Officer">Comm.Officer</option>
              <option value="Exec.Member">Exec.Member</option>
            </select>
            <ChevronDownIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div class="relative">
            <select 
              v-model="statusFilter"
              class="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Deceased">Deceased</option>
            </select>
            <ChevronDownIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <button @click="openAddMemberModal"
          class="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Create Member
        </button>
      </div>

      <div class="mt-3 text-sm text-gray-600">
        Showing {{ filteredMembers.length }} of {{ members.length }} members
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Voter's ID</th>
              <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Party ID</th>
              <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="member in filteredMembers" :key="member.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="text-sm text-gray-500">{{ member.voterId || 'N/A' }}</div>
              </td>

              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ member.partyId || 'N/A' }}</div>
              </td>

              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full">
                    <UsersIcon class="h-5 w-5 text-gray-500" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ member.name }}</div>
                  </div>
                </div>
              </td>

              <td class="px-6 py-4">
                <div class="flex items-center">
                  <UserIcon 
                    class="h-4 w-4 mr-2" 
                    :class="member.gender === 'Female' ? 'text-pink-500' : 'text-blue-500'" 
                  />
                  <span class="text-sm text-gray-500">{{ member.gender || 'N/A' }}</span>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <div class="flex items-center text-sm text-gray-500">
                  <PhoneIcon class="h-4 w-4 mr-2 text-gray-400" />
                  0{{ member.phone || 'N/A' }}
                </div>
              </td>
              
              <td class="px-6 py-4">
                <span class="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full" 
                       :class="positionClasses(member.position)">
                  {{ member.position || 'N/A' }}
                </span>
              </td>
              
              <td class="px-6 py-4">
                <select 
                  v-model="member.status"
                  class="text-sm border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-1"
                  :class="statusColor(member.status)"
                >
                  <option value="Active" class="text-green-600">Active</option>
                  <option value="Inactive" class="text-yellow-600">Inactive</option>
                  <option value="Deceased" class="text-red-800">Deceased</option>
                </select>
              </td>
               <td class="px-6 py-4 text-right text-sm font-medium">
                  <button @click="editMember(member)" class="text-green-600 hover:text-green-900 mr-2">Edit</button>
                  <button @click="confirmDelete(member.id)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <GDialog v-model="dialogState" max-width="600">
      <div class="bg-white rounded-xl shadow w-full">
        <div class="flex items-center justify-between p-4 border-b bg-[#2f855a] rounded-t-lg">
          <h3 class="text-lg font-semibold text-white">
            {{ editMode ? "Edit party member" : "Add party member" }}
          </h3>
          <button 
            type="button" 
            @click="closeDialog"
            class="p-1 rounded-full hover:bg-green-800 transition-colors"
          >
            <img src="../assets/cancel.svg" alt="close-icon" class="w-5 h-5" />
          </button>
        </div>
        
        <form @submit.prevent="submitForm" class="p-6 space-y-5">
          <div>
            <InputField 
              type="text" 
              id="name" 
              label="Enter name" 
              v-model="currentMember.name"
              :requireTag="true" 
              placeholder="Enter full name of party member"
              :maxlength="50" 
              :showlength="false" 
              class="w-full"
            />
          </div>
          
          <div class="grid grid-cols-2 gap-5">
            <div>
              <InputField 
                type="text" 
                id="VotersId" 
                label="Voters ID" 
                v-model="currentMember.voterId"
                :requireTag="false" 
                placeholder="Enter unique Voter identifier"
                :maxlength="50" 
                :showlength="false" 
                class="w-full"
              />
            </div>
            
            <div>
              <InputField 
                type="text" 
                id="partyId" 
                label="Party ID" 
                v-model="currentMember.partyId"
                :requireTag="false" 
                placeholder="Enter unique party identifier"
                :maxlength="50" 
                :showlength="false" 
                class="w-full"
              />
            </div>
          </div>
          
          <div>
            <InputField 
              type="tel" 
              id="phone" 
              label="Phone Number" 
              v-model="currentMember.phone"
              :requireTag="false" 
              placeholder="Enter Phone Number"
              :maxlength="15" 
              :showlength="false" 
              class="w-full"
            />
          </div>
          
          <div class="grid grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select 
                v-model="currentMember.gender"
                class="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Select Position</label>
              <select 
                v-model="currentMember.position"
                class="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Position</option>
                <option v-for="position in allPositions" :key="position.id" :value="position.name">
                  {{ position.name }}
                </option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
            <input 
              type="file" 
              @change="handleFileUpload" 
              class="w-full p-2 border border-gray-200 rounded-lg hover:border-green-400 focus:ring-green-500 focus:border-green-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              placeholder="Upload member's profile photo"
            />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <input 
                  type="text" 
                  v-model="currentMember.region" 
                  disabled
                  class="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Constituency</label>
              <input 
                  type="text" 
                  v-model="currentMember.constituency" 
                  disabled
                  class="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ward</label>
              <input 
                  type="text" 
                  v-model="currentMember.ward" 
                  disabled
                  class="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Polling Station</label>
              <input 
                  type="text" 
                  v-model="currentMember.poll_Station" 
                  disabled
                  class="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
          
          <div class="flex justify-end pt-4">
            <button 
              type="submit" 
              class="bg-green-700 hover:bg-green-800 text-white px-8 py-2.5 rounded-lg font-medium transition-colors"
            >
              {{ editMode ? "Update Member" : "Add Member" }}
            </button>
          </div>
        </form>
      </div>
    </GDialog>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { GDialog } from 'gitart-vue-dialog';
import InputField from '../components/InputField.vue';
import { 
  UsersIcon,
  UserIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  PlusIcon
} from '@heroicons/vue/24/outline';
import Swal from 'sweetalert2'

const route = useRoute()
const stationName = route.params.name
const stationId = route.params.id
const members = ref([])
const dialogState = ref(false)
const editMode = ref(false)
const currentMember = ref({
  id: null,
  name: '',
  voterId: '',
  partyId: '',
  phone: '',
  gender: '',
  position: '',
  region: '',
  constituency: '',
  ward: '',
  poll_Station: '',
  status: 'Active',
  photo: null,
})

// Filter states
const searchQuery = ref('')
const genderFilter = ref('')
const positionFilter = ref('')
const statusFilter = ref('')

// Dummy data for locations
const locations = [
  {
    id: 1, 
    region: 'Western Region', 
    constituency: 'Sekondi Constituency', 
    ward: 'NEW TAKORADI UPPER', 
    polling_station: 'Service 2 Primary'
  },
  {
    id: 2, 
    region: 'Western Region', 
    constituency: 'Sekondi Constituency', 
    ward: 'NEW TAKORADI UPPER', 
    polling_station: 'Service 1 Primary'
  },
  {
    id: 3, 
    region: 'Western Region', 
    constituency: 'Takoradi Constituency', 
    ward: 'AMANFUL EAST', 
    polling_station: 'Takoradi Library'
  },
  {
    id: 4, 
    region: 'Western Region', 
    constituency: 'Takoradi Constituency', 
    ward: 'AMANFUL WEST', 
    polling_station: 'Market Square'
  },
]

const allPositions = [
  { id: 1, name: 'Chairman' },
  { id: 2, name: 'Secretary' },
  { id: 3, name: 'Organizer' },
  { id: 4, name: 'Treasurer' },
  { id: 5, name: 'W/Organizer' },
  { id: 6, name: 'Y/Organizer' },
  { id: 7, name: 'Comm.Officer' },
  { id: 8, name: 'Exec.Member' },
]

// --- Local Storage Functions ---
const loadMembers = () => {
  const allMembers = JSON.parse(localStorage.getItem('partyMembers') || '[]')
  members.value = allMembers.filter(member => 
    member.poll_Station?.toLowerCase().trim() === stationName.toLowerCase().trim()
  )
}

const saveMembers = () => {
  const allMembers = JSON.parse(localStorage.getItem('partyMembers') || '[]')
  // Remove existing members for this station
  const otherMembers = allMembers.filter(member =>
    member.poll_Station?.toLowerCase().trim() !== stationName.toLowerCase().trim()
  )
  // Add updated members for this station back
  localStorage.setItem('partyMembers', JSON.stringify([...otherMembers, ...members.value]))
}

// --- Component Lifecycle Hooks ---
onMounted(() => {
  loadMembers()
})

// --- Computed Properties ---
const filteredMembers = computed(() => {
  return members.value.filter(member => {
    const matchesSearch = member.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          member.voterId?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          member.partyId?.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesGender = !genderFilter.value || member.gender === genderFilter.value
    const matchesPosition = !positionFilter.value || member.position === positionFilter.value
    const matchesStatus = !statusFilter.value || member.status === statusFilter.value

    return matchesSearch && matchesGender && matchesPosition && matchesStatus
  })
})

const getStationDetails = () => {
  return locations.find(loc => loc.polling_station?.toLowerCase().trim() === stationName.toLowerCase().trim())
}

// --- Member Management Functions ---
const openAddMemberModal = () => {
  editMode.value = false
  // Reset form fields
  currentMember.value = {
    id: null,
    name: '',
    voterId: '',
    partyId: '',
    phone: '',
    gender: '',
    position: '',
    region: '',
    constituency: '',
    ward: '',
    poll_Station: '',
    status: 'Active',
    photo: null,
  }

  // Set default location values based on the current station
  const stationDetails = getStationDetails()
  if (stationDetails) {
      currentMember.value.region = stationDetails.region
      currentMember.value.constituency = stationDetails.constituency
      currentMember.value.ward = stationDetails.ward
      currentMember.value.poll_Station = stationDetails.polling_station
  }

  dialogState.value = true
}

const editMember = (member) => {
  editMode.value = true
  // Deep clone the member object to avoid direct mutation
  currentMember.value = { ...member }
  dialogState.value = true
}

const submitForm = () => {
  // Check if it's an edit or a new member
  if (editMode.value) {
    const index = members.value.findIndex(m => m.id === currentMember.value.id)
    if (index !== -1) {
      members.value[index] = { ...currentMember.value }
      Swal.fire('Updated!', 'Member details have been updated.', 'success')
    }
  } else {
    // Generate a unique ID for the new member
    const newId = Date.now()
    const newMember = { ...currentMember.value, id: newId }
    members.value.push(newMember)
    Swal.fire('Added!', 'New member has been added successfully.', 'success')
  }
  
  saveMembers()
  closeDialog()
}

const confirmDelete = (memberId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteMember(memberId)
      Swal.fire('Deleted!', 'The member has been deleted.', 'success')
    }
  })
}

const deleteMember = (memberId) => {
  members.value = members.value.filter(member => member.id !== memberId)
  saveMembers()
}

const closeDialog = () => {
  dialogState.value = false
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // You can handle file upload logic here, e.g., storing the file URL
    // For this example, we'll just store the file object.
    currentMember.value.photo = file
  }
}

// --- CSS Class Helpers ---
const positionClasses = (position) => {
  const positionColors = {
    'Chairman': 'bg-purple-100 text-purple-800',
    'Secretary': 'bg-blue-100 text-blue-800',
    'Organizer': 'bg-yellow-100 text-yellow-800',
    'Treasurer': 'bg-green-100 text-green-800',
    'W/Organizer': 'bg-pink-100 text-pink-800',
    'Y/Organizer': 'bg-indigo-100 text-indigo-800',
    'Comm.Officer': 'bg-teal-100 text-teal-800',
    'Exec.Member': 'bg-gray-100 text-gray-800'
  };
  
  return positionColors[position] || 'bg-gray-100 text-gray-800';
};

const statusColor = (status) => {
  const statusColors = {
    'Active': 'text-green-600 border-green-200 bg-green-50',
    'Inactive': 'text-yellow-600 border-yellow-200 bg-yellow-50',
    'Deceased': 'text-red-800 border-red-200 bg-red-50'
  };
  
  return statusColors[status] || 'text-gray-600 border-gray-200 bg-gray-50';
};
</script>

<style scoped>
/* Your existing styles */
/* Improved table styling */
table {
  border-spacing: 0 8px;
  border-collapse: separate;
}

th {
  font-weight: 600;
  letter-spacing: 0.5px;
}

td {
  padding-top: 1rem;
  padding-bottom: 1rem;
  vertical-align: middle;
}

/* Make select elements blend better */
select {
  background-image: none;
  padding-right: 2.5rem;
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
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
</style>