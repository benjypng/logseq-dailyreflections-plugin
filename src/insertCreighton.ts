import { PageEntity } from "@logseq/libs/dist/LSPlugin.user";
import { parseText } from "./utils";

export async function insertCreighton(currentPage: PageEntity) {
  // Insert block for template array to be inserted under
  const targetBlock = await logseq.Editor.insertBlock(
    currentPage.name,
    `[[MornRef ☀️]]`,
    { isPageBlock: true }
  );

  // Set template array to be inserted
  const batchBlkArr = [
    {
      content: `[[Creighton Daily Reflections]]
${await parseText()}`,
    },
    { content: `[[Prayer list]]` },
  ];

  // Insert template array
  await logseq.Editor.insertBatchBlock(targetBlock.uuid, batchBlkArr, {
    before: false,
    sibling: false,
  });

  // Insert empty block under reflection block
  const reflectionBlock = await logseq.Editor.getBlock(targetBlock.uuid, {
    includeChildren: true,
  });
  const targetBlock2 = await logseq.Editor.insertBlock(
    reflectionBlock.children[0]["uuid"],
    "{{renderer :wordcount_dailyreflections}}",
    {
      before: false,
      sibling: false,
    }
  );

  // Insert empty block
  const wordcountBlock = await logseq.Editor.insertBlock(
    targetBlock2.uuid,
    "",
    {
      before: false,
      sibling: false,
    }
  );

  // Set edit cursor to empty block
  await logseq.Editor.editBlock(wordcountBlock.uuid);
}
