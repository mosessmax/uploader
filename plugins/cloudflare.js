import devalue from '@nuxt/devalue'

// export default function CloudflarePlugin() {

export default defineNuxtPlugin(({ $config }) => {
// const { cloudflare } = $config;
  const config = {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    bucketName: process.env.CLOUDFLARE_BUCKET_NAME,
    accessKey: process.env.CLOUDFLARE_ACCESS_KEY,
  }

    // provide: {
    //   cloudflare: {
        const cloudflareState = useState('cloudflare', () => ({
        config: devalue(config),
        getUploadUrl: async (fileName) => {
          const response = await $fetch(`/api/upload-url?fileName=${fileName}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(config),
          })

          return response.uploadUrl
        },
      }))

      return {
        provie: {
        cloudflare: cloudflareState,
      },
    }
})