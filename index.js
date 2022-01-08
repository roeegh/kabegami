// Module imports.
const { load } = require('cheerio');
const { default: { get } } = require('axios');

// Default values.
const URL = 'https://wallpaper-a-day.com/';

/**
 * @async
 * @returns {Promise} An object containing a wallpaper.
**/

async function getWallpaper() {
    let time = new Date()
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await get(URL).catch(() => reject(new Error(_))),
            $ = load(data),
            main = $('.entry-content').first().find('p').map((i, el) => el.childNodes);

            resolve({
                day: main[0].data.split(' ')[1].slice(0, -1),
                title: main[0].data.split(' ')[2],
                url: main[1].attribs.href,
                quality: main[1].childNodes[0].data.substring(0, main[1].childNodes[0].data.indexOf('p') + 1),
                credit: {
                    name: main[3].childNodes[0].data,
                    url: main[3].attribs.href
                },
                postedOn: $('.published-on').first().children().text(), 
                ping: new Date() - time
            });
        } catch (_) {
            reject(new Error(_));
        }
    });
}

/**
 * A module to fetch a random wallpaper.
 * @exports getWallpaper()
**/

module.exports = getWallpaper;
module.exports.getWallpaper = getWallpaper;