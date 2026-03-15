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

### Tier 1: High Impact, Achievable Complexity (Recommended)

#### 3a. Escape Room / Puzzle Quest
- **Genre**: Puzzle / adventure
- **Mechanic**: Find clues → solve ciphers → unlock next room. Timer adds tension.
- **Educational**: ★★★★★ — Bible knowledge becomes the key to progress. Natural learning through puzzle-solving.
- **Framework**: Vanilla JS (DOM-based, no physics needed)
- **Complexity**: Medium
- **Example concepts**: "Exodus Escape" — Solve 10 plague puzzles to escape Egypt. "Daniel's Lion Den" — Decode scripture clues to survive.

#### 3b. Visual Novel / Choice-Based Story
- **Genre**: Interactive fiction
- **Mechanic**: Read Bible story with branching choices; see consequences of moral decisions
- **Educational**: ★★★★★ — Deep engagement with narrative, moral reasoning training. "What if David didn't fight Goliath?"
- **Framework**: Vanilla JS or Tuesday.js (lightweight VN engine, zero dependencies, runs in browser)
- **Complexity**: Low–Medium
- **Example concepts**: "Solomon's Court" — Make judgments as king, see outcomes. "The Prodigal's Choice" — Experience the story from different perspectives.

#### 3c. Memory / Card Matching
- **Genre**: Card matching / memory
- **Mechanic**: Flip cards to match Bible verses with their meanings, or match Fruits of the Spirit to descriptions
- **Educational**: ★★★★ — Repetition-based memorization of key concepts
- **Framework**: Vanilla JS or Phaser (simple animations, card flip effects)
- **Complexity**: Low
- **Example concept**: "Verse Match" — Match scripture references to their content

#### 3d. Word Puzzle Games
- **Genre**: Word search / crossword / scramble
- **Mechanic**: Find Bible terms in word grids, unscramble verse words, fill crosswords with biblical knowledge
- **Educational**: ★★★★ — Vocabulary building, verse familiarity through repeated exposure
- **Framework**: Vanilla JS (DOM-based grid, no physics needed)
- **Complexity**: Low
- **Example concept**: "Word of God" — Weekly word search with current unit vocabulary

### Tier 2: High Impact, Higher Complexity

#### 3e. Tower Defense
- **Genre**: Strategic tower defense
- **Mechanic**: Place "Armor of God" pieces (Ephesians 6:10-18) to defend against waves of temptation
- **Educational**: ★★★★ — Each tower type maps to spiritual armor; strategic thinking + Bible knowledge
- **Framework**: Phaser (sprite management, pathfinding, waves)
- **Complexity**: Medium–High
- **Example concept**: "Armor Up!" — Shield of Faith blocks lies, Sword of the Spirit attacks doubt, Belt of Truth reveals hidden enemies

#### 3f. Point-and-Click Adventure
- **Genre**: Interactive story / adventure
- **Mechanic**: Explore biblical scenes, talk to characters, solve puzzles, make moral choices
- **Educational**: ★★★★★ — Immersive storytelling for deep Bible story engagement
- **Framework**: Phaser (scene management, dialogue system, inventory)
- **Complexity**: High (requires art assets, dialogue trees)
- **Example concepts**: "Paul's Missionary Journey" — Visit cities, complete quests. "Walk with Jesus" — Experience parables firsthand.

#### 3g. Card Collection / Battle
- **Genre**: Collectible card game
- **Mechanic**: Collect Bible character cards with stats + scripture quotes. Build decks, turn-based battles.
- **Educational**: ★★★★ — Collection drive motivates learning about Bible characters. Research shows CCGs develop logical reasoning and knowledge synthesis.
- **Framework**: Phaser (card animations, battle system)
- **Complexity**: Medium–High
- **Example concept**: "Bible Heroes" — David (high attack), Solomon (wisdom cards), Esther (special ability). Unlock new cards by completing lessons.

#### 3h. Board Game (Digital)
- **Genre**: Digital board game
- **Mechanic**: Roll dice, move spaces, answer Bible questions at each stop. Snakes = sins, ladders = blessings.
- **Educational**: ★★★★ — Review-style game covering multiple topics in one session
- **Framework**: Phaser (board rendering, dice animation, token movement)
- **Complexity**: Medium
- **Example concept**: "Faith Path" — Ladders for prayer/kindness, snakes for lying/jealousy. Quiz at each square.

### Tier 3: Experimental / Niche

