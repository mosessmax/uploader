<template>
    <div>
      <input type="file" @change="handleFileUpload" />
      <p v-if="uploadStatus">{{ uploadStatus }}</p>
    </div>
  </template>
  
  <script setup>
  const { $cloudflare } = useNuxtApp()
  const uploadStatus = ref(null)
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    const uploadUrl = await $cloudflare.cloudflare.getUploadUrl(file.name)
  
    try {
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
      })
      uploadStatus.value = 'file uploaded successfully!'
    } catch (error) {
      uploadStatus.value = 'error uploading file.'
      console.error(error)
    }
  }
  </script>