# Sunday School Games

> "Do not go gentle into that good night" — but DO go gently into Sunday School.

Mobile-friendly web games for Sunday School, built to teach biblical truths through interactive play. Deployed on GitHub Pages with zero build tools required.

**Live:** [https://twpark.github.io/sunday-school-games/](https://twpark.github.io/sunday-school-games/)

## Games

### Series 1: Guard Your Heart (ASTG Unit 07)
Five games exploring how body parts connect to spiritual life.

| Game | Type | Description | Difficulty |
|------|------|-------------|------------|
| Heart Quiz | Quiz | Multiple-choice Bible quiz about discerning good and evil hearts | Easy |
| Tongue Tamer | Swipe | Swipe words left (bad) or right (good) to tame your tongue | Easy |
| Helping Hands | Story Quiz | Read Bible service stories and choose the right response | Medium |
| Ears of Wisdom | True/False | Drag teachings to the rock (truth) or sand (false) house | Medium |
| Gospel Runner | Endless Runner | Canvas-based runner — collect gospel items, dodge obstacles | Hard |

### Series 2: Be Ye Holy (Holiness & Sanctification)
Four games emphasizing Arminian holiness theology. All scripture in KJV.

| Game | Type | Description | Difficulty |
|------|------|-------------|------------|
| Exodus Escape | Escape Room | Solve 5 Bible puzzles about holiness to escape | Hard |
| The Prodigal's Choice | Visual Novel | Branching-choice story exploring repentance and grace | Medium |
| Verse Match | Memory | Flip cards to match KJV holiness verses with their meanings | Easy |
| Word of Holiness | Word Puzzle | Word search + crossword with sanctification vocabulary | Easy |

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS (no frameworks, no build tools)
- **v2 Shared Utils:** `v2/js/shared.js` — scoring, localStorage profile, audio manager, badge system
- **Hosting:** GitHub Pages (static, CDN-cached)
- **Mobile-first:** Touch-optimized, responsive (max-width 480px), `user-scalable=no`
- **Audio:** Web Audio API synthesized tones (no audio files needed)

## Project Structure

```
sunday-school-games/
├── index.html              # Unified hub page (both series, filterable)
├── css/style.css           # v1 shared styles
├── js/                     # v1 shared JS (minimal)
├── games/                  # Series 1 games (5 games)
│   ├── heart-quiz/
│   ├── tongue-tamer/
│   ├── helping-hands/
│   ├── ears-of-wisdom/
│   └── gospel-runner/
├── v2/                     # Series 2 games + infrastructure
│   ├── css/style.css       # v2 shared styles (superset of v1)
│   ├── js/shared.js        # Profile, scoring, audio, badges
│   ├── js/profile.js       # Hub page profile UI
│   └── games/              # Series 2 games (4 games)
│       ├── escape-room/
│       ├── visual-novel/
│       ├── verse-match/
│       └── word-puzzle/
└── docs/
    └── design-v2.md        # v2 design document
```

## Features

- **9 games** across 2 series with varied mechanics (quiz, swipe, runner, escape room, visual novel, memory, word puzzle)
- **Unified hub page** with filtering by series, difficulty, and game type
- **Cross-game profile system** with Faith Points, badges, and play history (localStorage)
- **Sound effects** via Web Audio API (no external audio files)
- **Difficulty badges** (Easy/Medium/Hard) with recommended age ranges
- **KJV scripture** throughout, with verse reveals after correct answers
- **Arminian holiness theology** woven into game narratives and teachings

## Theological Notes

Series 2 games emphasize holiness and sanctification from an Arminian perspective:
- Free will and human response to God's call
- Progressive sanctification through the Holy Spirit
- Repentance, transformation, and holy living
- All scripture uses the King James Version (KJV)

Key verses featured: 1 Peter 1:15-16, Hebrews 12:14, Psalm 51:10, Romans 13:12, Ephesians 4:22-24, 2 Corinthians 7:1

## Development

No build tools needed. Just serve the files:

```bash
# Local development
npx serve .

# Or simply open index.html in a browser
```

Deploy by pushing to `main` — GitHub Pages auto-deploys.

## Update History

### 2026-03-14 — Initial Release

**v1 Games (Series 1: Guard Your Heart)**
- `8e89012` Initial setup: main page + Heart Quiz game (TARS)
- `afbe7f7` Add Tongue Tamer and Helping Hands games (CASE)
- `60dbf2c` Add Ears of Wisdom and Gospel Runner games (KIPP)
- `503f906` Translate all games from Korean to English
- `c590e42` Trigger GitHub Pages deployment

**Cross-Review & Bug Fixes**
- `f067645` Fix Heart Quiz critical bug: shuffle answer choices randomly (TARS)
  - 14/15 answers were at index 1 — choices now randomized via Fisher-Yates shuffle
- `6f95243` Apply cross-review feedback: Tongue Tamer + Helping Hands (CASE)
  - Tongue Tamer: feedback display 1.8s → 2.5s, swipe threshold 80px → 100px
  - Helping Hands: removed 82 lines of unused CSS from earlier matching game concept
- `a5f7de7` Fix critical cross-review issues in Ears of Wisdom and Gospel Runner (KIPP)
  - Ears of Wisdom: speaker emoji no longer reveals answer
  - Gospel Runner: added invincibility frames after hit

**v2 Design & Planning**
- `0a2b26a` Add v2 design document with framework evaluation and game ideas
- `47a3132` Update design doc with CASE (genre research) and KIPP (design patterns) findings
- `17bb2e3` Add Arminian holiness theological direction section

**v2 Games (Series 2: Be Ye Holy)**
- `04f48fa` Add v2 infrastructure: hub page, shared CSS, utilities, profile system (TARS)
- `eda4078` Add 4 v2 games: Escape Room, Visual Novel, Verse Match, Word Puzzle (TARS)
- `1f77000` Fix escape-room choice shuffling and verse-match card styling
- `3bc3675` Expand faithful path and add word placement retry

**Escape Room Hardening**
- `a485611` Hide verse text — only reference shown, full verse revealed after solving (TARS)
- `5d2a167` Remove answer-revealing room titles (TARS)
  - "The Clean Heart" → "David's Prayer", "The Narrow Gate" → "Two Roads", etc.
- `a3a4199` Make hints indirect and strengthen distractors (CASE)
  - All 5 hints rewritten to guide thinking without revealing answers
  - Room 3: weak distractors replaced with plausible biblical alternatives

**Hub Unification**
- `7254c59` Unify v1 and v2 into single hub page with series/difficulty/type filtering

## Credits

Built with questionable humor settings and maximum honesty parameters by:
- **TARS** (@happytwpbot) — Project lead, infrastructure, Heart Quiz, v2 game builds
- **CASE** (@goofytwpbot) — Tongue Tamer, Helping Hands, genre research, escape room hardening
- **KIPP** (@zippytwpbot) — Ears of Wisdom, Gospel Runner, educational design patterns

Under the supervision of **Teddy** — Cooper's childhood friend, Sunday School commander.

> "It's not possible." "No, it's necessary." — Building Sunday School games at 3AM

## License

MIT
