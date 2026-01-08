import { Gospel } from '../interfaces'

export const writeToLogseq = async (pageTitle: string, gospel: Gospel) => {
  const { url, reading, passage } = gospel
  const block = await logseq.Editor.appendBlockInPage(pageTitle, reading)
  if (!block) {
    logseq.UI.showMsg('Unable to create reflections block', 'error')
    return
  }

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

  await logseq.Editor.addBlockTag(block.uuid, gospelReflectionTag.uuid)

  await logseq.Editor.upsertBlockProperty(block.uuid, gospelUrlPropIdent, url)

  // Insert Gospel
  await logseq.Editor.insertBlock(block.uuid, passage, {
    sibling: false,
  })
}
