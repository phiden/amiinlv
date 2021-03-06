Am I in Miami?
==================

Sometimes it's hard to know, because there are 34 municipalities, plus the unincorporated municipal service area (UMSA).

Install
-------

‘Am I In Miami’ (AIIM) is a Node application written in Javascript, based on [Am I In Las Vegas] (http://amiinlasvegas.com/). 

1. On a plain Ubuntu system, install the `nodejs` and `npm` packages.

    apt-get install -y nodejs npm

2. Install the additional Node `express` module:

    npm install express
    
Install on a Mac using Terminal

1. install node.js and npm
2. <code>npm install express</code>
3. <code>npm install</code>
4. <code>npm install -g gulp</code> (May need sudo for this)

Run
---

To run AIIM:

    <code>node server.js</code>

Build assets
------------

In order to build the assets, you need to install gulp (npm install -g gulp).

You are of course free to use the locally installed gulp node module if you prefer.
    node node_modules/gulp/bin/gulp.js

If you only want to run the SVG compiler and js compile, simply run gulp.

The default task will do a once-off compile and close.

The 'watch' task will monitor any js files for changes and re-run the browserify build
automatically if any appropriate files are changed.

You may also use the "npm run-script make" and "npm run-script watch" commands to invoke gulp and gulp watch respectively.

Stylesheets are now auto-generated from source [SCSS](http://sass-lang.com/) in the Express server via middleware.

Gotcha
---------------

On 3/12/15, "npm run-script watch" and "npm run-script test" failed due to a Browserify glitch. 

Changing <code>"watchify": "^2.4.0"</code> in package.json to <code>"watchify": "0.8.1"</code> resolves the error, but potentially causes others. Proceed with caution.

Browser support
---------------

- Evergreen browsers (Chrome, Firefox) - current and one previous version
- Safari - current and one previous version
- Internet Explorer 9 and above (IE8 is not supported, but there are hooks for fleshing out backwards compatibility and support should that ever become necessary)
- Mobile support: yes, but no specific minimum browsers targeted
