import { getInput } from '@actions/core';
import github, { getOctokit } from '@actions/github';

async function run() {
  const GITHUB_TOKEN = getInput('GITHUB_TOKEN');

  const octokit = getOctokit(GITHUB_TOKEN);

  const { context = {} } = github;
  const { pull_request } = context.payload;

  await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: 'Thank you for submitting a pull request!'
  });
}

run();
