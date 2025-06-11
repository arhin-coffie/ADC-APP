<template>
  <div class="mx-10 mt-10">
    <div class="flex justify-end mb-10">
      <ButtonComponent label="Add Member" @submit="openDialog" />
    </div>

    <div class="flex gap-3 flex-wrap">
      <div v-for="(member, index) in members" :key="index">
        <UserCard :member="member" @remove="removeMember(index)" />
      </div>
    </div>

    <GDialog v-model="dialogState" max-width="500">
      <div class="flex items-start justify-between p-4 border-b bg-[#2f855a] rounded-t dark:border-gray-600">
        <h3 class="H600 N900 text-white">
          {{ editState ? "Edit party member" : "Add party member" }}
        </h3>
        <button type="button" @click="dialogState = false"
          class="inline-flex items-center ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
          <img src="../../assets/cancel.svg" alt="close-circle-icon" />
        </button>
      </div>

      <form>
        <div class="px-4 mt-5">
          <InputField type="text" label="Enter name" :requireTag="true" placeholder="Enter name"
            :maxlength="50" :showlength="false" v-model="newMember.name" />
        </div>
        <div class="px-4 mt-5">
          <InputField type="number" label="Phone number" :requireTag="true" placeholder="Enter phone number"
            :maxlength="50" :showlength="false" v-model="newMember.phone" />
        </div>
        <div class="px-4 mt-5">
          <InputField type="number" label="Enter part Id number" :requireTag="true" placeholder="Enter id number"
            :maxlength="50" :showlength="false" v-model="newMember.idNumber" />
        </div>
        <div class="px-4 mt-5">
          <div>
            <div class="flex justify-between label-div">
              <label for="status" class="block mb-2 my-1 pt-0.5 P250 N800 dark:text-grey-300">Select position</label>
              <span class="requiredSpan text-[#DD5928] text-xs px-1.5 py-1.5mb-1.5 my-2 rounded-lg dark:text-grey-900">Required</span>
            </div>
            <select class="w-full bg-gray-50 border border-[#d8dae5] hover:border-[#1de383] text-gray-900 rounded-lg focus:outline-[#2f855a] focus:ring-[#1de383] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              v-model="newMember.position">
              <option disabled selected value="">Select position</option>
              <option value="Chairman">Chairman</option>
              <option value="Secretary">Secretary</option>
              <option value="Treasure">Treasure</option>
              <option value="Member">Member</option>

            </select>
            
          </div>
        </div>
         <div class="px-4 mt-5">
          <div>
            <div class="flex justify-between label-div">
              <label for="status" class="block mb-2 my-1 pt-0.5 P250 N800 dark:text-grey-300">Select Polling Station</label>
              <span class="requiredSpan text-[#DD5928] text-xs px-1.5 py-1.5mb-1.5 my-2 rounded-lg dark:text-grey-900">Required</span>
            </div>
            <select class="w-full bg-gray-50 border border-[#d8dae5] hover:border-[#1de383] text-gray-900 rounded-lg focus:outline-[#2f855a] focus:ring-[#1de383] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              v-model="newMember.poll_Station">
              <option disabled selected value="">Select Polling Station</option>
              <option value="Sailors">Sailors</option>
              <option value="Ase Park">Ase Park</option>

            </select>
            
          </div>
        </div>
        <div class="px-4 mt-5">
          <InputField type="text" label="Description" :requireTag="true" placeholder="Enter description"
            :maxlength="50" :showlength="false" v-model="newMember.description" />
        </div>

        <div class="flex justify-end w-11/12 ml-5 my-5">
          <button class="text-[#DD5928] SPC-MR-200 mr-4" @click="dialogState = false">
            Cancel
          </button>
          <button v-if="editState" @click.prevent="" type="button"
            class="text-white btn-shadow P200 bg-[#2f855a] hover:bg-[#58b787] rounded-lg px-5 py-2 flex">
            <div v-if="loading" role="status">
              <img src="../assets/loaderImage.svg" alt="loaderimg" />
              <span class="sr-only">Loading...</span>
              &nbsp;
            </div>
            Update
          </button>
          <button v-else type="button" @click="addMember"
            class="ml-4 text-white btn-shadow P200 bg-[#2f855a] hover:bg-[#58b787] rounded-lg px-5 py-2 flex">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UserCard from "../components/UserCard.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import InputField from "../components/InputField.vue";
import { GDialog } from 'gitart-vue-dialog';

const members = ref([]);
const dialogState = ref(false);
const editState = ref(false);
const loading = ref(false);

const newMember = ref({
  name: '',
  phone: '',
  idNumber: '',
  position: '',
  description: '',
  poll_Station: '',
});

onMounted(() => {
  const savedMembers = localStorage.getItem('partyMembers');
  if (savedMembers) {
    members.value = JSON.parse(savedMembers);
  }
});

const openDialog = () => {
  dialogState.value = true;
  resetForm();
};

const addMember = () => {
  loading.value = true;

  setTimeout(() => {
    members.value.unshift({
      ...newMember.value,
      id: Date.now()
    });

    localStorage.setItem('partyMembers', JSON.stringify(members.value));

    resetForm();
    dialogState.value = false;
    loading.value = false;
  }, 1000);
};

const removeMember = (index) => {
  members.value.splice(index, 1);
  localStorage.setItem('partyMembers', JSON.stringify(members.value));
};

const resetForm = () => {
  newMember.value = {
    name: '',
    phone: '',
    idNumber: '',
    position: '',
    description: '',
    poll_Station: '',
  };
};
</script>
