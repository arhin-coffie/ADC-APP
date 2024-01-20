<!-- eslint-disable vue/no-duplicate-attributes -->
<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="mx-10 mt-10 ">
    <div class="flex justify-end mb-10">

      <ButtonComponent label="ADD MEMBER" @submit="openDialog" />
    </div>

    <!-- <GridCoponent> -->
<div class="flex gap-3 flex-wrap">

  <div v-for="user in options" :key="user.label" class="">
    <UserCard :user="user" />
  </div>
</div>
    <!-- </GridCoponent> -->



    <GDialog v-model="dialogState" max-width="500">
      <div class="wrapper p-4">
        <div class="content">
          <div class="mb-5">ADD MEMBER</div>
          <InputField placeholder="label" v-model="label" :showlength="false" class="mb-2"/>
          <InputField placeholder="value" v-model="value" :showlength="false" class="mb-2"/>
        </div>

        <div class="flex justify-end">
          <ButtonComponent label="ADD MEMBER" @submit="handleAddUser" />
        </div>
      </div>
    </GDialog>


  </div>
</template>
  
<script setup>
import { ref } from "vue";
import UserCard from "../components/UserCard.vue";
import GridCoponent from "../components/GridComponent.vue"
import ButtonComponent from "../components/ButtonComponent.vue";
import InputField from "../components/InputField.vue";

// eslint-disable-next-line no-unused-vars
const options = ref([
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
  { label: "Option 3", value: 3 },
  { label: "Option 3", value: 3 },
  { label: "Option 3", value: 3 },
]);

const dialogState = ref(false);

const label = ref("")
const value = ref("")

const openDialog = () => {
  dialogState.value = !dialogState.value;
};
// eslint-disable-next-line no-unused-vars
const selectedOptions = ref([]);

const handleAddUser = () => {
  options.value.push({ label, value })
  dialogState.value = false

  label.value=""
  value.value=""
}
</script>
<style scoped>
select {
  width: 200px;
}
</style>
  