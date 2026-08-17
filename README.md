# Best Expression site

Static site for GitHub Pages. Plain HTML and CSS, one small JS file, no
framework, no build step. This folder is self-contained; every path is
relative, so it works at `https://<user>.github.io/<repo>/` or on any
static host.

## Publish

This folder mirrors automatically to the public site repository
(`ajin/macOS-photos-best-expression-site`) via
`.github/workflows/publish-site.yml`: every push to `main` that touches
`docs/` clones the site repo, rsyncs this folder over it, and pushes.
One-time setup:

1. Create a fine-grained personal access token (GitHub → Settings →
   Developer settings → Fine-grained tokens) scoped to ONLY the site
   repository, with **Contents: Read and write**.
2. Add it to THIS repo as an Actions secret named `SITE_REPO_TOKEN`.
3. On the site repository: Settings → Pages → Deploy from a branch →
   `main` / root.

The workflow can also be run by hand from the Actions tab
(workflow_dispatch). Commits in the site repo are authored by
github-actions[bot], so no personal email lands in the public history.

The URLs to paste into App Store Connect:

- Support URL: `https://ajin.github.io/macOS-photos-best-expression-site/support.html`
- Privacy Policy URL: `https://ajin.github.io/macOS-photos-best-expression-site/privacy.html`
- Marketing URL (optional): the site root

## Placeholders to replace before or at launch

Search the folder for `PLACEHOLDER`; each spot is marked with a comment.

1. **App Store link**, `index.html`, three spots: the hero button
   (`id="store-link"`), the closer button (`id="store-link-2"`), and the
   footer "Elsewhere" column. Replace `href="#"` with the real
   `https://apps.apple.com/app/idXXXXXXXXXX` URL. The "not live yet" click
   behavior turns itself off once the href changes.
2. **Support email**, `support.html`, one spot (the contact card). The
   privacy page deliberately points at the support page, so the address
   lives in exactly one place.
3. **Price**, `index.html`, FAQ answer "What does it cost?" once pricing is
   set in App Store Connect.
4. **Open Graph image**, optional: drop a 1200×630 PNG at `assets/og.png`
   and uncomment the tag in the `<head>` of `index.html`. The
   `assets/icon-*.png` files are the real app icon (cropped to the squircle
   from `icon_1024.png`); regenerate them if `Tools/make_icons.swift`
   changes the icon.
5. **Cta note lines** under the two store buttons say the review is in
   progress; soften or delete them once the app is live.

## Swapping in real screenshots

The illustrations are deliberate (no real family photos, and App Review
frowns on fake screenshots anyway). Once the App Store screenshot set
exists, the before/after slider in `index.html` (`#result`) can take two
`<img>` layers instead of the two inline SVGs; the CSS and JS already
handle any content of equal aspect ratio.
