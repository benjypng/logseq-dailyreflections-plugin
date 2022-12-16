import "@logseq/libs";
import { preferredDateFormat } from "./utils";
import { getDateForPageWithoutBrackets } from "logseq-dateutils";
import { insertCreighton } from "./insertCreighton";

const main = async () => {
  console.log("Creighton Daily Reflections Plugin loaded");

  logseq.App.onMacroRendererSlotted(async function ({ payload }) {
    const uuid = payload.uuid;
    const [type] = payload.arguments;
    if (!type.startsWith(":dailyreflections_")) return;

    // Goto today's page
    logseq.App.pushState("page", {
      name: getDateForPageWithoutBrackets(
        new Date(),
        await preferredDateFormat()
      ),
    });

    // Insert iframe
    insertCreighton(uuid);
  });
};

logseq.ready(main).catch(console.error);
