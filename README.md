# Kabegami

**Purpose:** This module was created to scrape the latest wallpaper from [wallpaper-a-day](https://wallpaper-a-day.com/).

**Source:** [wallpaper-a-day.com](https://wallpaper-a-day.com/)

## Install

```
$ npm install kabegami
```

## Import

You can import the module itself or deconstruct the `getWallpaper` function, either of the following is a vaild import:

```js
const getWallpaper = require('@aahlw/kabegami');

const { getWallpaper } = require('@aahlw/kabegami');
```

## Usage

Example code can be located in the [test.js](./test.js) file.

```js
const { getWallpaper } = require('./index');
(async _ => console.log(await getWallpaper()))();

// Response:
{
  day: '2732',
  title: 'Touhou',
  url: 'https://i.imgur.com/YvW0ehx.jpg',
  quality: '2160p',
  credit: { 
    name: 'つね',
    url: 'https://www.pixiv.net/en/artworks/95343311'
  },
  postedOn: 'January 7, 2022',
  ping: 394
}
```

## Explanation

```js
{
  day: '2732', // The day of the wallpaper
  title: 'Touhou', // The title of the wallpaper
  url: 'https://i.imgur.com/YvW0ehx.jpg', // The url of the wallpaper
  quality: '2160p', // The quality of the wallpaper
  credit: { 
    name: 'つね', // The name of the artist
    url: 'https://www.pixiv.net/en/artworks/95343311' // The url of the artist
  },
  postedOn: 'January 7, 2022', // The date the wallpaper was posted
  ping: 394 // Scrape and parse process time (MS)
}
```

## Example

The following example is very oversimplied but gives a rough idea on how to implement it in your [discord.js v13](https://discord.js.org) bot:

```js
const { getWallpaper } = require('@aahlw/kabegami');

<Client>.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.content.toLowerCase() === '!wallpaper') {

        // Request data.
        let data = await getWallpaper();
        if (!data) return message.channel.send('An error occured, try again later.');

        // Send response.
        return message.channel.send({
            embeds: [{
                color: 0x43B581,
                title: data.title,
                url: data.url,
                description: `Day #${data.day}`,
                image: { url: data.url },
                footer: { text: `Posted on ${data.postedOn}` },
                author: { name: data.credit.name, url: data.credit.url }
              }]
        });
    }
});
```
