# S01E03 · what it shows

Ticket #4471 merged 412 reports about dates as one known issue. Read by cause, it holds three problems:

| problem | reports | ticket |
|---|---|---|
| `parser`: shared parser reads day-first tenants' dates month first | 374 | [#1](https://github.com/Vesperino/mega-s01e03-what-it-shows/issues/1) |
| `hint`: booking-v3 form hints `MM/DD/YYYY` to day-first tenants | 33 | [#2](https://github.com/Vesperino/mega-s01e03-what-it-shows/issues/2) |
| `one-day`: dates shown one day early (time zone), not swapped | 5 | [#3](https://github.com/Vesperino/mega-s01e03-what-it-shows/issues/3) |

## The page

- Source (.svx): [`src/routes/kb/incidents/4471/problems/+page.svx`](src/routes/kb/incidents/4471/problems/+page.svx)
- Logic and component: [`src/lib/kb/problems.ts`](src/lib/kb/problems.ts), [`src/lib/kb/ProblemTable.svelte`](src/lib/kb/ProblemTable.svelte)
- As the desk sees it (rendered HTML): [`rendered/kb/incidents/4471/problems/index.html`](rendered/kb/incidents/4471/problems/index.html)
- Owner: Arkadiusz Białecki · signed with the course ticket · desk ref `DR-XY94-S520`

The rest of `src/` and `README.md` is the kb export as received (exported 2026-10-04).

## Build

```sh
npm ci
npm run build   # static site in build/; rendered/ is a copy of it
```
