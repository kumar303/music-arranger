This is a web app that lets you plan out musical chord arrangements.

It's pretty limited. It was designed for the arrangements
that I like to [work on](https://soundcloud.com/dj_bylamplight)
which are made up of only a few repeating chords and maybe some turn-arounds.

[![Build Status](https://travis-ci.org/kumar303/music-arranger.svg?branch=master)](https://travis-ci.org/kumar303/music-arranger)

# Launching the App

You can use the app in your web browser from
[kumar303.github.io/music-arranger/](http://kumar303.github.io/music-arranger/).

# Developing the app

If you want to work on the app locally, first clone the source.
You'll need [Node JS](https://nodejs.org/) for build management.
Run this within the source directory to install all dependencies:

    npm install

You need [grunt](http://gruntjs.com/) installed and available on your PATH.
Install it globally like:

    npm install -g grunt

## Installation

Install and compile the assets:

    grunt build

You can now use your local copy of the app by opening
`public/index.html` in a browser.

You can keep this running in a shell to continuously rebuild the JS/CSS bundle
anytime you edit a file:

    grunt watch-build

## Run tests

Run all Javascript tests in a web browser and execute lint checks:

    grunt test

For faster tests you can run tests continuously as you edit files:

    grunt watch-test

## Developing With The Hot Reloader

The hot reloading server will make changes appear instantly on the page as you
edit React component code. It's pretty hot! Run it like this:

    grunt serve

Open:

    http://localhost:8080/webpack-dev-server/

## Publishing To Github Pages

To publish the app to Github Pages from the source, run this:

    grunt gh-publish

# Credits

Some code (mostly piano styles) came from
[mrcoles.com/piano/](http://mrcoles.com/piano/).

# License

MIT
