# Lavalink Integration with DBM Actions and Raw Data

This integration harnesses the power of the Magmastream player, enabling seamless functionality within DBM (Discord Bot Maker).

These modules are designed to be utilized with slash commands, but can also function with regular messages by adjusting the file configurations accordingly.

This represents a more refined and comprehensive iteration of the project initially found at: [GitHub Repository](https://github.com/Caio-Sc/lavalink---dbm)

If you wish to support this endeavor, kindly consider contributing via my Patreon page ([link](https://patreon.com/zayyo_o?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink)). Alternatively, feel free to reach out to me on Discord or initiate a discussion for other donation methods.

## Musica Connect

Primarily, modifications will likely be required within the "musica_connect" and "musica_play" scripts. Within "musica_connect," attention should be directed to lines 31, 32, 33, and occasionally 34, for establishing connections to the Lavalink server. Additionally, customization options exist for handling song initiation, queue completion, and bot disconnection events. Presently, the script is configured to dispatch an embed upon song commencement and to disconnect the bot upon queue completion. Optionally, the "trackEnd" section can be uncommented for further customization.

![Musica Connect](https://media.discordapp.net/attachments/1158573678951399485/1218811082987278448/image.png?ex=66090546&is=65f69046&hm=29477a0605cec86effde339806b9d8885b2da574f9e64db5dad14de578d13d39&=&format=webp&quality=lossless)

## Musica Play

Within "musica_play," attention may be warranted for customization, particularly in the section highlighted below:

![Musica Play](https://media.discordapp.net/attachments/1158573678951399485/1218811471656652880/image.png?ex=660905a3&is=65f690a3&hm=87d4e74b0c220f70c2eecea5015d9c302ebdfa163575172fa55d0b49cef4f9ed&=&format=webp&quality=lossless)

This section facilitates the presentation of added music to the queue. Presently, it displays the song's name in hyperlink format, which may not be suitable for non-embedded messages. To accommodate standard messages, simply remove the "(link)" and the brackets.

## DBM Action & Event Names

**Actions:**
- Play Music: Facilitates the addition of songs to the queue, with customizable elements within.
- Pause Music: Temporarily suspends the playback of the current song, unless it's already paused.
- Store Player: Enables versatile use, often employed for managing queues.
- Resume Music: Resumes playback of the current song if it was paused.
- Skip Music: Advances to the next song in the queue.
- Stop Music: Initiates disconnection from the channel, halting playback.

**Events:**
- Connect to Lavalink Server: Establishes connection with the designated Lavalink server.

## Optimal Hosting Setup

The recommended hosting approach involves setting up the Pterodactyl Panel ([link](https://pterodactyl.io)) and acquiring a VPS, VDS, or dedicated server. AdvinServers ([link](https://clients.advinservers.com/aff.php?aff=523)) is suggested as a reliable hosting provider. After configuring the Pterodactyl Panel or engaging AdvinServers' setup services, proceed to obtain a Node.js egg and a Lavalink egg. Subsequently, install and deploy these eggs, add your bot files to the Node.js egg, and proceed with the setup process.

Should you require assistance with setup, I offer my services at a nominal fee of $5. Please note that you are responsible for obtaining your server, and if you opt for my hosting services, a monthly fee of at least $15 applies. Additionally, I specialize in hosting Discord bots exclusively, starting at a minimum of $2.50 per month.

Personally, I utilize the VDS Server Specifications (KVM Ryzen VDS 32GB):
- AMD Ryzen 9 5950X (8 vCPU)
- 8 dedicated vCPUs
- 32GB DDR4 ECC Memory
- 480GB NVMe SSD Storage
- 16TB Bandwidth (1 Gbps)
- Standard Support Tier

## Conclusion

These modules are designed for integration with slash commands. By placing all .js files in the actions folder, a "Music Control" section will be available within your DBM interface. Simply copy all events and commands from the provided GitHub repository. Note that the folders are pending creation as I address an ongoing issue. Furthermore, create an event for one-time bot initialization in the event tab and utilize the Lavalink connect command. If configured correctly, your server should establish a connection seamlessly.

## Additional Requirements

Please ensure the installation of the "magmastream" module for optimal functionality.
