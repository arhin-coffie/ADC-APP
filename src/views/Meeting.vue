
    
<template>
  <div class=" mx-auto p-8 mt-24">
  <div class="absolute top-48  w-60 h-60 ml-60 md:h-60">
        <img 
          src="https://res.cloudinary.com/dkjqzjthp/image/upload/v1750953460/20250624_1743_NDC_Rush_Hour_simple_compose_01jyhghcshf63vbet50t381x4g_2_v6m2mz.png" 
          alt="NDC Flag" 
          class="w-full h-full object-contain"
        />
        <h1>Getting late for meeting</h1>
      </div>    <h1 class="text-3xl font-bold mb-8 text-center">Record Meetings</h1>
    
    <!-- First Row -->
    <div class="flex flex-wrap justify-center gap-4 mb-6">
      <!-- Button 1: Gradient -->
      <button class="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
       Commitment
      </button>
      
      <!-- Button 2: Neumorphic -->
      <button class="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-semibold shadow-neu hover:shadow-neu-inset transition-all duration-300 border border-gray-200">
        Perseverance
      </button>
      
      <!-- Button 3: Glass Morphism -->
       <div class="flex flex-wrap justify-center gap-4">
      <!-- Button 10: Pulse Effect -->
      <button class="px-6 py-3 rounded-lg bg-violet-600 text-white font-semibold animate-pulse hover:animate-none">
       Tenacity
      </button>
    </div>
    </div>
    
    <!-- Second Row -->
    <div class="flex flex-wrap justify-center gap-4 mb-6">
      <!-- Button 4: 3D -->
      <button class="px-6 py-3 rounded-lg bg-blue-600 text-white font-bold shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 border-b-4 border-blue-800 active:border-b-2">
      Discipline
      </button>
      
      <!-- Button 5: Outline -->
      <button  @click="openDialog()" class="px-6 py-3 rounded-lg border-2 border-emerald-500 text-emerald-600 font-semibold hover:bg-emerald-500 hover:text-white transition-all duration-300">
        Create Meeting
      </button>
      
      <!-- Button 6: Rounded Full -->
      <button class="px-6 py-3 rounded-full bg-rose-500 text-white font-semibold shadow-md hover:bg-rose-600 transition-all duration-300 hover:shadow-lg">
        Determination
      </button>
    </div>
    
    <!-- Third Row -->
    <div class="flex flex-wrap justify-center gap-4 mb-6">
      <!-- Button 7: Animated Border -->
      <button class="px-6 py-3 relative rounded-lg bg-white text-indigo-600 font-semibold group overflow-hidden">
        <span class="relative z-10">Diligence</span>
        <span class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-1"></span>
      </button>
      
      <!-- Button 8: Icon Button -->
      <button class="px-6 py-3 rounded-lg bg-amber-500 text-white font-semibold flex items-center gap-2 hover:bg-amber-600 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
        Focus
      </button>
      
      <!-- Button 9: Shine Effect -->
      <button class="px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold relative overflow-hidden group">
        <span class="relative z-10">Loyalty</span>
        <span class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 w-0 group-hover:w-full transition-all duration-500 opacity-70 -z-1"></span>
      </button>
    </div>
    
    <!-- Fourth Row -->
    <div class="flex flex-wrap justify-center gap-4">
      <!-- Button 10: Pulse Effect -->
      <button class="px-6 py-3 rounded-lg bg-violet-600 text-white font-semibold animate-pulse hover:animate-none">
       Tenacity
      </button>
    </div>
  </div>

    <GDialog v-model="dialogState" max-width="500">
      <div class="flex items-start justify-between p-4 border-b bg-[#2f855a] rounded-t dark:border-gray-600">
        <h3 class="H600 N900 text-white">
          Create Meeting
        </h3>
        <button type="button" @click="dialogState=false"
          class="inline-flex items-center ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
          <img src="../assets/cancel.svg" alt="close-circle-icon" />
        </button>
      </div>

      <form>   
        <div class="px-4 mt-5">
          <div>
            <div class="flex justify-between">
              <label for="position" class="block mb-2 my-1 pt-0.5 P250 N800 dark:text-grey-300">Select name</label>
              <span class="requiredSpan text-[#DD5928] text-xs px-1.5 py-1.5mb-1.5 my-2 rounded-lg dark:text-grey-900">Required</span>
            </div>


<multiselect
  v-model="meetingData.names"
  :options="members"
  :multiple="true"
  :close-on-select="false"
  :searchable="true"
  placeholder="Select members"
  label="name"
  track-by="id"
  class="w-full"
