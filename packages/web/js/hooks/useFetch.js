export const useFetch = async (url, options) => {
  try {
    const API_URL = "https://neo-expensive.herokuapp.com/v1"
    const response = await fetch(`${API_URL}${url}`, options)
    const { message, ...rest } = await response.json()

    return {
      message,
      data: rest,
      error: null
    }
  } catch (error) {
    console.log(error)

    return {
      message: `API rror: ${error}`,
      data: null,
      error
    }
  }
}