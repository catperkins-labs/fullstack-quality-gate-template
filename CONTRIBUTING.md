# Contributing

## Branching

All branches use a `<prefix>/<issue-number>-<short-slug>` naming convention. The slug should match or closely reflect the issue title. Use lowercase and hyphens only.

### Branch prefixes

| Prefix | Use for |
| ------ | ------- |
| `epic/` | Long-running parent branches grouping related `feat/` work |
| `feat/` | Feature or task branches for individual issues |
| `fix/` | Bug fix branches |
| `chore/` | Tooling, config, or dependency updates |
| `docs/` | Documentation-only changes |
| `ci/` | CI/CD workflow changes |

### Branch hierarchy

`feat/` branches must be created from — and PR'd back into — their parent `epic/` branch, not `main` directly.

```
main
└── epic/11-local-quickstart-and-toolchain-setup
    ├── feat/13-pin-node-net-toolchain-versions
    ├── feat/14-create-unified-entrypoint-for-dev-ci
    └── feat/15-add-contributingmd-workflow-branching-prs
```

Once all child `feat/` branches have been merged into the `epic/` branch, the epic is closed with a **single atomic merge commit** into `main` representing the complete body of work (see [Epic Completion](#epic-completion) below).

### Examples

```bash
# Create an epic branch from main
git checkout main && git pull
git checkout -b epic/11-local-quickstart-and-toolchain-setup

# Create a feat branch from the epic branch
git checkout epic/11-local-quickstart-and-toolchain-setup
git checkout -b feat/15-add-contributingmd-workflow-branching-prs
```

---

## Epic Completion

When all `feat/` branches for an epic have been merged into the `epic/` branch:

1. **Ensure the epic branch is up to date with `main`:**

   ```bash
   git fetch origin
   git merge origin/main
   ```

    > Note: Because `epic/` branches are typically shared, prefer `git merge` over `git rebase` here to avoid rewriting history and force-pushes that can disrupt collaborators and PR review links.

2. **Run the full CI pipeline locally:**

   ```bash
   task ci
   ```

3. **Open a PR from `epic/<issue-number>-<slug>` → `main`.**

   - The PR title should reflect the epic scope (e.g. `feat: local quickstart and toolchain setup`).
   - The description should summarise all child issues delivered, linking each with `Closes #N`.
   - The merge strategy must be a **single merge commit** (not squash or rebase) to preserve the full history of child branches.

4. **Do not merge individual `feat/` PRs directly to `main`.** All `feat/` work flows through the epic branch.

---

## Local Checks Before Opening a PR

Complete the following before marking a pull request as ready for review:

1. **Branch is up to date** with its parent branch (`epic/` branch for `feat/` work; `main` for epic branches).

   ```bash
   git fetch origin
   git rebase origin/<parent-branch>
   ```

2. **CI pipeline passes locally.**

   ```bash
   task ci
   ```

   If Task is not installed, run the equivalent commands manually (including coverage):

   ```bash
   # Lint
   cd web && npm run lint

   # Build
   dotnet build api/Api/Api.csproj --configuration Release
   cd web && npm run build

   # Test (API - Release configuration with coverage)
   dotnet test api/Api.Tests/Api.Tests.csproj --configuration Release --collect:"XPlat Code Coverage"

   # Test (web - with coverage)
   cd web && npm run test:coverage
   ```

3. **No debug code or commented-out code** is included in the diff.

4. **PR description references the issue** using a closing keyword (see below).

---

## Pull Request Expectations

- One issue per pull request. If the scope grows, open a follow-up issue and PR.
- For issue-level branches (`feat/`, `fix/`, `docs/`, `chore/` tied to an issue), keep **one issue per pull request**. If the scope grows, open a follow-up issue and PR.
- Final `epic/` → `main` pull requests are an explicit exception: they should summarise the completed work and may close multiple child issues, listing each issue they close in the description.
- The PR title must follow [Conventional Commits](https://www.conventionalcommits.org/) format:

  | Prefix | Use for |
  | ------ | ------- |
  | `feat:` | New functionality |
  | `fix:` | Bug fixes |
  | `chore:` | Tooling, config, dependency updates |
  | `docs:` | Documentation only changes |
  | `ci:` | CI/CD workflow changes |
  | `refactor:` | Code changes that neither fix a bug nor add a feature |

- The PR description must include a closing keyword linking to the issue:

  ```
  Closes #<issue-number>
  ```

- The description should summarise **what** changed and **why**. Reference any non-obvious decisions.

---

## Commit Messages

Commit messages should follow the same Conventional Commits format as PR titles. Keep the subject line concise (≤ 72 characters). Use the body to explain context when the change is non-trivial.

---

## CI Requirements

All pull requests must pass CI before merging. The CI pipeline (`ci.yml`) runs:

- **API:** restore → build → test (with coverage)
- **Web:** lint → build → test (with coverage)

Do not bypass required status checks. If CI is failing on `main`, address the failure before branching.
