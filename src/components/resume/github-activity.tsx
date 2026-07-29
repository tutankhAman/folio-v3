import { useCallback, useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

interface GitHubStats {
  publicRepos: number;
  followers: number;
}

export function GitHubActivity({ inView: _inView }: { inView?: boolean }) {
  const [stats, setStats] = useState<GitHubStats | null>(null);

  const fetchGitHubData = useCallback(async () => {
    try {
      const res = await fetch("https://api.github.com/users/tutankhAman");
      if (res.ok) {
        const userData = await res.json();
        setStats({
          publicRepos: userData.public_repos ?? 14,
          followers: userData.followers ?? 5,
        });
      }
    } catch {
      // fall back to default values
    }
  }, []);

  useEffect(() => {
    fetchGitHubData();
  }, [fetchGitHubData]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="border border-fg/[0.06] border-dashed p-3.5 transition-colors hover:border-fg/20">
          <span className="font-mono text-[9px] text-fg/30 uppercase tracking-[0.15em]">
            Public Repos
          </span>
          <div className="mt-1 font-generalsans font-medium text-[20px] text-fg">
            {stats?.publicRepos ?? "14+"}
          </div>
        </div>

        <div className="border border-fg/[0.06] border-dashed p-3.5 transition-colors hover:border-fg/20">
          <span className="font-mono text-[9px] text-fg/30 uppercase tracking-[0.15em]">
            Followers
          </span>
          <div className="mt-1 font-generalsans font-medium text-[20px] text-fg">
            {stats?.followers ?? "..."}
          </div>
        </div>

        <div className="border border-fg/[0.06] border-dashed p-3.5 transition-colors hover:border-fg/20">
          <span className="font-mono text-[9px] text-fg/30 uppercase tracking-[0.15em]">
            GitHub Profile
          </span>
          <a
            className="mt-1 flex items-center gap-1 font-generalsans font-medium text-[14px] text-fg hover:underline"
            href="https://github.com/tutankhAman"
            rel="noopener noreferrer"
            target="_blank"
          >
            @tutankhAman
            <svg
              aria-hidden="true"
              className="h-3 w-3 opacity-50"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 12 12"
            >
              <path d="M2 10L10 2M10 2H5M10 2v5" />
            </svg>
          </a>
        </div>
      </div>

      <div className="border border-fg/[0.08] bg-fg/[0.01] p-4 md:p-5">
        <GitHubCalendar
          blockMargin={3}
          blockRadius={2}
          blockSize={11}
          colorScheme="dark"
          fontSize={10}
          showWeekdayLabels={false}
          username="tutankhAman"
        />
      </div>
    </div>
  );
}
