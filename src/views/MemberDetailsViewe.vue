<template>
  <div class="bg-gray-100 mx-4 md:mx-32 md:p-6">
    <!-- Top Section -->
    <div class="mt-8 md:mt-16 bg-gradient-to-r from-ndc-red to-ndc-green rounded-t-xl overflow-hidden relative shadow-lg">
      <!-- Party Flag on the right -->
      <div class="absolute top-4 right-4 w-16 h-16 md:w-20 md:h-20">
        <img 
          src="https://theheraldghana.com/wp-content/uploads/2022/03/NDC.jpg" 
          alt="NDC Flag" 
          class="w-full h-full object-contain"
        />
      </div>

      <!-- Profile -->
      <div class="flex items-start p-4 md:p-6">
        <div class="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-md">
          <img v-if="member.avatar" :src="member.avatar" alt="Profile" class="w-full h-full rounded-full object-cover">
          <span v-else class="text-3xl md:text-4xl font-bold text-ndc-red">{{ memberInitials }}</span>
        </div>

        <div class="ml-4 md:ml-6">
          <div class="flex items-center">
            <h2 class="text-2xl md:text-3xl font-bold text-white">{{ member.name || 'Member Name Not Found' }}</h2>
            <div
              class="ml-3 flex items-center px-2 py-1 rounded-full"
              :class="isActiveMember ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
            >
              <span class="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    v-if="isActiveMember"
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                  <path
                    v-else
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span class="font-semibold text-sm">
                {{ isActiveMember ? 'Active Member' : 'Inactive Member' }}
              </span>
            </div>
          </div>
          <p class="text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            Current Position: <strong><span class="text-green-300">{{ currentPosition?.position || member.currentPosition || 'N/A' }}</span></strong>
          </p>
          <p class="text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
            Position Level: <strong>{{ currentPosition?.level || member.level || 'N/A' }}</strong>
          </p>
          <p class="text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            Constituency: <strong>{{ currentPosition?.location || member.location || 'N/A' }}</strong>
          </p>
          <p class="text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
            Party ID: <strong>{{ member.party_id || 'N/A' }}</strong>
          </p>
          <p class="text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Phone Number: <strong>0{{member.phone || 'N/A' }}</strong>
          </p>
          <p class="text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
            Meetings Attended:
            <strong :class="isActiveMember ? 'text-green-300' : 'text-red-300'">
              {{ meetingCount }}
            </strong>
          </p>
          <button
            @click="goBack"
            class="mt-3 px-4 py-1 md:px-6 md:py-2 bg-white hover:bg-gray-100 text-ndc-red font-bold rounded-full transition duration-200 shadow-md text-sm md:text-base flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="flex overflow-x-auto border-b border-gray-200">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-2 md:px-6 md:py-3 font-bold text-sm md:text-lg whitespace-nowrap focus:outline-none transition duration-200',
            activeTab === tab.id 
              ? 'text-ndc-red border-b-2 border-ndc-red bg-ndc-light-red' 
              : 'text-gray-600 hover:text-ndc-green hover:bg-gray-50'
          ]"
        >
          <span v-if="tab.id === 'meetings'" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
            {{ tab.label }}
          </span>
          <span v-else-if="tab.id === 'position-history'" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
            </svg>
            {{ tab.label }}
          </span>
          <span v-else-if="tab.id === 'suggestions'" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            {{ tab.label }}
          </span>
          <span v-else-if="tab.id === 'contributions'" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
            </svg>
            {{ tab.label }}
          </span>
          <span v-else class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            {{ tab.label }}
          </span>
        </button>
      </div>

      <div class="p-4 md:p-6">
        <!-- Meetings Tab -->
        <div v-if="activeTab === 'meetings'">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-ndc-green flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              Meetings
            </h3>
            
            <!-- Meeting Type Filter -->
            <div class="flex items-center space-x-2">
              <label class="text-gray-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                </svg>
                Filter:
              </label>
              <select 
                v-model="meetingFilter" 
                class="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-ndc-green focus:border-ndc-green"
              >
                <option value="all">All Meetings</option>
                <option value="Executive Meeting">Executive Meetings</option>
                <option value="Ward Meeting">Ward Meetings</option>
                <option value="Polling Station">Polling Station</option>
              </select>
            </div>
          </div>
          
          <div v-if="!memberData.meetings || filteredMeetings.length === 0" class="text-gray-500 flex flex-col items-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="mt-2">No meeting records available for this filter.</p>
          </div>
          
          <div v-else class="overflow-x-auto">
            <table class="w-full border text-sm text-left">
              <thead class="bg-ndc-green text-white">
                <tr>
                  <th class="p-3">#</th>
                  <th class="p-3">Date</th>
                  <th class="p-3">Topic</th>
                  <th class="p-3">Location</th>
                  <th class="p-3">Meeting Type</th>
                  <th class="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(meeting, index) in filteredMeetings" 
                  :key="index" 
                  class="border-b hover:bg-gray-50"
                >
                  <td class="p-3">{{ index + 1 }}</td>
                  <td class="p-3">{{ meeting.date }}</td>
                  <td class="p-3">{{ meeting.topic }}</td>
                  <td class="p-3">{{ meeting.location }}</td>
                  <td class="p-3">
                    <span 
                      class="px-2 py-1 rounded-full text-xs font-semibold"
                      :class="getMeetingTypeClass(meeting.meeting_type)"
                    >
                      {{ meeting.meeting_type }}
                    </span>
                  </td>
                  <td class="p-3">
                    <button 
                      @click="confirmDelete(index)" 
                      class="text-red-600 hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Position History Tab -->
        <div v-else-if="activeTab === 'position-history'" class="text-gray-700">
          <h3 class="text-xl font-bold text-ndc-green mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
            </svg>
            Position History
          </h3>
          <div class="space-y-4">
            <!-- Current Position -->
            <div v-if="currentPosition" class="p-4 bg-green-50 border-l-4 border-green-600 rounded shadow">
              <p class="text-sm text-gray-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Current Position
              </p>
              <h4 class="text-lg font-semibold text-green-700">{{ currentPosition.position }}</h4>
              <p class="text-sm text-gray-500">Level: {{ currentPosition.level || 'Unknown' }}</p>
              <p class="text-sm text-gray-500">Location: {{ currentPosition.location || 'Unknown' }}</p>
              <p class="text-sm text-gray-500">
                {{ formatDate(currentPosition.startDate) }} - 
                <span v-if="currentPosition.endDate">{{ formatDate(currentPosition.endDate) }}</span>
                <span v-else>Present</span>
              </p>
            </div>
            <div v-else class="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded shadow">
              <p class="text-sm text-gray-600">No current position found</p>
            </div>

            <!-- Previous Positions -->
            <div v-if="sortedPreviousPositions.length > 0" class="space-y-3">
              <h4 class="text-md font-bold text-gray-800 mt-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                </svg>
                Previous Positions
              </h4>
              <div 
                v-for="(position, idx) in sortedPreviousPositions" 
                :key="idx" 
                class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-900">{{ position.position }}</p>
                    <p class="text-sm text-gray-600">Level: {{ position.level }}</p>
                    <p class="text-sm text-gray-600">Location: {{ position.location }}</p>
                  </div>
                  <p class="text-xs text-gray-500">
                    {{ formatDate(position.startDate) }} - {{ position.endDate ? formatDate(position.endDate) : 'Present' }}
                  </p>
                </div>
              </div>
            </div>
            <div v-else class="text-gray-500 italic">
              No previous positions available.
            </div>
          </div>
        </div>

        <!-- Suggestions Tab -->
        <div v-else-if="activeTab === 'suggestions'" class="text-gray-700">
          <h3 class="text-xl font-bold text-ndc-green mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Suggestions
          </h3>
          <div v-if="!memberData.suggestions || memberData.suggestions.length === 0" class="text-gray-500 flex flex-col items-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="mt-2">No suggestions available.</p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="(suggestion, index) in memberData.suggestions" :key="index" class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <p class="font-medium text-gray-900">{{ suggestion.title }}</p>
              <p class="text-sm text-gray-600 mt-1">{{ suggestion.description }}</p>
              <p class="text-xs text-gray-500 mt-2">{{ formatDate(suggestion.date) }}</p>
            </div>
          </div>
        </div>

        <!-- Contributions Tab -->
        <div v-else-if="activeTab === 'contributions'" class="text-gray-700">
          <h3 class="text-xl font-bold text-ndc-green mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
            </svg>
            Contributions
          </h3>
          <div v-if="!memberData.contributions || memberData.contributions.length === 0" class="text-gray-500 flex flex-col items-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="mt-2">No contributions available.</p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="(contribution, index) in memberData.contributions" :key="index" class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium text-gray-900">{{ contribution.type }}</p>
                  <p class="text-sm text-gray-600 mt-1">{{ contribution.description }}</p>
                </div>
                <span class="text-sm font-semibold text-ndc-green">{{ contribution.amount }}</span>
              </div>
              <p class="text-xs text-gray-500 mt-2">{{ formatDate(contribution.date) }}</p>
            </div>
          </div>
        </div>

        <!-- Benefits Tab -->
        <div v-else-if="activeTab === 'now'" class="text-gray-700">
          <h3 class="text-xl font-bold text-ndc-green mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            Current Benefits
          </h3>
          <div v-if="!memberData.currentActivities || memberData.currentActivities.length === 0" class="text-gray-500 flex flex-col items-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="mt-2">No current benefits available.</p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="(activity, index) in memberData.currentActivities" :key="index" class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <p class="font-medium text-gray-900">{{ activity.type }}</p>
              <p class="text-sm text-gray-600 mt-1">{{ activity.description }}</p>
              <p class="text-xs text-gray-500 mt-2">Status: <span :class="activity.status === 'Active' ? 'text-green-600' : 'text-yellow-600'">{{ activity.status }}</span></p>
            </div>
          </div>
        </div>

        <!-- Delete Dialog -->
        <GDialog v-model="deleteDialog" max-width="400">
          <div class="p-4">
            <h3 class="text-lg font-bold text-red-600 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              Confirm Delete
            </h3>
            <p>Are you sure you want to delete this meeting?</p>
            <div class="flex justify-end mt-4">
              <button @click="deleteDialog = false" class="px-4 py-2 bg-gray-200 rounded mr-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                Cancel
              </button>
              <button @click="deleteMeeting" class="px-4 py-2 bg-red-600 text-white rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </GDialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { GDialog } from 'gitart-vue-dialog';

