import '@logseq/libs'

import { format } from 'date-fns'

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

  logseq.App.onTodayJournalCreated(async ({ title }) => {
    await handleReflections(title)
  })

  logseq.App.registerUIItem('toolbar', {
    key: 'logseq-dailyreflections-plugin',
    template: `<a class="button" data-on-click="insertReflection"><i class="ti ti-pray"></i></a>`,
  })

  logseq.provideModel({
    async insertReflection() {
      const title = format(new Date(), 'MMM do, yyyy')
      await handleReflections(title)
    },
  })
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
