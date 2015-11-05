This is an HTML5 app to plan out musical arrangements.

It's pretty limited. It was designed for the arrangements
that I like to [work on](https://soundcloud.com/dj_bylamplight)
which are made up of only a few repeating parts with turn-arounds.

A lot of code was lifted from [mrcoles.com/piano/](http://mrcoles.com/piano/).

# Installation

You'll need [Node JS](https://nodejs.org/) for build management:

    npm install

You need [grunt](http://gruntjs.com/) installed and available on your PATH.
Install it globally like:

    npm install -g grunt

## Developing on the app

Install and compile the assets:

    grunt build

Open `public/index.html` in a browser.

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

# License

MIT
