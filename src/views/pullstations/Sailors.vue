<template>
    
    <div class="lg:mx-auto h-auto relative" >
        <div class="top_section container mx-auto mt-40">
          <HeaderComponent :isLink="false" @btncall="openDialog" alert="Setup your position"
    
            learnMorr="Learn more about setting up a position ." text="Add members" type="Sailors"
           :count="positions.length" />
        </div>
    
        <!--  <div class="filter_section px-2 sm:px-4 overflow-x-hidden container lg:mx-auto">
          <div class="flex gap-2">
            <span class="flex items-center select_box">
              <SelectField type="text" id="status" data-cy="filterOffice" :requireTag="false" placeholder="Filter office"
                :options="['Active', 'Inactive', 'All']" param="criteria" class="status" v-model="filterValue"
                @change="filterSpec($event)" />
            </span>
          </div> -->
          <!-- filter search -->
          <!-- <div class="flex justify-between SPC-MB-200 SPC-MT-300">
            <SearchComponent @search="searchDep" />
        </div> -->
        <!-- </div> -->
    
        <div class="container mx-auto px-4 mt-16">
          <table aria-label="user table" class="table-auto w-full text-left text-gray-500 dark:text-gray-400">
            <thead class="N900 bg-[#FAFBFF] border border-b[#E6E8F0] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="p-2 w-1/6 N800 normal-case H400">Members name</th>
                <th scope="col" class="p-2 w-1/6 N800 normal-case H400">Phone number</th>
                <th scope="col" class="p-2 w-1/6 N800 normal-case H400">Party ID</th>
                <th scope="col" class="p-2 w-1/6 N800 normal-case H400">Position</th>
                <th scope="col" class="p-2 w-1/6 N800 normal-case H400">Description</th>
                <th scope="col" class="p-2 w-1/6 N800 normal-case H400 text-center">Action</th>
              </tr>
            </thead>
            <tbody>  
              <tr v-for="(position, i) in positions" :key="position.id" class="P200 N800 table-row">
                 <td class="p-4 w-1/4">
                   {{ position?.name }}
                  </td>  
                  <td class="p-4 w-1/4">
                    
                    {{ position?.phone}}
                  </td> 
                  <td class="p-4 w-1/4">
                    {{ position?.partyId}}
                  </td> 
                  <td class="p-4 w-1/4">
                    {{ position?.position}}
                  </td> 
                  <td class="p-4 w-1/4">
                    {{ position?.description}}
                  </td> 
                   
                  <td class="flex justify-center">
                  <div class="mt-4 dropdown">
                    <div class="cursor-pointer">
                    <img src="../../assets/editImage.svg" class="mt-1 cursor-pointer" alt="Actions" data-cy="actions" />
                  </div>
                    <div class="dropdown-content">
                      <p class="lineborder p-2 text-center P100 N600 bg-[#2f855a] text-white">ACTIONS</p>
                      <a @click="editPosition(position)" class="flex P200 O400 cursor-pointer">
                        <img src="../../assets/edit.svg" class="SPC-MR-100 mr-2" alt="edit" data-cy="edit" />Edit position</a>
    
                      <a @click="clickArchive" class="flex content-center P200 text-[#2f855a] cursor-pointer">
                        <img src="../../assets/archive.svg" alt="delete" class=" SPC-MR-100 mr-2" data-cy="archive" />                      
                       Archive position
                      </a>
                    </div>
                  </div>
                </td>  
               </tr> 
            </tbody>
          </table> 
    </div>
           <!-- Loading state   -->
          <!-- <div v-if="queryLoading && officeVariable.allOffices?.length === 0">
            <Loader />
          </div> 
    
          <div v-else-if="officeVariable.allOffices?.length === 0" class="w-1/3 m-auto mt-24 text-center">
            <img class="ml-auto mr-auto" src="../../../assets/not_found.svg" alt="Not found image" />
            <p class="text-[#8F95B2]">There are no office created :(</p>
          </div>
        </div> -->
    
        <!-- <div class="count_page my-10">
              <div v-if="count > 9"   class="w-100 flex justify-end">
                <Paginator :total-items="count" v-model="currentPage" :items-per-page="take" :max-pages-shown="5"
                :on-click="loadMore" :key="currentPage" />
              </div>
            </div> --> 
          
    
        <GDialog v-model="dialogState" max-width="500">
          <div class="flex items-start justify-between p-4 border-b bg-[#2f855a] rounded-t dark:border-gray-600">
            <h3 class="H600 N900 text-white">
              {{ editState ? "Edit position" : "Add position" }}
            </h3>
            <button type="button" @click="dialogState=false"
          class="inline-flex items-center ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
          <img src="../../assets/cancel.svg" alt="close-circle-icon" />
        </button>
          </div>
    
          <form>   
           
            <div class="px-4 mt-5">
              <InputField type="text" id="title" data-cy="position" label="Position name" :requireTag="true" placeholder="Enter position name"
                :maxlength="50" :showlength="false" v-model="newPosition.name" />
            </div>
            <div class="px-4 mt-5">
              <InputField type="number" id="phone"  label="Phone number" :requireTag="true" placeholder="Enter phone number"
                :maxlength="50" :showlength="false" v-model="newPosition.phone" />
            </div>
            <div class="px-4 mt-5">
              <InputField type="text" id="partyId" data-cy="position" label="Enter part Id number" :requireTag="true" placeholder="Enter party id number"
                :maxlength="50" :showlength="false" v-model="newPosition.partyId" />
            </div>
            <div class="px-4 mt-5">
              <div>
                <div class="flex justify-between label-div&quot;">
                  <label for="status" class="block mb-2 my-1 pt-0.5 P250 N800 dark:text-grey-300">Select position</label>
                </div>
             <select class=" w-full bg-gray-50 border border[#d8dae5] hover:border-[#1de383] text-gray-900 rounded-lg focus:outline-[#2f855a] focus:ring-[#1de383] focus:ring peer block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#F2BEAB] dark:focus:border[#d8dae5] p-2"
 type="text" v-model="newPosition.position">
                <option disabled selected>Select position</option>
                <option value="Chairman">Chairman</option>
<option value="Secretary">Secretary</option>
<option value="Treasure">Treasure</option>
            </select>
          </div> 
            </div>
            <div class="px-4 mt-5">
              <InputField type="text" id="discription"  label="Description" :requireTag="true" placeholder="Enter description"
                :maxlength="50" :showlength="false" v-model="newPosition.description" />
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
              <button v-else id="saveButton"  type="button" @click="addPosition"
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
    
      <!-- <div >
            <GDialog max-width="500" v-model="deleteState" class="relative p-4 w-full max-w-md h-full md:h-auto">
              <DeleteDialog @close-dialog="deleteState = false" @delete="archiveOffice"
              :component-title="'Archive ' + 'office' + ''" :delete-message="'<p>Are you sure you want to archive <span class=\'P250 N800\'>' +
                 officeVariable.location" delete-btn="Archive" />
            </GDialog>
          </div>  -->
    
       
      <!-- <SuccessBlock v-if="success.block" :success="success" style="position: absolute; top: 10px; left: 20%; z-index: 999"
        class="w-1/2" />
      <ErrorBlock v-if="error_state.block" :error="error_state" style="position: absolute; top: 10px; left: 20%; z-index: 999"
        class="w-1/2" /> -->
     
      </div>
    
    
    </template>
    
    <script setup>
    import HeaderComponent from '../../components/HeaderComponent.vue';
    import InputField from '../../components/InputField.vue';
    // import SelectFieldComponent from '../../components/SelectFieldComponent.vue';
    import { ref, reactive, computed} from 'vue';
    import DeleteDialog from "../../components/DeleteDialog.vue";
    
    const editState = ref(false);
    const dialogState = ref(false);
    const deleteState = ref(false);
   
    
   
    let clickArchive = () => {
      deleteState.value = true;
    }
    
    const storedPositions = localStorage.getItem('positions');

const positions = computed(() => {
  const initialPositions = [];
  if (storedPositions) {
    const parsedPositions = JSON.parse(storedPositions);
    if (Array.isArray(parsedPositions)) {
      return parsedPositions;
    }
  }
  return initialPositions;
});

const newPosition = reactive({
  name: "",
  phone: "",
  partyId: "",
  position: "",
  description: ""
});

const addPosition = () => {
  if (newPosition.name || newPosition.phone || newPosition.partyId || newPosition.position || newPosition.description) {
    const newpositions = {
      name: newPosition.name,
      phone: newPosition.phone,
      partyId: newPosition.partyId,
      position: newPosition.position,
      description: newPosition.description,
    };
    positions.value.push(newpositions);

    // Save positions to local storage
    localStorage.setItem('positions', JSON.stringify(positions.value));

    setTimeout(() => {     
      newPosition.name = '';
      newPosition.phone = '';
      newPosition.description = '';
      newPosition.position = '';
      newPosition.partyId = '';
      dialogState.value = false;
    }, 1000);
  }
  dialogState.value = true;
};

const editPosition = (position) => {
console.log("jj", position);
  editState.value = true;
  dialogState.value = true;
  newPosition.name = position?.name;
  newPosition.phone = position?.phone;
  newPosition.partyId = position?.partyId;
  newPosition.position = position?.position;
  newPosition.description = position?.description;
  updateLocalStorage();
};

const updateLocalStorage = () => {
  localStorage.setItem('positions', JSON.stringify(positions.value));
  // dialogState.value = false;
};
    </script>
    
    <style scoped>
    .table-row:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    
      /* Add shadow and border to table rows */
      .table-row {
        box-shadow: 2px 4px 4px  rgba(0, 0, 0, 0.1);
        border: 2px solid rgba(230, 232, 240, 1);
      }
      .dropdown {
      position: relative;
      display: inline-block;
    }
    .dropdown-content {
      margin-left: -150px;
      display: none;
      position: absolute;
      background-color: #ffffff;
      min-width: 200px;
      box-shadow: 0px 4px 8px rgba(16, 24, 64, 0.16);
      border-radius: 8px;
      z-index: 1;
    }
    
    
    
    button {
      outline-width: 0;
    }
    .lineborder{
      border-bottom: 1px solid #9b9da8;
    }
    
    .dropdown-content a {
      color: #474d66;
      padding: 12px 16px;
      text-decoration: none;
      display: flex;
    }
    
    
    .dropdown-content a:hover {
      background-color: #38a169;
      color: #ffffff;
      border-left: 3px solid red;
      border-right: 3px solid red;
    
    }
    
    .dropdown:hover .dropdown-content {
      display: block;
    }
    
    .dropdown:hover .dropbtn {
      background-color: #fafbff;
      border-radius: 8px;
    }
    </style>