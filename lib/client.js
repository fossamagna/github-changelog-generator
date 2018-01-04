'use strict'

const GitHubApi = require("github");
const ghauth = require('ghauth');

class Client {

  constructor() {
    this.github = new GitHubApi({
      // optional
      debug: false,
      protocol: "https",
      host: "api.github.com", // should be api.github.com for GitHub
      //pathPrefix: "/api/v3", // for some GHEs; none for GitHub
      headers: {
        "user-agent": "github-chnagelog-generator" // GitHub is happy with a unique user agent
      },
      Promise: Promise,
      followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
      timeout: 5000
    });
  }

  authenticate(authOpts) {
    if (authOpts.no_auth) {
      return Promise.resolve(this);
    }
    return new Promise((resolve, reject) => {
      ghauth({
        configName: 'github-changelog-generator',
        scopes: ['repo']
      }, (err, authData) => {
        if (err) {
          return reject(err);
        }
        this.github.authenticate({
          type: 'oauth',
          token: authData.token
        });
        resolve(this);
      });
    });
  }

  findIssues(opts) {
    let issues = [];
    const github = this.github;
    const owner = opts.owner;
    const repo = opts.repo;
    const issuesStatus = opts.issue_status;
    const labels = opts.labels;

    return new Promise((resolve, reject) => {
      function getIssues(err, res) {
        if (err) {
          return reject(err);
        }
        issues = issues.concat(res);
        if (github.hasNextPage(res)) {
          github.getNextPage(res, getIssues)
        } else {
          resolve(issues);
        }
      }

      github.issues.getMilestones({
        user: owner,
        repo: repo,
      }).then(milestones => {
        const milestone = milestones.filter(milestone => milestone.title === opts.milestone)[0];
        const issueOpts = {
          user: owner,
          repo: repo,
          state: issuesStatus
        };
        if (milestone) {
          issueOpts.milestone = milestone.number
        }
        if (labels) {
          issueOpts.labels = labels;
        }
        github.issues.getForRepo(issueOpts, getIssues);
      }).catch(e => {
        reject(e);
      });
    });
  }
}

module.exports = Client;
