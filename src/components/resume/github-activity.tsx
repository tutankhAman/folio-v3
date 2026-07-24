import { useCallback, useEffect, useMemo, useState } from "react";

interface CommitEvent {
  id: string;
  repoName: string;
  repoUrl: string;
  commitMsg: string;
  branch: string;
  date: string;
  url: string;
}

interface GitHubStats {
  publicRepos: number;
  followers: number;
  createdAt: string;
  avatarUrl: string;
}

interface RawCommitPayload {
  sha?: string;
  message?: string;
}

interface RawEventItem {
  id: string;
  type: string;
  created_at: string;
  repo?: { name?: string };
  payload?: {
    commits?: RawCommitPayload[];
    ref?: string;
    ref_type?: string;
  };
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface RawContribDay {
  date: string;
  contributionCount?: number;
  contributionLevel?: string;
}

const LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const FALLBACK_COMMITS: CommitEvent[] = [
  {
    id: "c1",
    repoName: "tutankhAman/folio-v3",
    repoUrl: "https://github.com/tutankhAman/folio-v3",
    commitMsg:
      "Revamp portfolio resume with scroll transitions & GitHub history",
    branch: "main",
    date: new Date().toISOString(),
    url: "https://github.com/tutankhAman/folio-v3",
  },
  {
    id: "c2",
    repoName: "tutankhAman/verq",
    repoUrl: "https://github.com/tutankhAman/verq",
    commitMsg:
      "Optimize Gemini voice transcription stream and feedback latency",
    branch: "main",
    date: new Date(Date.now() - 86_400_000 * 2).toISOString(),
    url: "https://github.com/tutankhAman/verq",
  },
  {
    id: "c3",
    repoName: "tutankhAman/arkaiv",
    repoUrl: "https://github.com/tutankhAman/arkaiv",
    commitMsg: "Enhance automated arXiv web scraper with Hugging Face models",
    branch: "main",
    date: new Date(Date.now() - 86_400_000 * 5).toISOString(),
    url: "https://github.com/tutankhAman/arkaiv",
  },
  {
    id: "c4",
    repoName: "singularityworks-xyz/larity",
    repoUrl: "https://github.com/singularityworks-xyz/larity",
    commitMsg: "Implement workflow memory context buffer for assistant API",
    branch: "security-fixes",
    date: new Date(Date.now() - 86_400_000 * 10).toISOString(),
    url: "https://github.com/singularityworks-xyz/larity",
  },
];

function getLevelFromCount(count: number): number {
  if (count > 8) {
    return 4;
  }
  if (count > 5) {
    return 3;
  }
  if (count > 2) {
    return 2;
  }
  if (count > 0) {
    return 1;
  }
  return 0;
}

function generateFallbackGrid(events: CommitEvent[]): ContributionDay[][] {
  const grid: ContributionDay[][] = [];
  const today = new Date();

  const eventCounts: Record<string, number> = {};
  for (const ev of events) {
    const d = ev.date.split("T")[0];
    if (d) {
      eventCounts[d] = (eventCounts[d] || 0) + 1;
    }
  }

  for (let w = 51; w >= 0; w--) {
    const weekDays: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      const dateStr = date.toISOString().split("T")[0] ?? "";
      const count = eventCounts[dateStr] ?? 0;

      weekDays.push({
        date: dateStr,
        count,
        level: getLevelFromCount(count),
      });
    }
    grid.push(weekDays);
  }

  return grid;
}

function parsePushEvent(item: RawEventItem): CommitEvent[] {
  const commitsList: CommitEvent[] = [];
  if (item.type === "PushEvent" && item.payload?.commits) {
    for (const c of item.payload.commits) {
      commitsList.push({
        id: c.sha || item.id,
        repoName: item.repo?.name || "tutankhAman/repo",
        repoUrl: `https://github.com/${item.repo?.name || "tutankhAman"}`,
        commitMsg: c.message || "Updated repository",
        branch: item.payload.ref?.replace("refs/heads/", "") || "main",
        date: item.created_at,
        url: `https://github.com/${item.repo?.name}/commit/${c.sha}`,
      });
    }
  } else if (item.type === "CreateEvent") {
    commitsList.push({
      id: item.id,
      repoName: item.repo?.name || "tutankhAman/repo",
      repoUrl: `https://github.com/${item.repo?.name}`,
      commitMsg: `Created ${item.payload?.ref_type || "branch"} ${item.payload?.ref || ""}`,
      branch: item.payload?.ref || "main",
      date: item.created_at,
      url: `https://github.com/${item.repo?.name}`,
    });
  }
  return commitsList;
}

function parseEventsData(eventsData: RawEventItem[]): CommitEvent[] {
  const parsedCommits: CommitEvent[] = [];
  for (const item of eventsData) {
    parsedCommits.push(...parsePushEvent(item));
  }
  return parsedCommits;
}

function parseContributionsData(contribData: {
  contributions?: RawContribDay[][];
  totalContributions?: number;
}): { grid: ContributionDay[][]; total: number | null } {
  if (
    !(contribData.contributions && Array.isArray(contribData.contributions))
  ) {
    return { grid: [], total: null };
  }

  const grid: ContributionDay[][] = contribData.contributions.map((week) =>
    week.map((day) => ({
      date: day.date,
      count: day.contributionCount ?? 0,
      level: LEVEL_MAP[day.contributionLevel ?? "NONE"] ?? 0,
    }))
  );

  const total =
    typeof contribData.totalContributions === "number"
      ? contribData.totalContributions
      : null;

  return { grid, total };
}

