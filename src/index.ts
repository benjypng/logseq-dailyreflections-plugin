import '@logseq/libs'

import { handleReflections } from './handle-reflections'
import { settings } from './settings'
import { getDateForPageWithoutBrackets } from 'logseq-dateutils'

const main = async () => {
  console.log('Creighton Daily Reflections Plugin loaded')

  logseq.provideModel({
    async insertReflection() {
      const { preferredDateFormat } = await logseq.App.getUserConfigs()
      const todayPageName = getDateForPageWithoutBrackets(
        new Date(),
        preferredDateFormat,
      )
      const blk = await logseq.Editor.appendBlockInPage(todayPageName, '')
      if (blk) {
        await handleReflections(blk.uuid)
      }
    },
  })

  logseq.App.registerUIItem('toolbar', {
    key: 'logseq-dailyreflections-plugin',
    template: `<a class="button datenlp-toolbar" data-on-click="insertReflection"><i class="ti ti-cross"></i></a>`,
  })

  logseq.App.onMacroRendererSlotted(async function ({ payload }) {
    const uuid = payload.uuid
    const [type] = payload.arguments

    // Assumes that a template was used to created {{renderer :dailyreflections_}}
    if (!type || !type.startsWith(':dailyreflections_')) return

    await handleReflections(uuid)
  })
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
