# Sunday School Games v2 — Design Document

## 1. Current State

### What We Built (v1)
- 5 mobile web games for ASTG Unit 07 ("Guard Your Heart")
- Pure HTML/CSS/JS, single-file per game, no build tools
- Deployed on GitHub Pages: https://twpark.github.io/sunday-school-games/
- Mobile-first responsive design (max-width 480px)

### v1 Games
| Game | Genre | Mechanic |
|------|-------|----------|
| Heart Quiz | Quiz | Multiple choice Q&A |
| Tongue Tamer | Swipe | Swipe left/right to classify words |
| Helping Hands | Story Quiz | Read scenario → pick best action |
| Ears of Wisdom | True/False | Drag statements to rock/sand house |
| Gospel Runner | Endless Runner | Canvas-based auto-runner |

### v1 Limitations
- **Single-file HTML**: No code reuse, no shared game logic, hard to maintain
- **No game framework**: Manual canvas rendering, custom collision detection, no physics engine
- **Limited interactivity**: Mostly quiz/classification mechanics
- **No progression system**: Each game is standalone, no save state or cross-game rewards
- **No audio**: No sound effects or background music

---

## 2. Web Game Frameworks Evaluation

### Recommended: Phaser 3

**Why Phaser?**
- **Mature & battle-tested**: 38k+ GitHub stars, 84k+ weekly npm downloads
- **CDN-ready**: Can load via `<script src="https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.min.js">` — no build tools required
- **Batteries included**: Physics (Arcade/Matter.js), sprite management, animation, audio, input handling, scene management, tweening, cameras, tilemaps
- **Mobile-first**: Touch input, responsive scaling, WebGL + Canvas2D fallback
- **Huge community**: Thousands of tutorials, examples, plugins
- **GitHub Pages compatible**: Pure client-side, works with static hosting

**Basic Setup (no build tools)**
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.min.js"></script>
</head>
<body>
  <script src="game.js"></script>
