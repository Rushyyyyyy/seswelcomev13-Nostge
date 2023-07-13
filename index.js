const { Client, Intents } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

const tokens = [
  "MTA5OTcxMDkxMTEyMTQ2MTI4OA.GqHg22.akoPbR5H0czeLIK4PJ72YB95fzNer68wzEIdLI"
];

const chnls = [
  "1127939087098200227"
];

const selamlı = [];

for (let index = 0; index < tokens.length; index++) {
  const token = tokens[index];
  const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

  client.login(token);

  let player;
  let connection;

  client.once('ready', async () => {
    console.log(client.user.username);
    await client.user.setActivity({
      name: "Nostge Team ",
      type: "LISTENING"
    });

    const channel = client.channels.cache.get(chnls[index]);
    if (channel) {
      connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
      });

      player = createAudioPlayer();
      connection.subscribe(player);
    }
  });

  client.on('voiceStateUpdate', async (prev, cur) => {
    if (cur.member.user.bot) return;
    if (cur.channel && cur.channel.id === chnls[index]) {
      if (cur.channelId === prev.channelId) return;
      await cur.guild.roles.fetch();

      if (cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get('1127939342367731753').rawPosition) { // Yetkili Id'si
        const resource = createAudioResource('./welcome.mp3');
        player.play(resource);
        selamlı.push(cur.member.user.id);
      } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get('1127939349892309022').rawPosition) { // Hosgeldin id'si
        const resource = createAudioResource('./staff.mp3');
        player.play(resource);
        selamlı.push(cur.member.user.id);
      }
    }
  });
}