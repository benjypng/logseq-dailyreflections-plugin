import "@logseq/libs";
import { PageEntity } from "@logseq/libs/dist/LSPlugin.user";
import { preferredDateFormat } from "./utils";
import { getDateForPageWithoutBrackets } from "logseq-dateutils";
import { insertCreighton } from "./insertCreighton";

const main = async () => {
  console.log("Creighton Daily Reflections Plugin loaded");

  // Provide logseq model
  logseq.provideModel({
    async insertReflection() {
      // Goto today's page
      logseq.App.pushState("page", {
        name: getDateForPageWithoutBrackets(
          new Date(),
          await preferredDateFormat()
        ),
      });

      // Get current page
      const currentPage: PageEntity =
        (await logseq.Editor.getCurrentPage()) as PageEntity;

      // Insert iframe
      insertCreighton(currentPage);
    },
  });

  // Register UI
  logseq.App.registerUIItem("toolbar", {
    key: "logseq-dailyreflections-plugin",
    template: `<a data-on-click="insertReflection" class="button"><i class="ti ti-pray"></i></a>`,
  });
};

logseq.ready(main).catch(console.error);
