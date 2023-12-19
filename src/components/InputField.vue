<template >
    <div class="input_box" :class="className">
        <div v-if="label" class="flex justify-between ">
            <label
              class="block mb-2 my-1 pt-0.5 P250 N800 dark:text-[#0000]"
              for="department-name">
              {{label}}</label>
          
            <span v-if="requireTag"
              class=" requiredSpan rounded-lg text-[#DD5928] text-xs px-1.5 py-1.5 mb-1.5 my-2 ">
            Required
            </span>
            <span v-if="requireAll"
              class="bg-red-100 requiredSpan rounded-lg text-[#DD5928] text-xs px-1.5 py-1.5 mb-1.5 my-2">
            All Fields Required
            </span>
        
          </div>
          <div class="flex relative">
            <span v-if="addSign" class="absolute pl-4 top-2 left-2 border-r-2 pr-4 text-gray-500">{{ currency }}</span>
            <input 
            :class="inputStyles"
            :type="type"
            id="description"
            :required="requireTag"
            class="bg-gray-50 border border[#d8dae5] hover:border-[#1de383] text-gray-900 rounded-lg focus:outline-[#2f855a] focus:ring-[#1de383] focus:ring peer block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#F2BEAB] dark:focus:border[#d8dae5] p-2"
            :placeholder="placeholder"
            :maxlength="maxlength"
            :value="modelValue"
            @input="[$emit('update:modelValue',inputText?.value)]"
            ref="inputText"
            autocapitalize="off"
            v-bind="$attrs"
            :disabled='disabled'
      />
          </div>
        
      
      <div v-if="showlength" class="flex mt-1 mb-3 justify-between count text-gray-400 text-xs">
        <p class="flex R400 P100 w-full" v-if="modelValue?.length > maxlength">
           You have exceeded your limit 
        </p>
        <p v-else-if="(minlength && modelValue.length< minlength)" class="flex R400 P100 w-full">
          at least {{ minlength }} char
        </p>
        <div class="flex w-full justify-end" v-if="!disabled">{{ modelValue?.length }}/{{maxlength}}</div>
        </div>
    </div>
   
</template>
<script setup lang="ts">
import { ref,watch,Ref } from "vue";

defineProps({
type:{
type:String,
default:"text"

},
modelValue:{
type: String,
default: ""

},
placeholder:{
type:String,
default:""

},
label:{
type:String,
default:""

},
requireTag:{
type:Boolean,
default:false

},
requireAll:{
type:Boolean,
default:false

},
maxlength:{
type:Number,
default:50

},
minlength:{
type:Number,
required:false

},
showlength:{
type:Boolean,
default:true,

},
style:{
type:String,
default:""

},
capitalize:{
type:String,
default:"on"  
},
disabled:{
type:Boolean,
default:false 
},
className:{
type:String,
default:"" 
},
addSign:{
type:Boolean,
default:false,
},
inputStyles:{
type:String,
default:"" 
},
currency:{
type:String,
default:"\u20AC" 
},
});

const emit = defineEmits(["update","filled","update:modelValue"]);

const inputText: Ref<HTMLInputElement | null> = ref(null);
watch(inputText ,() =>{

  emit("filled",inputText.value?.value);
});


// const logId = (event: { target: { value: any; }; }) => {
// }
</script>
<style scoped>
.input_box{
width: 100%;

}
  input{
    width: 100% !important;
    height: 42px;
  }
  .count{
    text-align: end;
    /* margin-right: 25px; */
    /* margin-top: 5px; */
  }  
 .label-div{
  height: 40px;
 }
 input[disabled]:hover{
  border: #d8dae5;
 }
</style>


