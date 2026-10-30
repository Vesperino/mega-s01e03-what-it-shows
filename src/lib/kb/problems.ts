// What a big ticket really holds: one problem per cause, plus the one-day moves the desk noted by hand.
// Pages explain it; this file is what runs. Built on causes.ts, which it does not change.
import { groupByCause, type CauseGroup, type Report, type Tenant } from '#lib/kb/causes';

// `parser` and `hint` come from causes.ts. `one-day` is a date shown a day early, not a day/month swap:
// no swap explains it, so it is its own problem. The desk still counts those reports where they're
// filed, under their tenant's cause, so the one-day group overlaps one cause group.
export type Problem = CauseGroup['cause'] | 'one-day';

export type ProblemGroup = {
  problem: Problem;
  reports: Report[];
  tenants: number;
  // How the reports reached the desk: channel → count.
  channels: Record<string, number>;
  // What intake tagged them as: tag → count.
  taggedAs: Record<string, number>;
  firstSeen: string;
  lastSeen: string;
  // For `one-day`: the causes its reports are also counted under.
  alsoIn: CauseGroup['cause'][];
};

const count = (rs: Report[], key: (r: Report) => string) =>
  rs.reduce<Record<string, number>>((n, r) => ({ ...n, [key(r)]: (n[key(r)] ?? 0) + 1 }), {});

function toProblem(problem: Problem, rs: Report[], alsoIn: CauseGroup['cause'][] = []): ProblemGroup {
  const days = rs.map((r) => r.receivedAt.slice(0, 10)).sort();
  return {
    problem,
    reports: rs,
    tenants: new Set(rs.map((r) => r.tenant)).size,
    channels: count(rs, (r) => r.channel),
    taggedAs: count(rs, (r) => r.meta.intakeTag),
    firstSeen: days[0],
    lastSeen: days[days.length - 1],
    alsoIn,
  };
}

// `reports` must be unique by id (uniqueById). Counts are the desk's own view: every report under its
// cause, as filed by tenant. The one-day moves come on top, as their own problem.
export function groupByProblem(
  reports: Report[],
  tenantOf: (r: Report) => Tenant | undefined,
  oneDayMove: readonly string[],
): ProblemGroup[] {
  const groups = groupByCause(reports, tenantOf);
  const problems = groups.map((g) => toProblem(g.cause, g.reports));
  const moved = reports.filter((r) => oneDayMove.includes(r.id));
  if (moved.length) {
    const alsoIn = groups.filter((g) => g.reports.some((r) => oneDayMove.includes(r.id))).map((g) => g.cause);
    problems.push(toProblem('one-day', moved, alsoIn));
  }
  return problems;
}
