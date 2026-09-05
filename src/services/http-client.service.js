/**
 *
 * @param {string} url
 * @param {string} contentType
 */
async function get(url, contentType) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch. Status: ${response.status}`)
  }

  const responseContentType = response.headers.get('content-type')

  if (!responseContentType || !responseContentType.includes(contentType)) {
    throw new Error(`Invalid content type. Expected: ${contentType}. Received: ${responseContentType}`)
  }

  try {
    if (contentType === 'application/json') {
      return await response.json()
    } else {
      return await response.text()
    }
  } catch (error) {
    throw new Error('Failed to parse response data')
  }
}


export const HttpClient = {
  get
}