# Chrome Web Store Submission

## Store Listing

### Extension name

antiAI

### Summary

Hide or blur AI-generated media in social feeds and remove AI answer modules from search results.

### Detailed description

`antiAI` helps reduce AI-generated clutter across social platforms and search engines.

The extension scans visible posts for common AI indicators in captions, hashtags, alt text, labels, and media URLs. When a post looks like it contains AI-generated images or video, `antiAI` can either remove it from the feed or blur it behind a reveal button.

It also removes AI-generated answer modules, such as Google AI Overview and similar AI answer surfaces on supported search engines, when that setting is enabled.

Current features include:

- Hide or blur suspected AI-generated image and video posts
- Normal and Strict sensitivity modes
- Search AI answer blocking
- YouTube channel blocking for repeat offenders
- YouTube Shorts skipping for flagged AI content
- Lightweight popup controls with no account required

Supported surfaces include:

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

`antiAI` is heuristic-based. It does not analyze pixels directly, so it may miss unlabeled AI content and may occasionally hide posts that only discuss AI tools.

### Category

Productivity

### Language

English

## Privacy Tab

### Single purpose

This extension hides or blurs social posts that appear to contain AI-generated media and removes AI-generated answer modules from supported search engines.

### Permission justification

- `storage`
  Used to save user preferences such as enabled state, mode, sensitivity, last scan stats, search AI overview setting, and blocked YouTube channels.

- Host permissions for supported sites
  Required so the content script can inspect post metadata on supported social and search sites and apply filtering directly in the page.

### User data handling

Recommended answers for the Privacy tab, based on the current codebase:

- Does the extension collect user data?
  No.

- Is user data sold to third parties?
  No.

- Is user data used for purposes unrelated to the extension's core functionality?
  No.

- Is user data used for creditworthiness or lending purposes?
  No.

### Data statement

`antiAI` processes page content locally in the browser to detect likely AI-generated media and remove supported AI answer modules. User settings are stored with Chrome storage. The extension does not transmit personal data to an external server.

## Test Instructions

No login, payment, invite code, or external account is required.

### Basic test flow

1. Open the extension popup and verify these controls are available:
   - Enabled
   - Mode
   - Sensitivity
   - Hide AI Overview

2. On Google Search, search for a query that commonly triggers AI Overview, for example:
   - `ko fi alternatives`
   - `best ai image generator`

3. Confirm that when `Hide AI Overview` is enabled, the AI Overview module is removed from the page.

4. Toggle `Hide AI Overview` off, refresh the search results page, and confirm the AI answer module is no longer removed by the extension.

5. On YouTube, open search results for a term that returns AI-related content, for example:
   - `midjourney showcase`
   - `ai video short`

6. Confirm that suspected AI videos are either hidden or blurred depending on the selected mode.

7. In `Blur posts` mode, confirm the reveal badge appears and that clicking `Show` restores the content.

8. If a YouTube result includes a visible channel label, confirm the `Block` action appears next to the channel area. After clicking it, matching content from that channel should be filtered on subsequent scans.

### Notes for reviewer

- Detection is heuristic-based and depends on visible labels or metadata.
- Behavior may vary depending on the live content available on supported platforms.
- No external backend or API is required for the extension to function.

## Suggested Assets To Prepare

- 128x128 extension icon
- At least one screenshot of popup controls
- At least one screenshot showing AI Overview removal or post filtering
- Optional promotional tile assets if you want a stronger store listing