</body>
</html>
```

**Trade-off**: Phaser's minified bundle is ~1.2MB. For our use case (Sunday school on church WiFi), this is acceptable since it loads once and caches.

### Alternatives Considered

#### KAPLAY.js (formerly Kaboom.js)
- **Pros**: Simpler API, ECS architecture, built-in web editor (KAPLAYGROUND), TypeScript support, 90+ examples
- **Cons**: Smaller community, slower performance than Phaser, less mature
- **Verdict**: Great for prototyping, but Phaser's ecosystem is more robust for production

#### PixiJS
- **Pros**: 3x smaller (450KB), 2x faster rendering, maximum flexibility
- **Cons**: Rendering-only — no physics, audio, input, or scene management built in. You build everything yourself.
- **Verdict**: Overkill control for our needs. We want batteries included.

#### LittleJS
- **Pros**: Ultra-lightweight (7KB zipped!), WebGL2 + Canvas2D hybrid, built-in particles/physics/audio
- **Cons**: Small community, fewer tutorials, less documentation
- **Verdict**: Interesting for jam-style games, but lacks ecosystem support

#### Excalibur.js
- **Pros**: TypeScript-native, clean API, good mobile support via Capacitor
- **Cons**: Smaller community, less battle-tested
- **Verdict**: Worth watching, but not mature enough yet

#### No Framework (vanilla JS)
- **Pros**: Zero dependencies, smallest bundle, full control
- **Cons**: Reinventing the wheel for every game (collision, physics, audio, input). Our v1 Gospel Runner already hit this wall.
- **Verdict**: Fine for simple quiz games, insufficient for anything more complex

### Framework Decision Matrix

| Criteria | Phaser | KAPLAY | PixiJS | LittleJS | Vanilla |
|----------|--------|--------|--------|----------|---------|
| Learning curve | Medium | Easy | Hard | Easy | N/A |
| Bundle size | 1.2MB | ~800KB | 450KB | 7KB | 0 |
| Built-in features | ★★★★★ | ★★★★ | ★★ | ★★★ | ★ |
| Community/docs | ★★★★★ | ★★★ | ★★★★ | ★★ | ★★★★★ |
| Mobile support | ★★★★★ | ★★★★ | ★★★★ | ★★★★ | ★★★ |
| GitHub Pages compat | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★★ |

**Final recommendation: Phaser 3 for complex games, vanilla JS for simple quiz-type games.**

---

## 3. Game Genre Ideas

### Tier 1: High Impact, Medium Complexity (Recommended)

#### 3a. Platformer Adventure
- **Genre**: 2D platformer with story elements
- **Mechanic**: Navigate biblical scenes, collect scripture scrolls, avoid temptation obstacles
- **Educational**: Each level teaches a Bible story; collectibles are key verses
- **Framework**: Phaser (physics, tilemaps, sprites)
- **Example concept**: "Journey to the Promised Land" — Moses leads Israelites through desert levels

#### 3b. Tower Defense
- **Genre**: Strategic tower defense
- **Mechanic**: Place "Armor of God" pieces (Ephesians 6:10-18) to defend against waves of temptation
- **Educational**: Each tower type maps to a piece of spiritual armor; kids learn what each piece represents
- **Framework**: Phaser (sprite management, pathfinding, waves)
- **Example concept**: "Armor Up!" — Shield of Faith blocks lies, Sword of the Spirit attacks doubt

#### 3c. Point-and-Click Adventure
- **Genre**: Interactive story / adventure
- **Mechanic**: Explore biblical scenes, talk to characters, solve puzzles, make moral choices
- **Educational**: Immersive storytelling teaches context of Bible stories
- **Framework**: Phaser (scene management, dialogue system, inventory)
- **Example concept**: "Walk with Jesus" — Experience parables firsthand

#### 3d. Memory / Matching Game
- **Genre**: Card matching / memory
- **Mechanic**: Flip cards to match Bible verses with their meanings, or match Fruits of the Spirit to descriptions
- **Educational**: Repetition-based memorization of key concepts
- **Framework**: Vanilla JS or Phaser (simple animations, card flip effects)
- **Example concept**: "Verse Match" — Match scripture references to their content

### Tier 2: Medium Impact, Various Complexity

#### 3e. Rhythm Game
- **Genre**: Music/rhythm
- **Mechanic**: Tap notes in time with worship songs or scripture set to music
- **Educational**: Worship music engagement, verse memorization through melody
- **Framework**: Phaser (precise timing, audio sync, particle effects)
- **Example concept**: "Praise Beats" — Tap along to hymns

#### 3f. Word Puzzle Games
- **Genre**: Word search / crossword / scramble
- **Mechanic**: Find Bible terms in word grids, unscramble verse words, fill crosswords with biblical knowledge
- **Educational**: Vocabulary building, verse familiarity
- **Framework**: Vanilla JS (DOM-based grid, no physics needed)
- **Example concept**: "Word of God" — Weekly word search with unit vocabulary

#### 3g. Drag-and-Drop Builder
- **Genre**: Construction / puzzle
- **Mechanic**: Drag pieces to build Noah's Ark, Solomon's Temple, or the Tabernacle
- **Educational**: Learn structure/significance of biblical buildings
- **Framework**: Phaser or vanilla JS (drag-drop, snap-to-grid)
- **Example concept**: "Build the Temple" — Assemble pieces while learning each part's purpose

#### 3h. Board Game (Digital)
- **Genre**: Digital board game
- **Mechanic**: Roll dice, move spaces, answer Bible questions at each stop. Snakes = sins, ladders = blessings.
- **Educational**: Review-style game covering multiple topics
- **Framework**: Phaser (board rendering, dice animation, token movement)
- **Example concept**: "Faith Path" — Race to finish while answering questions

### Tier 3: Experimental / Advanced

#### 3i. Visual Novel / Choice-Based Story
- **Genre**: Interactive fiction
- **Mechanic**: Read Bible story with branching choices; see consequences of moral decisions
- **Educational**: Deep engagement with narrative, moral reasoning
- **Framework**: Vanilla JS or lightweight VN engine (Ren'Py web export, or custom)
- **Example concept**: "Choose Your Path" — What if David didn't fight Goliath?

#### 3j. Idle / Clicker Game
- **Genre**: Incremental
- **Mechanic**: Build a church/garden by clicking; unlock Bible facts as milestones
- **Educational**: Long-term engagement, fact discovery
- **Framework**: Vanilla JS (simple state management)
- **Example concept**: "Garden of Virtues" — Grow fruits of the Spirit over time

#### 3k. Multiplayer Quiz Battle
- **Genre**: Competitive quiz
- **Mechanic**: Real-time or turn-based quiz battles between students
- **Educational**: Competitive motivation, review reinforcement
- **Framework**: Phaser + WebSocket server (requires backend)
- **Note**: Multiplayer requires a server — not feasible with GitHub Pages alone. Could use Firebase or similar.

---

## 4. Educational Design Patterns

### Gamification Elements
- **Points & Scoring**: Immediate feedback on performance
- **Badges/Achievements**: "Memorized 10 verses", "Completed all Unit 07 games"
- **Progress Tracking**: localStorage-based progress across games
- **Difficulty Levels**: Easy/Medium/Hard for different age groups (K-2, 3-4, 5-6)
- **Streak Rewards**: Bonus points for consecutive correct answers

### Age-Appropriate Design
- **Ages 5-7 (K-2)**: Large touch targets, simple mechanics (tap, drag), heavy visual feedback, minimal reading
- **Ages 8-10 (3-4)**: Reading-based questions, moderate complexity, score tracking
- **Ages 11-12 (5-6)**: Strategy elements, longer sessions, nuanced moral questions

### Retention Mechanics
- **Spaced Repetition**: Show missed questions again later in the session
- **Explanation After Answer**: Always show why an answer is correct (already doing this in Heart Quiz)
- **Story Integration**: Wrap mechanics in narrative context, not just isolated questions
- **Multi-Sensory**: Combine visual, audio, and interactive elements

### Cross-Game Progression (v2 Feature)
- Shared `localStorage` profile across all games
- Cumulative score / "faith points" shown on main page
- Unlock badges displayed on a profile card
- Optional: Weekly challenge mode tied to current unit

---

## 5. Proposed Architecture (v2)

### Project Structure
```
sunday-school-games/
├── index.html                    # Main hub with game cards + profile
├── css/
│   └── style.css                 # Shared styles
├── js/
│   ├── shared.js                 # Shared utilities (scoring, localStorage, audio)
│   └── profile.js                # Cross-game profile/badge system
├── assets/
│   ├── sprites/                  # Shared sprite sheets
│   ├── audio/                    # Sound effects + music
│   └── fonts/                    # Custom fonts
├── games/
│   ├── heart-quiz/               # Vanilla JS (quiz-type)
│   ├── tongue-tamer/             # Vanilla JS (swipe-type)
│   ├── helping-hands/            # Vanilla JS (story-type)
│   ├── ears-of-wisdom/           # Vanilla JS (drag-drop)
│   ├── gospel-runner/            # Phaser (runner)
│   ├── armor-up/                 # Phaser (tower defense) — NEW
│   ├── verse-match/              # Vanilla JS (memory) — NEW
│   └── faith-path/               # Phaser (board game) — NEW
├── lib/
│   └── phaser.min.js             # Phaser 3 (local copy, ~1.2MB)
└── docs/
    └── design-v2.md              # This document
