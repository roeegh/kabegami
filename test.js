// Import deconstructed module.
const { getWallpaper } = require('./index');
(async _ => console.log(await getWallpaper()))();

// Import module itself.
const alsoGetWallpaper = require('./index');
(async _ => console.log(await alsoGetWallpaper()))();