module.exports = {
  name: "LavaLinkConnect",
  displayName: "Connect to Lavalink server",
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
    const { MessageEmbed } = require("discord.js");
    const { Manager } = require("magmastream");
    const client = this.getDBM().Bot.bot;

    // Initialize Lavalink manager
    client.manager = new Manager({
      nodes: [
        {
          host: "IP HERE",
          password: "PASSWORD HERE",
          port: 2333,
          secure: false,
        },
      ],
      send: (id, payload) => {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    });

    // Event: Node connected
    client.manager.on("nodeConnect", (node) => {
      console.log(`Node "${node.options.identifier}" connected.`);
    });

    // Event: Node encountered an error
    client.manager.on("nodeError", (node, error) => {
      console.error(
        `Node "${node.options.identifier}" encountered an error: ${error.message}.`
      );
    });

    // Forward raw events to Magmastream
    client.on("raw", (d) => client.manager.updateVoiceState(d));
    client.manager.init(client.user.id);

    // Event: Track starts playing
    client.manager.on("trackStart", (player, track) => {
      const channel = client.channels.cache.get(player.textChannel);
      if (channel) {
        channel.send({
          embeds: [
            new MessageEmbed()
              .setTitle("Playing:")
              .setDescription(`[${track.title}](${track.uri})`),
          ],
        });
      }
    });

    // Event: Player queue ends
    client.manager.on("queueEnd", (player) => {
      player.destroy();
    });

    // Event: Socket closed unexpectedly
    client.manager.on("socketClosed", (player, payload) => {
      player.destroy();
    });

    // Event: Track ends
    /*
    client.manager.on("trackEnd", (player, track, payload) => {
      console.log("------------------------------");
      console.log("Type: " + payload.type)
      console.log("Reason: " + payload.reason)
      console.log("------------------------------");
    });

    // Event: Track error
    client.manager.on("trackError", (player, track, payload) => {
      console.log("------------------------------");
      console.log("Type: " + payload.type)
      console.log("cause: " + payload.exception.cause)
      console.log("message: " + payload.exception.message)
      console.log("severity: " + payload.exception.severity)
      console.log("full: " + payload.exception)
      console.log("------------------------------");
    });

    // Event: Track gets stuck
    client.manager.on("trackStuck", (player, track, payload) => {
      console.log("------------------------------");
      console.log("Type: " + payload.type)
      console.log("ThresholdMs: " + payload.thresholdMs)
      console.log("------------------------------");
    });
    */

    // Continue to the next action in DBM
    this.callNextAction(cache);
  },
  mod() {},
};
