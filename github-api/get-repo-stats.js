import { Octokit } from "octokit";
import projectsConfig from "../projects.config";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default async function getRepoStats(repo) {
  const owner = projectsConfig.organization;

  const repoData = await octokit.request("GET /repos/{owner}/{repo}", {
    owner,
    repo,
  });

  const activityData = await octokit.request(
    "GET /repos/{owner}/{repo}/stats/commit_activity",
    {
      owner,
      repo,
    }
  );
  
  const a2 = await new Promise( r => {
    setTimeout(async () => {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/stats/commit_activity",
        {
          owner,
          repo,
        }
      );
      
      r(response)
    }, 22200)
  })
  
  console.log('repo', repo)
  console.log('matches', JSON.stringify(activityData.data) === JSON.stringify(a2.data))
  console.log('\n')

  const contributorsData = await octokit.request(
    "GET /repos/{owner}/{repo}/contributors",
    {
      owner,
      repo,
    }
  );
  
  // console.log('acd', activityData)
  return {
    activity: activityData.data,
    contributors: contributorsData.data,
    repository: repoData.data,
  };
}
