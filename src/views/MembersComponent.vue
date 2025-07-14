<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden mt-4">
    <!-- Header Section -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div>
          <h2 class="text-xl font-bold text-gray-800 gap-4">
            All Members 
            <span class="text-green-600">({{ members.length }})</span>
            <span v-if="selectedWard" class="text-xl font-bold text-gray-800">{{ selectedWard}}Members:<span class="text-green-600">({{ wardMemberCount }})</span>   
              Number of stations<span class="text-green-600">({{ wardStationCount}})</span> </span>
            <span v-if="selectedStation" class="text-purple-600 ml-2">Station: <span class="text-green-600"></span>{{ stationMemberCount }} members</span>
          </h2>
          <p class="text-xs text-gray-500">Manage your party members</p>
        </div>
        
        <div class="flex items-center gap-2">
          <div class="relative w-full sm:w-56">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              class="block w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
              placeholder="Search members..."
            />
          </div>
          <button 
            @click="toggleFilters"
            class="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Filter Row - Collapsible -->
      <div v-if="showFilters" class="grid grid-cols-1 md:grid-cols-5 gap-3 mt-3">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
          <select v-model="selectedStatus" class="w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500">
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Deceased">Deceased</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Region</label>
          <select v-model="selectedRegion" class="w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500">
            <option value="">All Regions</option>
            <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Constituency</label>
          <select v-model="selectedConstituency" class="w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500">
            <option value="">All Constituencies</option>
            <option v-for="constituency in filteredConstituencies" :key="constituency" :value="constituency">{{ constituency }}</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Ward</label>
          <select v-model="selectedWard" class="w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500">
            <option value="">All Wards</option>
            <option v-for="ward in filteredWards" :key="ward" :value="ward">{{ ward }}</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Polling Station</label>
          <div class="relative">
            <select 
              v-model="selectedStation"
              class="w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Stations ({{ filteredStationsForFilter.length }})</option>
              <option 
                v-for="station in filteredStationsForFilter" 
                :key="station.id" 
                :value="station.polling_station"
              >
                {{ station.polling_station }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex space-x-2 mt-4">
        <button @click="openAddMemberModal" class="px-3 py-1.5 text-sm border border-transparent rounded-md shadow-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Add Member
        </button>
        <button @click="openAssignLeadershipModal" class="px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Assign Leadership
        </button>
      </div>
    </div>
    
    <!-- Members Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party/Voter's ID</th>
            <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name/Phone-N</th>
            <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ward</th>
            <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Station</th>
            <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
            <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="member in paginatedMembers" :key="member.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-4 py-2">
              <div class="text-xs font-medium text-gray-900">{{ member.partyId || 'N/A' }}</div>
              <div class="text-xs text-gray-500">{{ member.voterId || 'N/A' }}</div>
            </td>
            <td class="px-4 py-2">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-gray-100 rounded-full">
                  <UsersIcon class="h-4 w-4 text-gray-500" />
                </div>
                <div class="ml-3">
                  <div class="text-xs font-medium text-gray-900">{{ member.name }}</div>
                  <div class="text-xs text-gray-500">{{ member.phone || 'N/A' }}</div>
                </div>
              </div>
            </td>
            <td class="px-4 py-2 text-xs text-gray-500">
              <div class="flex items-center">
                <LocationMarkerIcon class="h-3 w-3 mr-1 text-gray-400" />
                {{ member.ward || 'N/A' }}
              </div>
            </td>
            <td class="px-4 py-2 text-xs text-gray-500">{{ member.poll_Station || 'N/A' }}</td>
            <td class="px-4 py-2">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                    :class="positionClasses(member.position)">
                {{ member.position || 'N/A' }}
              </span>
            </td>
            <td class="px-4 py-2">
              <span :class="statusClasses(member.status)">
              <select 
                v-model="member.status"
                @change="updateMemberStatus(member)"
                class="text-xs border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
              >
                <option class="text-green-600" value="Active">Active</option>
                <option class="text-yellow-600" value="Inactive">Inactive</option>
                <option class="text-red-800" value="Deceased">Deceased</option>
              </select>
              </span>
            </td>
            <td class="px-4 py-2 text-right text-xs font-medium">
              <button @click="editMember(member)" class="text-green-600 hover:text-green-900 mr-2">Edit</button>
              <button @click="confirmDelete(member.id)" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Pagination Controls -->
    <div class="p-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center bg-gray-50">
      <div class="text-xs text-gray-500 mb-2 sm:mb-0">
        Showing <span class="font-medium">{{ showingStart }}</span> to <span class="font-medium">{{ showingEnd }}</span> of <span class="font-medium">{{ filteredMembers.length }}</span> members
      </div>
      
      <div class="flex items-center space-x-1">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-2.5 py-1 rounded-md border border-gray-300 text-xs font-medium"
          :class="{'bg-gray-100 cursor-not-allowed text-gray-400': currentPage === 1, 'hover:bg-gray-50': currentPage > 1}"
        >
          Previous
        </button>
        
        <template v-for="page in visiblePages" :key="page">
          <button
            @click="goToPage(page)"
            class="w-7 h-7 rounded-md text-xs font-medium"
            :class="{'bg-green-600 text-white': currentPage === page, 'hover:bg-gray-100': currentPage !== page}"
          >
            {{ page }}
          </button>
        </template>
        
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-2.5 py-1 rounded-md border border-gray-300 text-xs font-medium"
          :class="{'bg-gray-100 cursor-not-allowed text-gray-400': currentPage === totalPages, 'hover:bg-gray-50': currentPage < totalPages}"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Add/Edit Member Dialog -->
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
          <!-- Name Field -->
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
          
          <!-- Position and Party ID Row -->
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
          
          <!-- Phone Number -->
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
          
          <!-- Gender and Position Row -->
          <div class="grid grid-cols-2 gap-5">
            <!-- Gender Select -->
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
            
            <!-- Position Select -->
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
          
          <!-- File Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
            <input 
              type="file" 
              @change="handleFileUpload" 
              class="w-full p-2 border border-gray-200 rounded-lg hover:border-green-400 focus:ring-green-500 focus:border-green-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              placeholder="Upload member's profile photo"
            />
          </div>
          
          <!-- Location Selectors -->
          <div class="grid grid-cols-3 gap-4">
            <!-- Region -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Select Region</label>
              <select 
                v-model="currentMember.region"
                class="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Region</option>
                <option v-for="region in regions" :key="region" :value="region">
                  {{ region }}
                </option>
              </select>
            </div>
            
            <!-- Constituency -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Select Constituency</label>
              <select 
                v-model="currentMember.constituency"
                class="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Constituency</option>
                <option v-for="constituency in filteredConstituencies" :key="constituency" :value="constituency">
                  {{ constituency }}
                </option>
              </select>
            </div>
            
            <!-- Ward -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Select Ward</label>
              <select 
                v-model="currentMember.ward"
                class="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Ward</option>
                <option v-for="ward in wards" :key="ward.id" :value="ward.name">
                  {{ ward.name }}
                </option>
              </select>
            </div>
            
            <!-- Station -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Select Station</label>
              <div class="relative">
                <select 
                  v-model="currentMember.poll_Station"
                  class="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">Select Station</option>
                  <option 
                    v-for="station in filteredStationsForForm" 
                    :key="station.id" 
                    :value="station.polling_station"
                  >
                    {{ station.polling_station }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Submit Button -->
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

    <!-- Delete Confirmation Dialog -->
    <GDialog v-model="deleteDialogState" max-width="400">
      <div class="bg-white rounded-xl shadow w-full p-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Confirm Deletion</h3>
          <p class="text-gray-600 mb-6">Are you sure you want to delete this member? This action cannot be undone.</p>
          <div class="flex justify-center space-x-4">
            <button 
              @click="deleteDialogState = false"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button 
              @click="removeMember"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </GDialog>
  </div>
</template>

<script setup>
import { GDialog } from 'gitart-vue-dialog';
import InputField from '../components/InputField.vue';
import { ref, computed, onMounted, watch } from 'vue';
import { 
  MapPinIcon as LocationMarkerIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline';

// Constants
const STORAGE_KEY = 'partyMembers';
const POLLING_STATIONS_KEY = 'pollingStationsApp';

// Reactive state
const searchQuery = ref('');
const selectedStatus = ref('');
const selectedRegion = ref('');
const selectedConstituency = ref('');
const selectedWard = ref('');
const selectedStation = ref('');
const dialogState = ref(false);
const deleteDialogState = ref(false);
const editMode = ref(false);
const memberToDelete = ref(null);
const pollingStations = ref([]);
const members = ref([]);
const showFilters = ref(true);
// Pagination state
const currentPage = ref(1);
const itemsPerPage = ref(6);
const maxVisiblePages = ref(7);

// Current member data
const currentMember = ref({
  id: null,
  name: '',
  gender: '',
  phone: '',
  partyId: '',
  voterId: '',
  position: '',
  poll_Station: '',
  region: '',
  constituency: '',
  ward: '',
  status: 'Active',
  avatar: 'https://via.placeholder.com/150',
});

// Data
const regions = ['Western Region'];
const constituencies = ['Takoradi Constituency', 'Sekondi Constituency'];
const wards = [
  { id: 1, name: 'NEW TAKORADI UPPER' },
  { id: 2, name: 'NEW TAKORADI LOWER' },
  { id: 3, name: 'CASSAVA FARM WARD' },
  { id: 4, name: 'AMANFUL EAST' },
  { id: 5, name: 'AMANFUL WEST' },
  { id: 6, name: 'OLD ADRA' },
  { id: 7, name: 'ESSIKAFO AMBANTEN NO.1' },
  { id: 8, name: 'ESSIKAFO AMBANTEM NO.2' },
  { id: 9, name: 'PRESBY AREA' },
  { id: 10, name: 'ZENITH AREA' },
  { id: 11, name: 'RAILWAYS AND HABOUR' },
  { id: 12, name: 'CHAPEL HILL' },
  { id: 13, name: 'BEACH ROAD' },
  { id: 14, name: 'AIRFORCE/ADAKOPE' },
  { id: 15, name: 'AIRPORT RIDGE' },
];
const allPositions = [
  { id: 1, name: 'Chairman' },
  { id: 2, name: 'Secretary' },
  { id: 3, name: 'Organizer' },
  { id: 4, name: 'Treasurer' },
  { id: 5, name: 'W/Organizer' },
  { id: 6, name: 'Y/Organizer' },
  { id: 7, name: 'Comm.Officer' },
  { id: 8, name: 'Exec.Member' },
];

// Text normalization utility
const normalizeText = (text) => {
  if (!text) return '';
  return text.toString().trim().toUpperCase();
};

// Enhanced data loading with normalization
const loadPollingStations = () => {
  const savedStations = localStorage.getItem(POLLING_STATIONS_KEY);
  
  if (savedStations) {
    pollingStations.value = JSON.parse(savedStations).map(station => ({
      ...station,
      ward: normalizeText(station.ward),
      polling_station: normalizeText(station.polling_station || station.name)
    }));
  } else {
    // Initialize with default stations including BEACH ROAD
    pollingStations.value = [
      {
        id: 29,
        name: "Service 2 Primary",
        ward: "BEACH ROAD",
        memberCount: 0,
        constituencyId: 1
      },
      {
        id: 30, 
        name: "MTN Office",
        ward: "BEACH ROAD",
        memberCount: 1,
        constituencyId: 1
      },
      // Add other default stations as needed
    ];
  }
};

// Computed properties
const filteredConstituencies = computed(() => {
  if (!selectedRegion.value) return constituencies;
  return constituencies;
});

const filteredWards = computed(() => {
  if (!selectedConstituency.value) return wards.map(w => w.name);
  return wards.map(w => w.name);
});

const filteredStationsForFilter = computed(() => {
  if (!selectedWard.value) return pollingStations.value;
  
  const normalizedWard = normalizeText(selectedWard.value);
  return pollingStations.value.filter(station => 
    normalizeText(station.ward) === normalizedWard
  );
});

const filteredStationsForForm = computed(() => {
  let results = pollingStations.value;
  
  if (currentMember.value.ward) {
    const normalizedWard = normalizeText(currentMember.value.ward);
    results = results.filter(station => 
      normalizeText(station.ward) === normalizedWard
    );
  }
  
  return results;
});

const filteredMembers = computed(() => {
  let result = members.value;
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(member => 
      member.name.toLowerCase().includes(query) || 
      (member.partyId && member.partyId.toLowerCase().includes(query)) ||
      (member.phone && member.phone.toLowerCase().includes(query))
    );
  }
  
  if (selectedStatus.value) {
    result = result.filter(member => member.status === selectedStatus.value);
  }
  
  if (selectedRegion.value) {
    result = result.filter(member => 
      normalizeText(member.region) === normalizeText(selectedRegion.value)
    );
  }
  
  if (selectedConstituency.value) {
    result = result.filter(member => 
      normalizeText(member.constituency) === normalizeText(selectedConstituency.value)
    );
  }
  
  if (selectedWard.value) {
    const normalizedWard = normalizeText(selectedWard.value);
    result = result.filter(member => 
      normalizeText(member.ward) === normalizedWard
    );
  }
  
  if (selectedStation.value) {
    const normalizedStation = normalizeText(selectedStation.value);
    result = result.filter(member => 
      normalizeText(member.poll_Station) === normalizedStation
    );
  }
  
  return result;
});

// Count computed properties
const wardMemberCount = computed(() => {
  if (!selectedWard.value) return 0;
  const normalizedWard = normalizeText(selectedWard.value);
  return members.value.filter(m => 
    normalizeText(m.ward) === normalizedWard
  ).length;
});

const wardStationCount = computed(() => {
  if (!selectedWard.value) return 0;
  const normalizedWard = normalizeText(selectedWard.value);
  return pollingStations.value.filter(
    station => normalizeText(station.ward) === normalizedWard
  ).length;
});

const stationMemberCount = computed(() => {
  if (!selectedStation.value) return 0;
  const normalizedStation = normalizeText(selectedStation.value);
  return members.value.filter(m => 
    normalizeText(m.poll_Station) === normalizedStation
  ).length;
});

// Pagination computed properties
const totalPages = computed(() => Math.ceil(filteredMembers.value.length / itemsPerPage.value));

const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredMembers.value.slice(start, end);
});

