
export const fetcher = async (url: string) => {
    const response = await fetch(url)
    const result = await response.json()
    const acceptedStatus = [200, 304]
  
    if (!acceptedStatus.includes(response.status)) {
      console.log(result.code, result.message)
      throw new Error(result.message)
    }
  
    return result.data
}