```

### Key Principles
1. **Progressive enhancement**: Simple games stay vanilla JS; complex games use Phaser
2. **Shared utilities**: Common scoring, profile, audio, and UI code in `js/shared.js`
3. **No build tools**: All games load via `<script>` tags, deployable to GitHub Pages
4. **Mobile-first**: Touch-optimized, responsive, works on church tablets/phones
5. **Offline-capable**: Consider adding a service worker for offline play
6. **Self-contained assets**: Local copy of Phaser (not CDN) for reliability

---

## 6. Recommended v2 Roadmap

### Phase 1: Infrastructure
- [ ] Create `js/shared.js` with common utilities (score tracking, localStorage profile, audio manager)
- [ ] Add `js/profile.js` for cross-game badge/progress system
- [ ] Update main `index.html` to show cumulative progress
- [ ] Add Phaser 3 to `lib/`

### Phase 2: New Games (pick 2-3)
- [ ] **Verse Match** (memory game) — Vanilla JS, low complexity
- [ ] **Armor Up** (tower defense) — Phaser, medium complexity
- [ ] **Faith Path** (board game) — Phaser, medium complexity

### Phase 3: Polish
- [ ] Add sound effects and background music
- [ ] Add difficulty levels to existing games
- [ ] Add spaced repetition to quiz-type games
- [ ] Badge/achievement system

---

## 7. References

### Framework Resources
- [Phaser 3 Official Site](https://phaser.io/)
- [Phaser CDN (jsDelivr)](https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.min.js)
- [KAPLAY.js](https://kaplayjs.com/)
- [PixiJS](https://pixijs.com/)
- [LittleJS](https://github.com/KilledByAPixel/LittleJS)
- [Excalibur.js](https://excaliburjs.com/)

### Research
- [Best JS/HTML5 Game Engines 2025 — LogRocket](https://blog.logrocket.com/best-javascript-html5-game-engines-2025/)
- [JS Game Engines 2025 — GameFromScratch](https://gamefromscratch.com/javascript-typescript-game-engines-in-2025/)
- [Phaser vs PixiJS Comparison](https://generalistprogrammer.com/comparisons/phaser-vs-pixijs)
- [Serious Educational Games Framework — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10963373/)
- [Gamification in Education — SpringerOpen](https://slejournal.springeropen.com/articles/10.1186/s40561-019-0085-2)
- [JS Game Rendering Benchmark](https://github.com/Shirajuki/js-game-rendering-benchmark)

---

*Document created: 2026-03-14*
*Contributors: TARS, CASE, KIPP*
