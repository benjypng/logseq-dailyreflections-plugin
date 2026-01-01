import { BlockUUID } from '@logseq/libs/dist/LSPlugin.user'

import { Gospel } from '../interfaces'

export const writeToLogseq = async (uuid: BlockUUID, gospel: Gospel) => {
  const { url, reading, passage } = gospel
  // Update renderer block with header block
  await logseq.Editor.updateBlock(uuid, reading)

  // Assign block tag
  const gospelReflectionTag = await logseq.Editor.getTag('GospelReflection')
  if (!gospelReflectionTag) {
    logseq.UI.showMsg('Gospel Reflection tag not created', 'error')
    return
  }
  await logseq.Editor.addBlockTag(uuid, gospelReflectionTag.uuid)

  await logseq.Editor.upsertBlockProperty(uuid, 'gospel-url', url)

  // Insert Gospel
  await logseq.Editor.insertBlock(uuid, passage, {
    sibling: false,
  })
}
