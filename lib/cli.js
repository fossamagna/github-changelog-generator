'use strict'

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const Client = require('./client');

module.exports = function (opts) {
  new Client().authenticate(opts).then(client => {
    return client.findIssues(opts);
  }).then(issues => {
    const template = fs.readFileSync(opts.template, {encoding: 'utf8'});
    const changelog = ejs.render(template, {issues: issues}, {});
    let file = opts.file;
    if (!path.isAbsolute(file)) {
      file = path.resolve(process.cwd(), file);
    }
    fs.writeFile(file, changelog, {encoding: 'utf8'}, err => {
      if (err) {
        console.error(err);
      }
    });
  }).catch(e => {
    console.error(e);
  });
}
