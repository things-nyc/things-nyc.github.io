import { useEffect, useState } from 'react';
import reposData from '../data/repos.json';

interface Repo {
  url: string;
  desc: string;
  tags: string[];
}

interface GitHubRepoData {
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  html_url: string;
}

interface RepoWithData extends Repo {
  githubData?: GitHubRepoData;
  loading: boolean;
  error?: string;
}

export default function Repos() {
  const [repos, setRepos] = useState<RepoWithData[]>([]);

  useEffect(() => {
    const fetchRepoData = async (repo: Repo): Promise<RepoWithData> => {
      const urlParts = repo.url.split('/');
      const owner = urlParts[3];
      const repoName = urlParts[4];

      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data: GitHubRepoData = await response.json();
        return { ...repo, githubData: data, loading: false };
      } catch (error) {
        return { ...repo, loading: false, error: 'Failed to load data' };
      }
    };

    const loadRepos = async () => {
      const promises = reposData.map(repo => fetchRepoData(repo));
      const results = await Promise.all(promises);
      setRepos(results);
    };

    loadRepos();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Our Repositories</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore the projects our team is actively contributing to.
          These repositories power The Things Network and IoT development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {repos.map((repo, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  {repo.githubData?.name || repo.url.split('/').pop()}
                </h3>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-slate-700"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>

              <p className="text-slate-700 mb-4 leading-relaxed">
                {repo.desc}
              </p>

              {repo.loading && (
                <div className="text-slate-500 text-sm">Loading repository data...</div>
              )}

              {repo.error && (
                <div className="text-red-500 text-sm">{repo.error}</div>
              )}

              {repo.githubData && (
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {repo.githubData.stargazers_count}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 3c0-1.1.9-2 2-2s2 .9 2 2c0 .74-.4 1.39-1 1.73V7h2c1.1 0 2 .9 2 2v2.27c.59.34 1 .99 1 1.73 0 1.1-.9 2-2 2-.74 0-1.39-.4-1.73-1H8c-.27 0-.52-.11-.71-.29L5.79 12H3c-1.1 0-2-.9-2-2V7.73C.4 7.39 0 6.74 0 6c0-1.1.9-2 2-2s2 .9 2 2c0 .74.4 1.39 1 1.73V3z"/>
                      </svg>
                      {repo.githubData.forks_count}
                    </div>
                    {repo.githubData.language && (
                      <span className="px-2 py-1 bg-slate-100 rounded text-xs">
                        {repo.githubData.language}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-500">
                    Last updated: {new Date(repo.githubData.updated_at).toLocaleDateString()}
                  </div>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {repo.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
