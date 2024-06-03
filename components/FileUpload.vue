<!-- <template>
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
  </script> -->


  <template>
    <div>
      <div class="flex items-center justify-center w-full">
        <label
          for="file-upload"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              class="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ acceptedFileTypes }}
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            class="hidden"
            @change="handleFileUpload"
          />
        </label>
      </div>
      <div v-if="uploadStatus" class="mt-4">
        <p
          :class="{
            'text-green-500': uploadStatus.startsWith('file uploaded'),
            'text-red-500': uploadStatus.startsWith('error uploading'),
          }"
        >
          {{ uploadStatus }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  const cloudflare = useCloudflare()
  const uploadStatus = ref(null)
  const acceptedFileTypes = '.jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .mp4, .mov, .zip'
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    const uploadUrl = await cloudflare.getUploadUrl(file.name)
  
    try {
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
      })
      uploadStatus.value = 'File uploaded successfully!'
    } catch (error) {
      uploadStatus.value = 'Error uploading file.'
      console.error(error)
    }
  }
  </script>