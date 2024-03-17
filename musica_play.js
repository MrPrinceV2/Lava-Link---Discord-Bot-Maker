module.exports = {
  name: "playMusic",
  displayName: "Play Music",
  section: "Music Control",
  meta: {
    version: "2.1.7",
    preciseCheck: true,
    author: "Caio Sclavi",
    authorUrl: "https://ko-fi.com/caiozin",
  },
  fields: ["song", "channel", "tchannel"],
  subtitle(data) {
    return `Play ${data.song} in channel ${data.channel}`;
  },
  variableStorage(data, varType) {
    return ``;
  },
  html(isEvent, data) {
    return `
      <div style="float: left; width: 60%;">
          Song URL or Name:<br>
          <input id="song" class="round" type="text">
      </div><br>
      <div style="float: left; width: 60%;">
          Voice Channel ID:<br>
          <input id="channel" class="round" type="text">
      </div>
      <div style="float: left; width: 60%;">
          Text Channel ID:<br>
          <input id="tchannel" class="round" type="text">
      </div>
    `;
  },
  init() {},
  async action(cache) {
    const data = cache.actions[cache.index];
    const link = this.evalMessage(data.song, cache);
    const song = link.includes("&") ? link.split("&")[0] : link;
    const channelId = this.evalMessage(data.channel, cache);
    const channelIdText = this.evalMessage(data.tchannel, cache);
    const client = this.getDBM().Bot.bot;
    const targetServer = await this.getServerFromData(0, null, cache);
    const member = await this.getMemberFromData(1, null, cache);
    let res;
    try {
      // Search for tracks using a query or url, using a query searches YouTube automatically and the track requester object
      res = await client.manager.search(song, member.user);
      console.log(res);
      // Check the load type
      if (res.loadType === "empty" || res.loadType === "error") {
        console.error("Could not find the song");
        this.callNextAction(cache);
        return;
      }
    } catch (err) {
      console.error("Error while searching for the song:", err);
      this.callNextAction(cache);
      return;
    }

    let player = client.manager.get(targetServer.id);

    if (!player) {
      player = client.manager.create({
        guild: targetServer.id,
        textChannel: channelIdText,
        voiceChannel: channelId,
        selfDeafen: true,
        volume: 100,
      });
    } else {
      player.setVoiceChannel(channelId);
    }

    player.connect();
    player.queue.string = "undefined";

    if (res.loadType === "playlist") {
      player.queue.string = `Playlist: [${res.playlist.name}](${song})`;
      res.playlist.tracks.forEach((track) => player.queue.add(track));
    } else {
      player.queue.string = `[${res.tracks[0].title}](${res.tracks[0].uri}})`;
      player.queue.add(res.tracks[0]);
    }

    if (!player.playing && !player.paused) player.play();

    this.callNextAction(cache);
  },
  mod() {
    // Mod function implementation goes here if needed
  },
};
