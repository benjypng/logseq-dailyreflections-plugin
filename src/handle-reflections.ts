import { BlockUUID } from '@logseq/libs/dist/LSPlugin.user'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { getCreighton } from './libs/get-creighton'
import { getGospel } from './libs/get-gospel'
import { writeToLogseq } from './write-to-logseq'

export type Creighton = {
  url: string
  reflections: string
} | null

export type Gospel = {
  url: string
  reading: string
  passage: string
} | null

export const handleReflections = async (uuid: BlockUUID) => {
  console.log('Getting Reflections')

  dayjs.extend(utc)
  dayjs.extend(timezone)
  const date = dayjs().tz('Asia/Singapore')

  let creighton: Creighton = { url: '', reflections: '' }
  let gospel: Gospel = { url: '', reading: '', passage: '' }

  const response = await getCreighton(date)
  if (response) {
    creighton = response
  } else {
    creighton = null
  }

  // TODO: Move the try into its function
  try {
    const response = await getGospel(date)
    if (response) gospel = response
  } catch (error) {
    gospel = null
    await logseq.UI.showMsg('Error getting Gospel reflections', 'error')
    console.error(error)
  }

  // Then write to Logseq
  await writeToLogseq(uuid, creighton, gospel)
}
