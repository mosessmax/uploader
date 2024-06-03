import * as crypto from 'crypto'

export default defineEventHandler(async (event) => {
  console.log('CLOUDFLARE_ACCOUNT_ID:', process.env.CLOUDFLARE_ACCOUNT_ID)
  console.log('CLOUDFLARE_BUCKET_NAME:', process.env.CLOUDFLARE_BUCKET_NAME)
  console.log('CLOUDFLARE_ACCESS_KEY:', process.env.CLOUDFLARE_ACCESS_KEY)

  const body = await readBody(event)
  console.log('Received request body:', body)

  if (typeof body !== 'object' || body === null) {
    console.error('Invalid request body')
    return { error: 'Invalid request body' }
  }

  const { accountId, bucketName, accessKey, fileName } = body
  
  if (!accountId || !bucketName || !accessKey || !fileName) {
    console.error('Missing required parameters')
    return { error: 'Missing required parameters' }
  }

  const now = new Date()
  const expiration = new Date(now.getTime() + 60 * 60 * 1000) // 1 hour expiration

  const hmac = crypto.createHmac('sha256', accessKey)
  const signedUrl = `https://${bucketName}.r2.cloudflarestorage.com/${fileName}`
  const signature = hmac.update(`PUT\n\n\n${expiration.toUTCString()}\n${signedUrl}`).digest('hex')

  const uploadUrl = `${signedUrl}?uid=${encodeURIComponent(accountId)}&exp=${Math.round(
    expiration.getTime() / 1000,
  )}&signature=${signature}`

  console.log('Generated upload URL:', uploadUrl)


  return { uploadUrl }
})