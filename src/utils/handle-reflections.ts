import { BlockUUID } from '@logseq/libs/dist/LSPlugin.user'

import { getGospel } from './get-gospel'
import { writeToLogseq } from './write-to-logseq'

export const handleReflections = async (uuid: BlockUUID) => {
  try {
    const gospel = await getGospel(new Date())
    await writeToLogseq(uuid, gospel)
  } catch (error) {
    logseq.UI.showMsg(
      `Error getting Gospel reflections: ${String(error)}`,
      'error',
    )
  }
}