const route = useRoute();
const router = useRouter();

const activeTab = ref('meetings');
const deleteDialog = ref(false);
const deleteIndex = ref(null);
const meetingFilter = ref('all');

const tabs = [
  { id: 'meetings', label: 'Meetings' },
  { id: 'position-history', label: 'Position History' },
  { id: 'suggestions', label: 'Suggestions' },
  { id: 'contributions', label: 'Contributions' },
  { id: 'now', label: 'Benefits' },
];

const member = ref({
  avatar: '',
  name: '',
  currentPosition: '',
  phone: '',
  level: '',
  pollingStation: '',
  positionHistory: [],
  location: '',
  party_id: '',
  startDate: '',
  endDate: ''
});

const memberData = ref({ 
  meetings: [], 
  suggestions: [], 
  contributions: [], 
  currentActivities: [] 
});

const filteredMeetings = computed(() => {
  if (!memberData.value.meetings) return [];
  if (meetingFilter.value === 'all') return memberData.value.meetings;
  return memberData.value.meetings.filter(meeting => meeting.meeting_type === meetingFilter.value);
});

const getMeetingTypeClass = (type) => {
  switch(type) {
    case 'Executive Meeting':
      return 'bg-purple-100 text-purple-800';
    case 'Ward Meeting':
      return 'bg-blue-100 text-blue-800';
    case 'Polling Station':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const memberInitials = computed(() => {
  if (!member.value.name) return 'NN';
  const names = member.value.name.split(' ');
  return names.length >= 2 ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase() : names[0][0].toUpperCase();
});

const meetingCount = computed(() => memberData.value.meetings?.length || 0);
const isActiveMember = computed(() => meetingCount.value > 5);

const currentPosition = computed(() => {
  // First check if there's a position without end date (current position)
  const currentPos = member.value.positionHistory?.find(pos => !pos.endDate);
  if (currentPos) return currentPos;

  // If no current position, use the member's direct properties
  if (member.value.currentPosition) {
    return {
      position: member.value.currentPosition,
      level: member.value.level,
      location: member.value.location,
      startDate: member.value.startDate,
      endDate: member.value.endDate
    };
  }

  // If no position at all, return null
  return null;
});

const sortedPreviousPositions = computed(() => {
  if (!member.value.positionHistory || member.value.positionHistory.length === 0) {
    return [];
  }

  // Get all positions except the current one
  let previousPositions = member.value.positionHistory.filter(pos => {
    if (!currentPosition.value) return true;
    return pos.position !== currentPosition.value.position || 
           pos.startDate !== currentPosition.value.startDate;
  });

  // Sort by end date (most recent first) or start date if no end date
  return previousPositions.sort((a, b) => {
    const dateA = a.endDate ? new Date(a.endDate) : new Date(a.startDate);
    const dateB = b.endDate ? new Date(b.endDate) : new Date(b.startDate);
    return dateB - dateA;
  });
});

onMounted(() => {
  const allMembers = JSON.parse(localStorage.getItem('leadersData')) || [];
  const foundMember = allMembers.find(m => m.id == route.params.id);
  
  if (foundMember) {
    member.value = {
      avatar: foundMember.avatar || '',
      name: foundMember.name || '',
      currentPosition: foundMember.currentPosition || '',
      level: foundMember.level || '',
      pollingStation: foundMember.poll_Station || '',
      positionHistory: foundMember.positionHistory || [],
      location: foundMember.location || '',
      party_id: foundMember.party_id || '',
      phone: foundMember.phone || '',
      startDate: foundMember.startDate || '',
      endDate: foundMember.endDate || ''
    };
    
    memberData.value = {
      meetings: foundMember.meetings || [],
      suggestions: foundMember.suggestions || [],
      contributions: foundMember.contributions || [],
      currentActivities: foundMember.currentActivities || []
    };
  }
});

const confirmDelete = (index) => {
  deleteIndex.value = index;
  deleteDialog.value = true;
};

const deleteMeeting = () => {
  if (deleteIndex.value !== null) {
    memberData.value.meetings.splice(deleteIndex.value, 1);
    deleteDialog.value = false;
  }
};

const goBack = () => {
  router.back();
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return isNaN(d) ? 'Invalid date' : d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
</script>

<style>
/* NDC Colors */
:root {
  --ndc-red: #E40521;
  --ndc-green: #046A38;
  --ndc-light-red: #FFF0F0;
  --ndc-light-green: #F0FFF5;
}

.bg-ndc-red {
  background-color: var(--ndc-red);
}
.bg-ndc-green {
  background-color: var(--ndc-green);
}
.bg-ndc-light-red {
  background-color: var(--ndc-light-red);
}
.bg-ndc-light-green {
  background-color: var(--ndc-light-green);
}
.text-ndc-red {
  color: var(--ndc-red);
}
.text-ndc-green {
  color: var(--ndc-green);
}
.border-ndc-red {
  border-color: var(--ndc-red);
}
.from-ndc-red {
  --tw-gradient-from: var(--ndc-red);
  --tw-gradient-to: rgba(228, 5, 33, 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.to-ndc-green {
  --tw-gradient-to: var(--ndc-green);
}
</style>