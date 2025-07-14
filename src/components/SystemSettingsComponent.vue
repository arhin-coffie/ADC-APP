<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 mt-16">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">System Settings</h1>
      
      <!-- Tab Navigation -->
      <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav class="flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'py-4 px-1 font-medium text-sm border-b-2',
              activeTab === tab.id
                ? 'border-green-500 text-green-600 dark:text-green-400 dark:border-green-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>
      
      <!-- Tab Content -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <!-- Account Settings -->
        <div v-if="activeTab === 'account'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Account Information</h2>
            <button @click="openEditAccountDialog" class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
              Edit
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Admin Name</label>
              <div class="text-gray-900 dark:text-white p-2 bg-gray-50 dark:bg-gray-700 rounded">{{ admin.name }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <div class="text-gray-900 dark:text-white p-2 bg-gray-50 dark:bg-gray-700 rounded">{{ admin.email }}</div>
            </div>
          </div>
          
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-4">Password</h3>
            <button @click="openChangePasswordDialog" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
              Change Password
            </button>
          </div>
        </div>
        
        <!-- System Configuration -->
        <div v-if="activeTab === 'system'" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white">System Preferences</h2>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 class="font-medium text-gray-800 dark:text-white">Member Approval</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Require approval before new members appear in the system</p>
              </div>
              <Toggle v-model="systemSettings.memberApproval" />
            </div>
            
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 class="font-medium text-gray-800 dark:text-white">Auto-generate Party IDs</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">System will generate unique IDs for new members</p>
              </div>
              <Toggle v-model="systemSettings.autoGenerateIds" />
            </div>
          </div>
        </div>
        
        <!-- Roles & Permissions -->
        <div v-if="activeTab === 'roles'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Roles & Permissions</h2>
            <button @click="openCreateRoleDialog" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
              Create New Role
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Members</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reports</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="role in roles" :key="role.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-medium text-gray-900 dark:text-white">{{ role.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ role.description }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-wrap gap-1">
                      <span v-if="role.permissions.includes('view_members')" class="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">View</span>
                      <span v-if="role.permissions.includes('add_members')" class="px-2 py-1 text-xs rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Add</span>
                      <span v-if="role.permissions.includes('delete_members')" class="px-2 py-1 text-xs rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Delete</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-wrap gap-1">
                      <span v-if="role.permissions.includes('access_reports')" class="px-2 py-1 text-xs rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Access</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button @click="editRole(role.id)" class="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 mr-3">Edit</button>
                    <button @click="deleteRole(role.id)" class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Backup & Restore -->
        <div v-if="activeTab === 'backup'" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Data Management</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 class="font-medium text-gray-800 dark:text-white mb-2">Export Data</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Download a copy of your system data</p>
              <div class="flex flex-wrap gap-3">
                <button @click="exportData('csv')" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
                  Export as CSV
                </button>
                <button @click="exportData('pdf')" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
                  Export as PDF
                </button>
              </div>
            </div>
            
            <div class="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 class="font-medium text-gray-800 dark:text-white mb-2">Import Data</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Restore from a previous backup</p>
              <input type="file" @change="handleFileUpload" class="hidden" id="file-upload" accept=".csv,.pdf">
              <label for="file-upload" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors cursor-pointer">
                Select File
              </label>
              <span v-if="selectedFile" class="ml-3 text-sm text-gray-500 dark:text-gray-400">{{ selectedFile.name }}</span>
            </div>
          </div>
        </div>
        
        <!-- Audit Logs -->
        <div v-if="activeTab === 'audit'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Audit Logs</h2>
            <div class="flex items-center space-x-3">
              <select v-model="auditFilters.action" class="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600">
                <option value="">All Actions</option>
                <option v-for="action in auditActions" :key="action" :value="action">{{ action }}</option>
              </select>
              <input v-model="auditFilters.date" type="date" class="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600">
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Timestamp</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="log in filteredAuditLogs" :key="log.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ formatDate(log.timestamp) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" :src="log.user.avatar" :alt="log.user.name">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">{{ log.user.name }}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">{{ log.user.role }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getActionClass(log.action)">
                      {{ log.action }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{{ log.details }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Appearance -->
        <div v-if="activeTab === 'appearance'" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Appearance</h2>
          
          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 class="font-medium text-gray-800 dark:text-white">Dark Mode</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark theme</p>
            </div>
            <Toggle v-model="darkMode" @change="toggleDarkMode" />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 class="font-medium text-gray-800 dark:text-white mb-2">Primary Color</h3>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="color in themeColors" 
                  :key="color" 
                  @click="setPrimaryColor(color)"
                  class="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  :class="[
                    `bg-${color}-500`,
                    primaryColor === color ? 'ring-2 ring-offset-2 ring-green-500' : ''
                  ]"
                  :title="color"
                ></button>
              </div>
            </div>
            
            <div class="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 class="font-medium text-gray-800 dark:text-white mb-2">Density</h3>
              <div class="flex flex-col space-y-3">
                <label class="inline-flex items-center">
                  <input type="radio" v-model="density" value="comfortable" class="form-radio h-4 w-4 text-green-600">
                  <span class="ml-2 text-gray-700 dark:text-gray-300">Comfortable</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="radio" v-model="density" value="compact" class="form-radio h-4 w-4 text-green-600">
                  <span class="ml-2 text-gray-700 dark:text-gray-300">Compact</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Edit Account Dialog -->
    <GDialog v-model="editAccountDialog" max-width="500">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Edit Account Information</h3>
          <button @click="editAccountDialog = false" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="saveAccountChanges" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Admin Name</label>
            <input v-model="editAccountForm.name" type="text" id="name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600">
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input v-model="editAccountForm.email" type="email" id="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600">
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button @click="editAccountDialog = false" type="button" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </GDialog>
    
    <!-- Change Password Dialog -->
    <GDialog v-model="changePasswordDialog" max-width="500">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Change Password</h3>
          <button @click="changePasswordDialog = false" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="updatePassword" class="space-y-4">
          <div>
            <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
            <input v-model="passwordForm.currentPassword" type="password" id="currentPassword" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600">
          </div>
          
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
            <input v-model="passwordForm.newPassword" type="password" id="newPassword" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600">
          </div>
          
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
            <input v-model="passwordForm.confirmPassword" type="password" id="confirmPassword" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600">
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button @click="changePasswordDialog = false" type="button" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </GDialog>
    
    <!-- Create Role Dialog -->
    <GDialog v-model="createRoleDialog" max-width="600">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ editingRole ? 'Edit Role' : 'Create New Role' }}</h3>
          <button @click="closeRoleDialog" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="saveRole" class="space-y-4">
          <div>
            <label for="roleName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Role Name</label>
            <input v-model="roleForm.name" type="text" id="roleName" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600">
          </div>
          
          <div>
            <label for="roleDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea v-model="roleForm.description" id="roleDescription" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600"></textarea>
          </div>
          
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Permissions</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <h5 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Members</h5>
                <label class="inline-flex items-center">
                  <input v-model="roleForm.permissions" type="checkbox" value="view_members" class="form-checkbox h-4 w-4 text-green-600">
                  <span class="ml-2 text-gray-700 dark:text-gray-300">View Members</span>
                </label>
                <label class="inline-flex items-center">
                  <input v-model="roleForm.permissions" type="checkbox" value="add_members" class="form-checkbox h-4 w-4 text-green-600">
                  <span class="ml-2 text-gray-700 dark:text-gray-300">Add Members</span>
                </label>
                <label class="inline-flex items-center">
                  <input v-model="roleForm.permissions" type="checkbox" value="delete_members" class="form-checkbox h-4 w-4 text-green-600">
                  <span class="ml-2 text-gray-700 dark:text-gray-300">Delete Members</span>
                </label>
              </div>
              
              <div class="space-y-2">
                <h5 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reports</h5>
                <label class="inline-flex items-center">
                  <input v-model="roleForm.permissions" type="checkbox" value="access_reports" class="form-checkbox h-4 w-4 text-green-600">
                  <span class="ml-2 text-gray-700 dark:text-gray-300">Access Reports</span>
                </label>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button @click="closeRoleDialog" type="button" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              {{ editingRole ? 'Update Role' : 'Create Role' }}
            </button>
          </div>
        </form>
      </div>
    </GDialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Toggle from '../components/ToggleComponent.vue'

// Tabs
const tabs = [
  { id: 'account', label: 'Account' },
  { id: 'system', label: 'System' },
  { id: 'roles', label: 'Roles' },
  { id: 'backup', label: 'Backup' },
  { id: 'audit', label: 'Audit Logs' },
  { id: 'appearance', label: 'Appearance' }
]
const activeTab = ref('account')

// Account Settings
const admin = ref({
  name: 'Admin User',
  email: 'admin@example.com'
})

const editAccountDialog = ref(false)
const editAccountForm = ref({
  name: '',
  email: ''
})

const changePasswordDialog = ref(false)
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// System Configuration
const systemSettings = ref({
  memberApproval: true,
  autoGenerateIds: false
})

// Roles & Permissions
const roles = ref([
  {
    id: 1,
    name: 'Regional Admin',
    description: 'Can manage members in assigned region',
    permissions: ['view_members', 'add_members', 'access_reports']
  },
  {
    id: 2,
    name: 'Constituency Organizer',
    description: 'Can manage members in assigned constituency',
    permissions: ['view_members', 'add_members']
  },
  {
    id: 3,
    name: 'Polling Station Agent',
    description: 'Can view members in assigned station',
    permissions: ['view_members']
  }
])

const createRoleDialog = ref(false)
const editingRole = ref(false)
const roleForm = ref({
  name: '',
  description: '',
  permissions: []
})

// Backup & Restore
const selectedFile = ref(null)

// Audit Logs
const auditLogs = ref([
  {
    id: 1,
    timestamp: '2023-05-15T10:30:00Z',
    user: {
      name: 'Admin User',
      role: 'System Admin',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    action: 'Member Added',
    details: 'Added new member: John Doe (PID-1001)'
  },
  {
    id: 2,
    timestamp: '2023-05-14T15:45:00Z',
    user: {
      name: 'Regional Admin',
      role: 'Regional Admin',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    action: 'Role Updated',
    details: 'Updated permissions for Constituency Organizer role'
  },
  {
    id: 3,
    timestamp: '2023-05-13T09:20:00Z',
    user: {
      name: 'System Admin',
      role: 'System Admin',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    action: 'System Setting Changed',
    details: 'Changed "Member Approval" setting to enabled'
  }
])

const auditFilters = ref({
  action: '',
  date: '',
  user: ''
})

const auditActions = ref(['Member Added', 'Member Updated', 'Member Deleted', 'Role Updated', 'System Setting Changed'])

// Appearance
const darkMode = ref(false)
const primaryColor = ref('green')
const density = ref('comfortable')
const themeColors = ref(['green', 'blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow'])

// Computed
const filteredAuditLogs = computed(() => {
  return auditLogs.value.filter(log => {
    const matchesAction = !auditFilters.value.action || log.action === auditFilters.value.action
    const matchesDate = !auditFilters.value.date || new Date(log.timestamp).toISOString().split('T')[0] === auditFilters.value.date
    return matchesAction && matchesDate
  })
})

// Methods
const openEditAccountDialog = () => {
  editAccountForm.value = { ...admin.value }
  editAccountDialog.value = true
}

const saveAccountChanges = () => {
  admin.value = { ...editAccountForm.value }
  editAccountDialog.value = false
}

const openChangePasswordDialog = () => {
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  changePasswordDialog.value = true
}

const updatePassword = () => {
  // Password update logic
  changePasswordDialog.value = false
}

const openCreateRoleDialog = () => {
  roleForm.value = {
    name: '',
    description: '',
    permissions: []
  }
  editingRole.value = false
  createRoleDialog.value = true
}

const editRole = (id) => {
  const role = roles.value.find(r => r.id === id)
  if (role) {
    roleForm.value = {
      name: role.name,
      description: role.description,
      permissions: [...role.permissions]
    }
    editingRole.value = true
    createRoleDialog.value = true
  }
}

const closeRoleDialog = () => {
  createRoleDialog.value = false
}

const saveRole = () => {
  if (editingRole.value) {
    // Update existing role
    const index = roles.value.findIndex(r => r.name === roleForm.value.name)
    if (index !== -1) {
      roles.value[index] = {
        ...roles.value[index],
        ...roleForm.value
      }
    }
  } else {
    // Add new role
    roles.value.push({
      id: roles.value.length + 1,
      ...roleForm.value
    })
  }
  createRoleDialog.value = false
}

const deleteRole = (id) => {
  roles.value = roles.value.filter(role => role.id !== id)
}

const exportData = (format) => {
  console.log(`Exporting data as ${format}`)
  // Export logic
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    // Handle file import logic
  }
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const getActionClass = (action) => {
  const actionClasses = {
    'Member Added': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Member Updated': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Member Deleted': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'Role Updated': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'System Setting Changed': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  }
  return actionClasses[action] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
}

const toggleDarkMode = () => {
  if (darkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const setPrimaryColor = (color) => {
  primaryColor.value = color
  // You would typically update CSS variables here
}

// Initialize
onMounted(() => {
  // Check for saved dark mode preference
  const savedDarkMode = localStorage.getItem('darkMode') === 'true'
  darkMode.value = savedDarkMode
  toggleDarkMode()
  
  // Check for saved primary color
  const savedColor = localStorage.getItem('primaryColor')
  if (savedColor && themeColors.value.includes(savedColor)) {
    primaryColor.value = savedColor
  }
})
</script>

<style>
/* Add any custom styles here */
</style>