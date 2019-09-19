/* to run: babel-node albums.js */

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({
  token:
    'BQAZqEL2_klXkEkdalrQyAKjTKGY0IixWvJbEPTuZYAWEePbVutg7HxgFm2PK412FUXFHLuV683f9xvAjFr6zeFObrvWshEpGDxFZgdqmOvx2rlFmkJf1A8qJS4mvxvOL8_ZsYYvgg7PTw',
});

const albums = spotify.search.albums('Incubus');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
