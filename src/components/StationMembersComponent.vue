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

    <!-- Filters and Actions -->
    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <!-- Search Box -->
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

        <!-- Filter Controls -->
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

        <!-- Create Member Button -->
        <button 
          class="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Create Member
        </button>
      </div>

      <!-- Filter Count -->
      <div class="mt-3 text-sm text-gray-600">
        Showing {{ filteredMembers.length }} of {{ members.length }} members
      </div>
    </div>

    <!-- Members Table -->
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  MapPinIcon as LocationMarkerIcon,
  UsersIcon,
  UserIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  PlusIcon
} from '@heroicons/vue/24/outline';

const route = useRoute()
const stationName = route.params.name // e.g. "Service 2 Primary"
const wardName = "Sample Ward" // You can replace this with dynamic data
const members = ref([])

// Filter states
const searchQuery = ref('')
const genderFilter = ref('')
const positionFilter = ref('')
const statusFilter = ref('')

onMounted(() => {
  const allMembers = JSON.parse(localStorage.getItem('partyMembers') || '[]')

  // Only members assigned to this polling station
  members.value = allMembers.filter(member =>
    member.poll_Station?.toLowerCase().trim() === stationName.toLowerCase().trim()
  )
})

// Computed property for filtered members
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