module.exports = {
  name: "resumeMusic",
  displayName: "Resume Music",
  section: "Music Control",
  meta: {
    version: "1.0.0",
    preciseCheck: true,
    author: "Izaya Pantovich",
    authorUrl: "https://patreon.com/zayyo_o?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink",
  },
  fields: [],
  subtitle(data) {
    return ``;
  },
  variableStorage(data, varType) {
    return ``;
  },
  html() {
    return ``;
  },
  init() {},
  async action(cache) {
    try {
      const targetServer = await this.getServerFromData(0, null, cache);
      const client = this.getDBM().Bot.bot;
      const player = client.manager.get(targetServer.id);
      if (player) {
        player.pause(false);
      }
    } catch (error) {
      console.error("Error resuming music:", error);
    }
    this.callNextAction(cache);
  },
  mod() {},
};
