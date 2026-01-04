import '@logseq/libs'

import { settings } from './settings'
import { handleReflections } from './utils/handle-reflections'

const main = async () => {
  logseq.UI.showMsg('logseq-dailyreflections-plugin loaded')

  //NOTE: Am removing the below as plugin created properties doesn't play nice with sync
  //setTimeout(async () => {
  //  const getCreateUrlProp = async () => {
  //    const page = await logseq.Editor.getPage('gospel-url')
  //    if (page) return page
  //    return (await logseq.Editor.upsertProperty('gospel-url', {
  //      type: 'url',
  //      cardinality: 'one',
  //    })) as PageEntity
  //  }
  //  const getCreateReflectionTag = async () => {
  //    const page = await logseq.Editor.getPage('GospelReflection')
  //    if (page) return page
  //    return await logseq.Editor.createTag('GospelReflection')
  //  }
  //  try {
  //    const [gospelUrlProp, gospelReflectionTag] = await Promise.all([
  //      getCreateUrlProp(),
  //      getCreateReflectionTag(),
  //    ])
  //    if (!gospelUrlProp || !gospelReflectionTag) {
  //      throw new Error('Entity creation failed')
  //    }
  //    await logseq.Editor.addTagProperty(
  //      gospelReflectionTag.uuid,
  //      gospelUrlProp.uuid,
  //    )
  //  } catch (error) {
  //    console.error(error)
  //    logseq.UI.showMsg(
  //      'logseq-dailyreflections-plugin: Unable to create necessary tag and prop',
  //      'error',
  //    )
  //  }
  //}, 1000)

  logseq.App.onMacroRendererSlotted(async function ({ payload }) {
    const uuid = payload.uuid
    const [type] = payload.arguments
    // Assumes that a template was used to created {{renderer :dailyreflections_}}
    if (!type || !type.startsWith(':dailyreflections_')) return
    await handleReflections(uuid)
  })
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
