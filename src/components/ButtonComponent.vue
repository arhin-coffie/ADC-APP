<template>
    <div>
        <button class="btn btn--primary rounded bg-[#2f855a] p-2 text-[#fff]" @click="$emit('submit')">{{ label }}
        </button>
    </div>
</template>

<script setup>
defineProps({
    label: { type: String, default: "Submit" }
})
</script>

<style scoped></style>