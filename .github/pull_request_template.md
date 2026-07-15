<!--
Thanks for contributing to UnicornTail! 🦄
Please fill this out so reviewers can move quickly.
-->

## What & Why

<!-- What does this PR do, and why? Link the issue it closes. -->

Closes #

## Changes

<!-- Bullet the key changes. -->

-

## Screenshots / Recording

<!-- For any UI change, include before/after screenshots or a short clip. -->

## Checklist

- [ ] The stack still boots: `npm run docker:up`
- [ ] Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`)
- [ ] **No new dependencies** were added without running `npm view <pkg> version` + maintainer approval (see the Architecture & Standards Guide)
- [ ] Client state uses **Zustand**; UI primitives use **Radix**; animation uses **Framer Motion** (no unapproved libraries)
- [ ] Icons use the **`<Icon>`** wrapper (Material Symbols) — no `lucide-react` or other icon libs
- [ ] Interactive/icon-only controls have accessible names and visible focus states
- [ ] Animations respect `prefers-reduced-motion` where applicable
