import { BlockUUID } from '@logseq/libs/dist/LSPlugin.user'

import { Gospel } from '../interfaces'

export const writeToLogseq = async (uuid: BlockUUID, gospel: Gospel) => {
  const { url, reading, passage } = gospel
  // Update renderer block with header block
  await logseq.Editor.updateBlock(uuid, reading)

  const gospelReflectionTag = await logseq.Editor.getPage('gospelreflection')
  if (!gospelReflectionTag) {
    logseq.UI.showMsg('Gospel Reflection tag not created', 'error')
    return
  }

  const gospelUrlProp = await logseq.Editor.getPage('gospel-url')
  if (!gospelUrlProp || !gospelUrlProp.ident) {
    logseq.UI.showMsg('Gospel URL prop not created', 'error')
    return
  }
  const gospelUrlPropIdent = gospelUrlProp.ident

  await logseq.Editor.addBlockTag(uuid, gospelReflectionTag.uuid)

  await logseq.Editor.upsertBlockProperty(uuid, gospelUrlPropIdent, url)

  // Insert Gospel
  await logseq.Editor.insertBlock(uuid, passage, {
    sibling: false,
  })
}
