import fetch from 'node-fetch';
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
  const TENOR_TOKEN = core.getInput('TENOR_TOKEN');

  const randomPos = Math.round(Math.random() * 1000);
  // Tenor API
  const url = `https://tenor.googleapis.com/v2/search?q=thank%20you&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`;

  const response = await fetch(url);
  const { results } = await response.json();
  const gifUrl = results[0].media_formats.tinygif.url;

  const octokit = github.getOctokit(GITHUB_TOKEN);

  const { context = {} } = github;
  const { pull_request } = context.payload;

  await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: `Thank you for submitting a pull request! I will try to review this as soon as we can.\n\n<img src="${gifUrl}" alt="thank you" />`
  });

}

run();
