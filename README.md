# grunt-fingerprint

Add hashes to assets.

## Installation

First, make sure old fingerprinted files get deleted, otherwise your files will end up with multiple hashes. [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean) will do this for you.

Then, add the package:

```
yarn add --dev git+https://github.com/dxw/grunt-fingerprint.git
```

Add the following to your `Gruntfile.js`:

```js
grunt.loadNpmTasks('@dxw-digital/grunt-fingerprint')
```

```js
grunt.initConfig({
  fingerprint: {
    production: {
      options: {
        json: 'build/fingerprint.json',
      },
      src: [
        'build/*.min.css',
      ],
    },
  },
});
```

Now, `grunt fingerprint` will move `build/main.min.css` to `build/main-da39a3ee5e6b4b0d3255bfef95601890afd80709.min.css` and leave a JSON file in `build/fingerprint.json` with a mapping between the old file and the new.

```
% jq . < build/fingerprint.json
{
  "rewrittenFiles": {
    "build/main.min.css": "build/main-da39a3ee5e6b4b0d3255bfef95601890afd80709.min.css"
  }
}
```

Note: I recommend not accessing the JSON file via in-browser JS because it will be cached.
