# grunt-fingerprint

Add hashes to assets.

## The "fingerprint" task

### Overview
In your project's Gruntfile, add a section named `fingerprint` to the data object passed into `grunt.initConfig()`.

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

### Options

#### options.json
Type: `String`

The file in which to save the mappings between the old files and the renamed files.

```
% cat build/fingerprint.json
{"rewrittenFiles":{"build/admin.min.css":"build/admin-9c5d365d759b82ad3814cc2a36d5ddc94f725e08.min.css","build/main.min.css":"build/main-6df9108c43e8d7ce54337838466d126d94aa9912.min.css"}}
```

Tip: Don't access this file via in-browser JavaScript (since it could be cached).
