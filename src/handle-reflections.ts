import { BlockUUID } from '@logseq/libs/dist/LSPlugin.user'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { getCreighton } from './libs/get-creighton'
import { getGospel } from './libs/get-gospel'
import { writeToLogseq } from './write-to-logseq'

export const handleReflections = async (uuid: BlockUUID) => {
  console.log('Getting Reflections')

  dayjs.extend(utc)
  dayjs.extend(timezone)
  const date = dayjs().tz('Asia/Singapore')

  let creighton = { url: '', reflections: '' }
  let gospel = { url: '', reading: '', passage: '' }

  try {
    const response = await getCreighton(date)
    if (response) creighton = response
  } catch (error) {
    await logseq.UI.showMsg(`Error getting Creighton reflections`, 'error')
    console.error(error)
  }

  try {
    const response = await getGospel(date)
    if (response) gospel = response
  } catch (error) {
    await logseq.UI.showMsg('Error getting Gospel reflections', 'error')
    console.error(error)
  }

  // Then write to Logseq
  writeToLogseq(uuid, creighton, gospel)
}
