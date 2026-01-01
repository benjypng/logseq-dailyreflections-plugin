import axios from 'axios'
import { format } from 'date-fns'

import { Gospel, UJson } from '../interfaces'

// https://www.universalis.com/20240519/jsonpmass.js
export const getGospel = async (date: Date): Promise<Gospel> => {
  const url = `https://www.universalis.com/${format(
    date,
    'yyyyMMdd',
  )}/jsonpmass.js`

  const response = await axios.get(url)
  let { data } = response

  // Ensure that data is a single line
  data = data.replace(/\s+/g, ' ').trim()

  // Extract the JSON string
  const jsonStart = data.indexOf('{')
  const jsonEnd = data.lastIndexOf('}') + 1
  data = data.slice(jsonStart, jsonEnd)

  // Regular expression to remove HTML tags and HTML entities
  data = data.replace(/<\/?[^>]+(>|$)|&#[0-9a-zA-Z]+;/g, '')

  // Replace specific HTML entities
  data = data.replace(/&#8217;/g, "'")

  // Attempt to parse JSON and handle potential errors
  const jsonData = JSON.parse(data)
  const gospel: UJson = jsonData.Mass_G
  const reading = gospel.source
  const passage = gospel.text

  return {
    url,
    reading,
    passage,
  }
}