/>

          </div> 
        </div>
         <div class="px-4 mt-5">
          <div>
            <div class="flex justify-between">
              <label for="position" class="block mb-2 my-1 pt-0.5 P250 N800 dark:text-grey-300">Select Meeting Type</label>
              <span class="requiredSpan text-[#DD5928] text-xs px-1.5 py-1.5mb-1.5 my-2 rounded-lg dark:text-grey-900">Required</span>
            </div>
                    <select 
  id="position" v-model="meetingData.meeting_type"

  class="w-full bg-gray-50 border border-[#d8dae5] hover:border-[#1de383] text-gray-900 rounded-lg focus:outline-[#2f855a] focus:ring-[#1de383] focus:ring peer block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#F2BEAB] dark:focus:border[#d8dae5] p-2"
>
  <option  value="">Select Meeting Type</option>
  <option 
    v-for="position in ['Executive Meeting', 'Ward Meeting', 'Polling Station']"
    :key="position"
    :value="position"
  >
    {{ position}}
  </option>
</select>


          </div> 
        </div>
        <div class="px-4 mt-5">
          <InputField type="text" id="text" label="Topic" :requireTag="true" placeholder="Write Topic"
            :maxlength="50" :showlength="false" v-model="meetingData.topic" />
        </div><div class="px-4 mt-5">
          <InputField type="text" id="topic" label="Location" :requireTag="true" placeholder="Location"
            :maxlength="50" :showlength="false" v-model="meetingData.location" />
        </div>
        <div class="px-4 mt-5">
          <InputField type="date" id="date" label="Date" :requireTag="true" placeholder="Select Date"
            :maxlength="50" :showlength="false" v-model="meetingData.date" />
        </div>
      


        <div class="flex justify-end w-11/12 ml-5 my-5">
          <button  id="cancelButton" class="text-[#DD5928] SPC-MR-200 mr-4" @click="dialogState = false">
            Cancel
          </button>
          <button data-cy="updateSkills" id="updateButton" v-if="editState" @click.prevent="" type="button"
            class="text-white btn-shadow P200 bg-[#2f855a] hover:bg-[#58b787] rounded-lg px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#EB9C7F] disabled:opacity-25 disabled:cursor-not-allowed flex"
            >
            <div v-if="loading" role="status">
              <img src="../assets/loaderImage.svg" alt="loaderimg"/>
              <span class="sr-only">Loading...</span>
              &nbsp;
            </div>
            Update
          </button>
          <button v-else id="saveButton"  type="button" @click="handleSaveMeeting"
            class="ml-4 text-white btn-shadow P200 bg-[#2f855a] hover:bg-[#58b787] rounded-lg px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#1de383] disabled:opacity-25 disabled:cursor-not-allowed flex"
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
            Save
          </button>
        </div>
      </form>
    </GDialog> 
   
  

   <div >
        <GDialog max-width="500" v-model="deleteState" class="relative p-4 w-full max-w-md h-full md:h-auto">
          <DeleteDialog @close-dialog="deleteState = false"  deleteBtn="Unarchive"
            component-title="Unarchive skills" :delete-message="'<p>Are you sure you want to unarchive <span class=\'P250 N800\'>' 
              " />
        </GDialog>
        </div>


</template>

<script setup>
import InputField from '../components/InputField.vue';
import { ref, onMounted} from 'vue';
import DeleteDialog from "../components/DeleteDialog.vue";
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'


const editState = ref(false);
const dialogState = ref(false);
const deleteState = ref(false);
const members = ref([]) 

onMounted(() => {
  const savedMembers = localStorage.getItem("leadersData")
  if(savedMembers) {
members.value = JSON.parse(savedMembers).map(m => ({
  id: m.id,
  name: m.name
}));  }
})

const meetingData = ref({
  names: [],  
  meeting_type: '',
  topic: '',
  location: '',
  date: '',
});


const handleSaveMeeting = () => {
  const storedMembers = JSON.parse(localStorage.getItem("leadersData")) || [];

  const updatedMembers = storedMembers.map((member) => {
    const isSelected = meetingData.value.names.some(selected => selected.id === member.id);
    if (isSelected) {
      const existingMeetings = member.meetings || [];
      return {
        ...member,
        meetings: [
          ...existingMeetings,
          {
            topic: meetingData.value.topic,
            location: meetingData.value.location,
            date: meetingData.value.date,
            meeting_type: meetingData.value.meeting_type,
          }
        ]
      };
    }
    return member;
  });

  localStorage.setItem("leadersData", JSON.stringify(updatedMembers));
  dialogState.value = false;
};





let openDialog = () => {
    dialogState.value = true;
    editState.value = false;
}


</script>



<style scoped>
.multiselect__content-wrapper {
  position: absolute !important;
  top: 100% !important;
  left: 0 !important;
  width: 100% !important;
  z-index: 50 !important;
  margin-top: 4px !important;
}

.multiselect {
  margin-bottom: 24px !important; /* Add space below the multiselect */
}
</style>


