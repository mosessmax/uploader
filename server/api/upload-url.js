import * as crypto from 'crypto'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
  const { accountId, bucketName, accessKey, fileName } = body
//   const fileName = getQuery(event).fileName

  const now = new Date()
  const expiration = new Date(now.getTime() + 60 * 60 * 1000) // 1 hour expiration

  const hmac = crypto.createHmac('sha256', accessKey)
  const signedUrl = `https://${bucketName}.r2.cloudflarestorage.com/${fileName}`
  const signature = hmac.update(`PUT\n\n\n${expiration.toUTCString()}\n${signedUrl}`).digest('hex')

  const uploadUrl = `${signedUrl}?uid=${encodeURIComponent(accountId)}&exp=${Math.round(
    expiration.getTime() / 1000,
  )}&signature=${signature}`

  return { uploadUrl }
})