#### 3i. Rhythm Game
- **Genre**: Music/rhythm
- **Mechanic**: Tap notes in time with worship songs. Bonus stage: fill in missing lyrics.
- **Educational**: ★★★★ — Worship music engagement, verse memorization through melody
- **Framework**: Phaser (precise timing, audio sync via Web Audio API)
- **Complexity**: Medium–High (audio sync is the key challenge)
- **Example concept**: "Praise Beats" — This week's worship song as rhythm game. References: Bemuse (open-source), Rhythm Plus.

#### 3j. Drag-and-Drop Builder
- **Genre**: Construction / puzzle
- **Mechanic**: Drag pieces to build biblical structures. Each part snaps into place with explanation.
- **Educational**: ★★★★ — Learn structure/significance of biblical buildings through assembly
- **Framework**: Phaser or vanilla JS (drag-drop, snap-to-grid)
- **Complexity**: Medium
- **Example concepts**: "Build the Tabernacle" — Assemble each part while learning its spiritual meaning. "Noah's Blueprint" — Design the ark to spec.

#### 3k. Platformer Adventure
- **Genre**: 2D platformer with story elements
- **Mechanic**: Navigate biblical scenes, collect scripture scrolls, avoid temptation obstacles
- **Educational**: ★★★ — Each level teaches a Bible story; collectibles are key verses
- **Framework**: Phaser (physics, tilemaps, sprites)
- **Complexity**: High (level design, physics, art)
- **Example concept**: "To the Promised Land" — Wilderness level (collect manna), Jericho level (walls crumble)

#### 3l. Idle / Clicker Game
- **Genre**: Incremental
- **Mechanic**: Click to plant seeds → grow Fruits of the Spirit trees → unlock descriptions of each fruit
- **Educational**: ★★★ — Long-term engagement, progressive content unlocking
- **Framework**: Vanilla JS (simple state management + localStorage)
- **Complexity**: Low–Medium
- **Example concept**: "Garden of Virtues" — 9 fruit trees, each unlocks at a milestone with Bible teaching

#### 3m. Multiplayer Quiz Battle
- **Genre**: Competitive quiz
- **Mechanic**: Real-time or turn-based quiz battles between students
- **Educational**: ★★★★ — Competitive motivation, review reinforcement
- **Framework**: Requires backend (WebSocket or Firebase)
- **Complexity**: High (server infrastructure)
- **Note**: Not feasible with GitHub Pages alone. Alternatives: Firebase Realtime DB for async leaderboards, same-device turn-based co-op, or class-wide goal progress bar using Supabase.

---

## 4. Educational Design Patterns

### Core Principle
Games are tools to **reinforce** spiritual growth, not **replace** it. Every game mechanic should serve a learning objective.

### Gamification Elements
- **Points & Scoring**: Immediate feedback on performance
- **Badges/Achievements**: "Memorized 10 verses", "Completed all Unit 07 games"
- **Quest/Mission System**: Weekly missions tied to curriculum (e.g., "Bible Detective" series where each week builds on the last)
- **Role-Playing Elements**: Kids take on Bible character roles to explore scenarios
- **Team Competition**: Small group battles via relay-style Bible quizzes
- **Streak Rewards**: Bonus points for consecutive correct answers

### Multi-Layer Reward System
- **Instant Rewards**: Points, stars, correct/wrong feedback per action
- **Cumulative Rewards**: Badges, level-ups earned over multiple sessions
- **Long-term Rewards**: Unlockable content (new characters, stories, game modes)
- **Autonomy**: Character customization, avatar decorating for ownership feeling
- **Personalization**: Educational games offer less player control than entertainment — compensate with reward-driven autonomy

### Age-Appropriate Design
- **Ages 5-7 (K-2)**: Large touch targets, simple mechanics (tap/drag), heavy visual feedback, minimal reading. Reference: Bible App for Kids (YouVersion) targets 3-8 with 41 interactive stories + star/diamond collection.
- **Ages 8-10 (3-4)**: Reading-based questions, moderate complexity, score tracking with XP. Reference: Superbook Kids Bible provides 20+ games with XP/level-up system.
- **Ages 11-12 (5-6)**: Strategy elements, moral choices, longer sessions. Escape room-style Bible challenges work well at this level.
- **Adaptive Difficulty**: Auto-adjust easy/medium/hard based on age setting or performance metrics.

