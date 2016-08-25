# github-changelog-generator [![NPM version][npm-image]][npm-url]
> Changelog generator from GitHub issues

## Installation

First, install github-changelog-generator using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```sh
npm install -g github-changelog-generator
```

## Usage

See `gh-change-gen --help` for detailed usage.

```
  Usage: gh-change-gen [options]

  Options:

    -h, --help                         output usage information
    -V, --version                      output the version number
    -o, --owner <owner>                owner of the GitHub repository
    -r, --repo <repo>                  name of the GitHub repository
    -m, --milestone [milestone]        title of Milestone
    -l, --labels [labels]              list of comma separated Label names. Example: bug,ui,@high
    -s, --issue_status [issue_status]  issue status
    -t, --template [template]          path to changelog template ejs file
    -f, --file [file]                  name of the file to output the changelog to [CHANGELOG.md]
```

## License

MIT © [fossamagna]()

[npm-image]: https://badge.fury.io/js/github-changelog-generator.svg
[npm-url]: https://npmjs.org/package/github-changelog-generator
