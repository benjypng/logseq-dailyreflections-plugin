import { PageEntity } from "@logseq/libs/dist/LSPlugin.user";
import { parseText } from "./utils";

export async function insertCreighton(currentPage: PageEntity) {
  // Set template array to be inserted
  //const reflectionBatchBlk = [
  // { content: `What resonates with me from today's reading?` },
  // { content: `What do I have to be grateful for?` },
  // {
  //   content:
  //     "What happened in the past day? What thoughts, words and actions did I have?",
  // },
  // { content: "Who do I have to pray for?" },
  //];

  // Insert block for template array to be inserted under
  const mornRefBlock = await logseq.Editor.insertBlock(
    currentPage.name,
    `[[MornRef ☀️]]`,
    { isPageBlock: true }
  );

  // Insert Reflections
  const creightonBlk = await logseq.Editor.insertBlock(
    mornRefBlock!.uuid,
    `[[Creighton Daily Reflections]]
${await parseText()}`,
    {
      before: false,
      sibling: false,
    }
  );

  const wordCountBlk = await logseq.Editor.insertBlock(
    creightonBlk!.uuid,
    "[[My Reflections]] {{renderer :wordcount_dailyreflections}}",
    {
      before: false,
      sibling: true,
    }
  );

  // Insert empty block
  const editBlock = await logseq.Editor.insertBlock(wordCountBlk!.uuid, "", {
    before: false,
    sibling: false,
  });

  // Set edit cursor to empty block
  await logseq.Editor.editBlock(editBlock!.uuid);
}
