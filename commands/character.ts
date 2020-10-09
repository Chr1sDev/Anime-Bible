const Discord7 = require('discord.js');
module.exports = {
    name: 'character',
    description: '',
    execute(msg, args) {

        const fetch = require('node-fetch');

        var input = msg.content.substr(12);

        var searchURL = `https://api.jikan.moe/v3/search/character?q=${input}&page=1`;

        fetch(searchURL)
        .then(res => res.json())
        .then((api) => {

            const { name, image_url, url, mal_id } = api.results[0];
            const animeName = api.results[0].anime[0].name;
            const animeUrl = api.results[0].anime[0].url;

            const aboutEmbed = new Discord7.MessageEmbed()
            .setAuthor(`${name}`, `${image_url}`,`${url}`)
            .setColor('#02f2ce')
            .setDescription(`Found in: [${animeName}](${animeUrl})`)
            .setFooter(`MyAnimeList id: ${mal_id}`, `https://chr1s.dev/assets/animelist.png`)
            .setThumbnail(`${image_url}`)
            msg.channel.send(aboutEmbed)

        })
        .catch(handleError);

        function handleError(error) {
            msg.channel.send(`\**Error:\** Invalid character name!`);
            //console.error(error);
        }

    },
}

/*
const aboutEmbed = new Discord7.MessageEmbed()
.setAuthor(`Quote from ${anime}:`, `https://chr1s.dev/assets/animelist.png`,`https://animechanapi.xyz/`)
.setColor('#02f2ce')
.setDescription(`${quote}\n **- ${character}**`)
msg.channel.send(aboutEmbed)
*/