const showingStart = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const showingEnd = computed(() => {
  const end = currentPage.value * itemsPerPage.value;
  return end > filteredMembers.value.length ? filteredMembers.value.length : end;
});

const visiblePages = computed(() => {
  const range = [];
  const half = Math.floor(maxVisiblePages.value / 2);
  let start = currentPage.value - half;
  let end = currentPage.value + half;

  if (start < 1) {
    start = 1;
    end = Math.min(maxVisiblePages.value, totalPages.value);
  }

  if (end > totalPages.value) {
    end = totalPages.value;
    start = Math.max(1, end - maxVisiblePages.value + 1);
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
});

// Methods
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const openAddMemberModal = () => {
  currentMember.value = {
    id: null,
    name: '',
    gender: '',
    phone: '',
    partyId: '',
    voterId: '',
    position: '',
    poll_Station: '',
    region: '',
    constituency: '',
    ward: '',
    status: 'Active',
    avatar: 'https://via.placeholder.com/150',
  };
  editMode.value = false;
  dialogState.value = true;
};

const editMember = (member) => {
  currentMember.value = { ...member };
  editMode.value = true;
  dialogState.value = true;
};

const confirmDelete = (id) => {
  memberToDelete.value = id;
  deleteDialogState.value = true;
};

const removeMember = () => {
  members.value = members.value.filter(member => member.id !== memberToDelete.value);
  saveMembers();
  deleteDialogState.value = false;
  showNotification('Member deleted successfully', true);
};

const updateMemberStatus = (member) => {
  const index = members.value.findIndex(m => m.id === member.id);
  if (index !== -1) {
    members.value[index].status = member.status;
    saveMembers();
  }
};

const submitForm = () => {
  // Normalize form data before saving
  currentMember.value.ward = normalizeText(currentMember.value.ward);
  currentMember.value.poll_Station = normalizeText(currentMember.value.poll_Station);

  if (editMode.value) {
    const index = members.value.findIndex(m => m.id === currentMember.value.id);
    if (index !== -1) {
      members.value[index] = { ...currentMember.value };
    }
  } else {
    currentMember.value.id = Date.now().toString();
    members.value.push({ ...currentMember.value });
  }
  
  saveMembers();
  dialogState.value = false;
  showNotification(`Member ${editMode.value ? 'updated' : 'added'} successfully`, true);
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      currentMember.value.avatar = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const closeDialog = () => {
  dialogState.value = false;
};

const positionClasses = (position) => {
  const baseClasses = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
  
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
  
  return `${baseClasses} ${positionColors[position] || 'bg-gray-100 text-gray-800'}`;
};
const statusClasses = (status) => {
  const baseClasses = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
  
  const statusColors = {
    'Deceased': ' text-red-800',
    'Active': 'text-green-800',
    'Inactive': 'text-yellow-600',
   
  };
  
  return `${baseClasses} ${statusColors[status] || 'bg-gray-100 text-gray-800'}`;
};


const openAssignLeadershipModal = () => {
  console.log('Opening assign leadership modal');
};

const saveMembers = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members.value));
};

