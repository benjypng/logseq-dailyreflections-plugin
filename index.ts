import '@logseq/libs';

const main = async () => {
  console.log('Creighton Daily Reflections Plugin loaded');

  // Function to insert Creighton Block, and edit block after
  const insertCreighton = async (currentPage: object) => {
    const currPage: any = currentPage;

    // Extract date from journal page in Creighton's format
    const todaysDate = () => {
      const strJournalDay = currPage.journalDay.toString();
      return strJournalDay.slice(-4) + strJournalDay.slice(2, 4);
    };

    try {
      // Set template array to be inserted
      const batchBlkArr = [
        {
          content: `[[Creighton Daily Reflections]]
        @@html: <iframe src="https://onlineministries.creighton.edu/CollaborativeMinistry/${todaysDate()}.html" height="500"></iframe>@@`,
        },
        { content: `[[What am I grateful for]]` },
        { content: `[[Prayer list]]` },
        { content: `[[Brain dump]]` },
      ];

      // Insert block for template array to be inserted under
      const targetBlock = await logseq.Editor.insertBlock(
        currPage.name,
        `[[MornRef ☀️]]`,
        { isPageBlock: true }
      );

      // Insert template array
      await logseq.Editor.insertBatchBlock(targetBlock.uuid, batchBlkArr, {
        before: false,
        sibling: false,
      });

      // Insert empty block under reflection block
      const reflectionBlock = await logseq.Editor.getBlock(targetBlock.uuid, {
        includeChildren: true,
      });

      // Insert empty block
      const targetBlock2 = await logseq.Editor.insertBlock(
        reflectionBlock.children[0]['uuid'],
        '',
        {
          before: false,
          sibling: false,
        }
      );

      // Set edit cursor to empty block
      await logseq.Editor.editBlock(targetBlock2.uuid);
    } catch (e) {
      console.log(e);
    }
  };

  // Provide logseq model
  logseq.provideModel({
    async insertReflection() {
      // Get current page
      const currentPage = await logseq.Editor.getCurrentPage();
      // Check currentPage so error message shows on homepage and check journal so error message shows on pages
      if (currentPage && currentPage['journal?'] === true) {
        // Insert iframe
        insertCreighton(currentPage);
      } else {
        // Display error message if trying to add reflection on non-Journal page
        logseq.App.showMsg(
          'This function is only available on a Journal page as the date is needed to pull the respective reflection.'
        );
      }
    },
  });

  // Register UI
  logseq.App.registerUIItem('toolbar', {
    key: 'logseq-dailyreflections-plugin',
    template: `
      <a data-on-click="insertReflection"
        class="button">
        <i class="ti ti-medical-cross"></i>
      </a>
`,
  });
};

logseq.ready(main).catch(console.error);
