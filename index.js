const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const readline = require('readline');

const rlConsole = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rlConsole.question('Enter the server name to check: ', (sunucuIsmi) => {
  rlConsole.close();

  const rl = readline.createInterface({
    input: fs.createReadStream('tokens.txt'),
    crlfDelay: Infinity
  });

  rl.on('line', (token) => {
    const client = new Client({ checkUpdate: false });

    client.once('ready', () => {
      console.log(`${client.user.tag} The user account named has been logged in!`);

      const serverNames = client.guilds.cache.map(guild => guild.name);

      if (serverNames.includes(sunucuIsmi)) {
        const specialData = `${token} | ${sunucuIsmi} Available on server\n`;

        fs.appendFile('special.txt', specialData, (err) => {
          if (err) {
            console.error('Error occurred while saving token:', err);
          } else {
            console.log('The token is saved in the special.txt file.');
          }
        });
      } else {
        const goodsData = `${token} | ${sunucuIsmi} Its not on the server!\n`;

        fs.appendFile('goods.txt', goodsData, (err) => {
          if (err) {
            console.error('An error occurred while saving the token:', err);
          } else {
            console.log('The token is saved in the goods.txt file.');
          }
        });
      }
    });

    client.login(token).catch(err => console.error('An error occurred while logging in:', err));
  });
});