### Scripture Memorization Techniques
- **Spaced Repetition Schedule**: Review within 12 hours → 2 days → 4 days → 1 week → 2 weeks. Memory loss is steepest in the first 24 hours.
- **Verse Assembly**: Break verses into fragments → reassemble (repetition without boredom). Reference: Remember Me app combines spaced repetition + gamification.
- **Motion Linking**: Create physical motions for key words — kinesthetic learners retain better.
- **Music Linking**: Set verses to melodies for long-term memory transfer. Practice 5 days/week, few minutes each.
- **Progressive Blanking**: Show full verse → gradually remove words → recall from memory.

### Retention Mechanics
- **Spaced Repetition**: Show missed questions again later in the session, and across sessions
- **Explanation After Answer**: Always show why an answer is correct (already doing this in Heart Quiz)
- **Story Integration**: Wrap mechanics in narrative context, not just isolated questions
- **Multi-Sensory**: Combine visual, audio, and interactive elements

### Cross-Game Progression (v2 Feature)
- Shared `localStorage` profile across all games
- Cumulative score / "faith points" shown on main page
- Unlock badges displayed on a profile card
- Visual progress bar: Kids see their growth over time
- Weekly challenge mode tied to current curriculum unit

### Multiplayer & Cooperative Elements
- **Research basis**: Multiplayer educational games boost "social and motivational inclusion of at-risk students"
- **Cooperative games**: Shared goals develop teamwork, communication, and problem-solving simultaneously
- **GitHub Pages constraint**: WebSocket real-time multiplayer is not feasible with static hosting
- **Viable alternatives**:
  - Same-device turn-based co-op (pass and play)
  - Firebase/Supabase async leaderboard (class rankings)
  - Class-wide goal progress bar (collective achievement)

### Benchmarks: Existing Best Practices
- **Bible App for Kids (YouVersion/OneHope)**: 41 interactive stories, activities, awards, stars, diamonds. Sweet spot ages 3-8. Gold standard for touch-based Bible exploration.
- **Superbook Kids Bible**: 68 free episodes + 20+ games. XP/level-up system. Trivia, word, and action game variety.
- **Remember Me**: Spaced repetition + games + visual learning for scripture retention.
- **Bible Memory App**: #1 scripture memorization system, 2M+ users. Points/levels/badges with dopamine-driven motivation.

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

### Research — Frameworks
- [Best JS/HTML5 Game Engines 2025 — LogRocket](https://blog.logrocket.com/best-javascript-html5-game-engines-2025/)
- [JS Game Engines 2025 — GameFromScratch](https://gamefromscratch.com/javascript-typescript-game-engines-in-2025/)
- [Phaser vs PixiJS Comparison](https://generalistprogrammer.com/comparisons/phaser-vs-pixijs)
- [JS Game Rendering Benchmark](https://github.com/Shirajuki/js-game-rendering-benchmark)
- [Tuesday.js — Lightweight VN Engine](https://github.com/kirilllive/tuesday-js)

### Research — Educational Design
- [Serious Educational Games Framework — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10963373/)
- [Gamification in Education — SpringerOpen](https://slejournal.springeropen.com/articles/10.1186/s40561-019-0085-2)
- [Gamification in Church Education — ChurchTechNews](https://churchtechnews.us/gamification-in-church-education-engaging-the-next-generation/)
- [Game-ifying Your Teaching Time — RaiseUp Faith](https://www.raiseupfaith.com/articles/gamifying-your-teaching-time)
- [Collectible Card Games as Learning Tools — ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1877042812018666)
- [Spaced Repetition for Bible Review — BibleMemoryGoal](https://www.biblememorygoal.com/memory-methods/bible-review-spaced-repetition/)

### Research — Game Genre References
- [Escape Room Templates — Genially](https://genially.com/templates/games/escape-room/)
- [HTML5 Rhythm Games — itch.io](https://itch.io/games/html5/tag-rhythm)
- [Bemuse — Open Source Rhythm Game](https://bemuse.ninja/)
- [HTML5 Card Games — itch.io](https://itch.io/games/html5/tag-card-game)
- [Chrome Music Lab](https://musiclab.chromeexperiments.com/)

### Research — Bible Apps for Kids
- [Bible App for Kids — YouVersion](https://www.bible.com/kids)
- [Superbook Kids Bible App](https://apps.apple.com/us/app/superbook-kids-bible/id606378030)
- [Remember Me — Bible Memory](https://www.remem.me/)
- [Bible Memory App](https://biblememory.com/)

---

*Document created: 2026-03-14*
*Contributors: TARS, CASE, KIPP*
