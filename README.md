# antiAI

`antiAI` is a Chrome extension that hides or blurs AI-generated media in social feeds and removes AI-generated answer modules from major search engines.

## Features

- Hides or blurs posts that appear to contain AI-generated images or videos.
- Supports X, Twitter, Instagram, Reddit, Facebook, Threads, TikTok, and YouTube.
- Detects likely AI media from captions, hashtags, alt text, ARIA labels, media URLs, and site metadata.
- Removes AI Overview modules from Google and AI answer blocks from Bing, Yandex, Brave Search, and DuckDuckGo when enabled.
- Lets users switch between `Hide posts` and `Blur posts` from the popup.
- Offers `Normal` and `Strict` sensitivity levels.
- Tracks the last page scan result in the popup.
- Adds a YouTube channel block action for repeat offenders.
- Skips flagged YouTube Shorts in the Shorts viewer instead of only hiding the card.
- Includes a Ko-fi support button in the popup.

## How It Works

`antiAI` is heuristic-based. It does not classify pixels directly. It looks for text and metadata signals that commonly appear around AI-generated media.

That means:

- It will miss unlabeled AI content.
- It can false-positive on posts discussing AI without containing AI media.
- Site markup changes can break selectors and require updates.

## Install Locally

1. Open `chrome://extensions`.
2. Enable `Developer mode`.
3. Click `Load unpacked`.
4. Select the [antiAI](D:/node/antiAI) folder.

## Popup Settings

- `Enabled`: Turns filtering on or off.
- `Mode`: `Hide posts` removes matched posts from the feed. `Blur posts` obscures them behind a reveal badge.
- `Sensitivity`: `Strict` catches more matches and can increase false positives.
- `Hide AI Overview`: Removes AI-generated answer modules from supported search engines.

## Supported Surfaces

- X / Twitter
- Instagram
- Reddit
- Facebook
- Threads
- TikTok
- YouTube
- Google Search
- Bing Search
- Yandex
- Brave Search
- DuckDuckGo

## Contributing

Contributions are welcome, but keep them targeted and verifiable.

### Good contribution areas

- Selector fixes after UI changes on supported sites.
- Better heuristics with a clear false-positive tradeoff.
- Additional search engine AI answer blockers.
- Popup UX improvements that do not add unnecessary permissions.
- Performance improvements for large feeds.
- Tests or reproducible fixture pages for broken selectors.

### Before you open a PR

1. Reproduce the issue on a real page.
2. Keep the change scoped to the affected platform or feature.
3. Avoid adding new permissions unless they are strictly necessary.
4. Prefer deterministic selectors and small heuristics over broad text matching.
5. Check that the extension still loads as an unpacked MV3 extension.

### Local workflow

1. Edit the extension files in [antiAI](D:/node/antiAI).
2. Reload the extension in `chrome://extensions`.
3. Refresh affected pages and verify behavior on at least one positive case and one negative case.
4. If you touch search engine blockers, test with AI answers present and absent.
5. If you touch YouTube logic, test both regular results and Shorts.

### Pull request notes

- Describe the affected site and the exact DOM or behavior change.
- Include before/after screenshots when the UI changed.
- Mention any new selectors or heuristic keywords added.
- Call out known risks or cases you could not test.

## Release Checklist

1. Replace the Ko-fi URL in [popup.js](D:/node/antiAI/popup.js) with your real page.
2. Verify icons and extension name are final.
3. Bump `version` in [manifest.json](D:/node/antiAI/manifest.json).
4. Reload the unpacked extension and smoke-test supported surfaces.
5. Zip the contents of [antiAI](D:/node/antiAI) for Chrome Web Store upload.

## Files

- [manifest.json](D:/node/antiAI/manifest.json): Chrome extension manifest.
- [content.js](D:/node/antiAI/content.js): Main detection and blocking logic.
- [page-hook.js](D:/node/antiAI/page-hook.js): YouTube page bridge for metadata capture.
- [popup.html](D:/node/antiAI/popup.html): Popup markup.
- [popup.css](D:/node/antiAI/popup.css): Popup styles.
- [popup.js](D:/node/antiAI/popup.js): Popup state and Ko-fi link wiring.