const showNotification = (message, isSuccess) => {
  console.log(message);
  alert(message);
};

// Pagination methods
const goToPage = (page) => {
  currentPage.value = page;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Watch for filter changes and reset to first page
watch([
  searchQuery, 
  selectedStatus,
  selectedRegion, 
  selectedConstituency, 
  selectedWard, 
  selectedStation
], () => {
  currentPage.value = 1;
});

// Watch ward changes in member form to update stations
watch(() => currentMember.value.ward, () => {
  currentMember.value.poll_Station = '';
});

// Initialize component with data normalization
onMounted(() => {
  const savedMembers = localStorage.getItem(STORAGE_KEY);
  if (savedMembers) {
    members.value = JSON.parse(savedMembers).map(member => ({
      ...member,
      ward: normalizeText(member.ward),
      poll_Station: normalizeText(member.poll_Station),
      constituency: normalizeText(member.constituency),
      region: normalizeText(member.region)
    }));
  }
  
  loadPollingStations();
  
  // Debug logs
  console.log("Norma", members.value);

});
</script>

<style scoped>
/* Tighten up table row spacing */
table {
  border-spacing: 0 2px;
  border-collapse: separate;
}

/* Compact select dropdown */
select {
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  font-size: 0.75rem;
  line-height: 1rem;
}
</style>