export function GitHubActivity({ inView: _inView }: { inView?: boolean }) {
  const [commits, setCommits] = useState<CommitEvent[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [contributionGrid, setContributionGrid] = useState<ContributionDay[][]>(
    []
  );
  const [totalContributions, setTotalContributions] = useState<number | null>(
    null
  );
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
  } | null>(null);

  const fetchGitHubData = useCallback(async () => {
    try {
      const [eventsRes, userRes, contribRes] = await Promise.allSettled([
        fetch("https://api.github.com/users/tutankhAman/events?per_page=30"),
        fetch("https://api.github.com/users/tutankhAman"),
        fetch("https://github-contributions-api.deno.dev/tutankhAman.json"),
      ]);

      if (userRes.status === "fulfilled" && userRes.value.ok) {
        const userData = await userRes.value.json();
        setStats({
          publicRepos: userData.public_repos ?? 14,
          followers: userData.followers ?? 5,
          createdAt: userData.created_at ?? "2023-05-15",
          avatarUrl:
            userData.avatar_url ?? "https://github.com/tutankhAman.png",
        });
      }

      if (eventsRes.status === "fulfilled" && eventsRes.value.ok) {
        const eventsData = (await eventsRes.value.json()) as RawEventItem[];
        const parsed = parseEventsData(eventsData);
        setCommits(parsed.length > 0 ? parsed.slice(0, 8) : FALLBACK_COMMITS);
      } else {
        setCommits(FALLBACK_COMMITS);
      }

      if (contribRes.status === "fulfilled" && contribRes.value.ok) {
        const contribData = await contribRes.value.json();
        const { grid, total } = parseContributionsData(contribData);
        setContributionGrid(grid);
        setTotalContributions(total);
      }
    } catch {
      setCommits(FALLBACK_COMMITS);
    }
  }, []);

  useEffect(() => {
    fetchGitHubData();
  }, [fetchGitHubData]);

  const activeGrid = useMemo(() => {
    if (contributionGrid.length > 0) {
      return contributionGrid;
    }
    return generateFallbackGrid(commits);
  }, [contributionGrid, commits]);

  const totalContributionsInGrid = useMemo(() => {
    if (totalContributions !== null) {
      return totalContributions;
    }
    let total = 0;
    for (const week of activeGrid) {
      for (const day of week) {
        total += day.count;
      }
    }
    return total;
  }, [totalContributions, activeGrid]);

  return (
    <div className="flex flex-col gap-6">
      {/* Overview stats bar */}
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
            Year Activity
          </span>
          <div className="mt-1 font-generalsans font-medium text-[20px] text-fg">
            {totalContributionsInGrid}{" "}
            <span className="font-mono font-normal text-[11px] text-fg/40">
              contributions
            </span>
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

      {/* Contribution Heatmap Box */}
      <div className="border border-fg/[0.08] bg-fg/[0.01] p-4 md:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="shrink-0 font-mono text-[10px] text-fg/40 uppercase tracking-[0.15em]">
              52-Week Activity Matrix
            </span>
            <div className="flex h-5 items-center">
              <span
                className={`rounded bg-fg/[0.06] px-2 py-0.5 font-mono text-[10px] text-fg/70 transition-all duration-200 ${
                  hoveredCell
                    ? "translate-x-0 opacity-100"
                    : "pointer-events-none -translate-x-1 opacity-0"
                }`}
              >
                {hoveredCell
                  ? `${hoveredCell.count} contribution${
                      hoveredCell.count !== 1 ? "s" : ""
                    } on ${hoveredCell.date}`
                  : "0 contributions"}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 font-mono text-[9px] text-fg/30">
            <span>Less</span>
            <span className="h-2.5 w-2.5 rounded-[1px] bg-fg/[0.05]" />
            <span className="h-2.5 w-2.5 rounded-[1px] bg-emerald-500/30" />
            <span className="h-2.5 w-2.5 rounded-[1px] bg-emerald-500/60" />
            <span className="h-2.5 w-2.5 rounded-[1px] bg-emerald-500/90" />
            <span className="h-2.5 w-2.5 rounded-[1px] bg-emerald-400" />
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="scrollbar-none overflow-x-auto pb-1">
          <div className="flex min-w-[640px] gap-[3px]">
            {activeGrid.map((week, wIdx) => (
              <div
                className="flex flex-col gap-[3px]"
                key={`week-${week[0]?.date || wIdx}`}
              >
                {week.map((day) => {
                  let bgClass = "bg-fg/[0.06]";
                  if (day.level === 1) {
                    bgClass = "bg-emerald-500/30";
                  }
                  if (day.level === 2) {
                    bgClass = "bg-emerald-500/60";
                  }
                  if (day.level === 3) {
                    bgClass = "bg-emerald-500/90";
                  }
                  if (day.level === 4) {
                    bgClass =
                      "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]";
                  }

                  return (
                    <button
                      aria-label={`${day.count} contributions on ${day.date}`}
                      className={`h-2.5 w-2.5 cursor-pointer rounded-[1.5px] transition-transform duration-150 hover:scale-125 ${bgClass}`}
                      key={day.date}
                      onMouseEnter={() =>
                        setHoveredCell({ date: day.date, count: day.count })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                      type="button"
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
