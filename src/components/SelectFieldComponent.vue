<template >
    <div class="input_box">
        <div>
            <div v-if="label" class="flex justify-between label-div">
              <label for="Department" class="block mb-2 my-1 pt-0.5 P250 N800 dark:text-gray-300 ">{{label}}</label>
              <span v-if="requireTag"
              class="bg-red-100 requiredSpan rounded-lg text-[#DD5928] text-xs px-1.5 py-1.5 mb-1.5 my-2 rounded dark:bg-red-200 dark:text-red-900"
                >Required</span
              >
            </div>
  
            <select :class="className"
              :required="requireTag"
              class="xs:w-full bg-gray-50 border border[#d8dae5] hover:border-[#8F95B2] text-gray-900 rounded-lg focus:outline-[#E47A53] focus:ring-[#F2BEAB] focus:ring peer block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#F2BEAB] dark:focus:border[#d8dae5] p-2"
              :placeholder="placeholder"
              :value="modelValue"
              @change="[$emit('update:modelValue', $event?.target.value)]"
              autocapitalize="on"
              v-bind="$attrs"
              >
              <option id="default" data-cy="optionType" value="option.name" disabled >{{placeholder}}</option>
              <option
                v-for="option in options"
                :key="option.name"
                :value="option.name"
              >
                {{ option.name }}
              </option> 
            </select>
          </div>   
    </div>
  </template>
  <script setup lang="ts">

import { reactive} from 'vue';
  const props=defineProps({
  type:{
  type:String,
  default:"text"
  
  },
    className:{
    type:String,
    default:"select"
    },
  
  modelValue:{
  type:String ,
  },
  placeholder:{
  type:String,
  default:""
  
  },
  obj:{
    type:Boolean,
    default:false
  },
  label:{
  type:String,
  default:""
  
  },
  requireTag:{
  type:Boolean,
  default:false
  
  },
  param:{
  type:String,
  default:"name"
  },
  
  options:{
  type:Array
  }
  ,
  param_id:{
  type:String
  },
  
  });
  
  </script>
  
  <style scoped>
  .input_box{
  width: 100%;
  }
    .select{
      width: 100%;
      height: 42px;
    }
  
  .select-m{
    width: 85%;
    height: 42px;
  }
    .count{
      text-align: end;
      margin-right: 25px;
      margin-top: 5px;
    }  
   .label-div{
    height: 40px;
   }
  </style>