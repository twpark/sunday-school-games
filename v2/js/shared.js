/* ===== Sunday School Games v2 — Shared Utilities ===== */

const SSG = {
  STORAGE_KEY: 'ssg_v2_profile',

  // --- Profile Management ---
  getProfile() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : this.createProfile();
    } catch {
      return this.createProfile();
    }
  },

  createProfile() {
    const profile = {
      name: 'Guest',
      totalPoints: 0,
      gamesPlayed: 0,
      gamesCompleted: {},
      badges: [],
      createdAt: Date.now()
    };
    this.saveProfile(profile);
    return profile;
  },

  saveProfile(profile) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
    } catch { /* localStorage full or unavailable */ }
  },

  // --- Score Management ---
  addPoints(gameId, points) {
    const profile = this.getProfile();
    profile.totalPoints += points;
    profile.gamesPlayed++;
    if (!profile.gamesCompleted[gameId]) {
      profile.gamesCompleted[gameId] = { plays: 0, bestScore: 0 };
    }
    profile.gamesCompleted[gameId].plays++;
    if (points > profile.gamesCompleted[gameId].bestScore) {
      profile.gamesCompleted[gameId].bestScore = points;
    }
    this.checkBadges(profile);
    this.saveProfile(profile);
    return profile;
  },

  // --- Badge System ---
  BADGES: {
    first_game: { icon: '⭐', name: 'First Step', desc: 'Complete your first game' },
    all_games: { icon: '👑', name: 'Champion', desc: 'Complete all 4 games' },
    perfect_score: { icon: '💯', name: 'Perfect', desc: 'Get a perfect score' },
    ten_games: { icon: '🔥', name: 'On Fire', desc: 'Play 10 games' },
    verse_master: { icon: '📖', name: 'Verse Master', desc: 'Match all verses in Verse Match' },
    word_finder: { icon: '🔍', name: 'Word Finder', desc: 'Find all words in Word Puzzle' },
    escape_artist: { icon: '🗝️', name: 'Escape Artist', desc: 'Complete Escape Room' },
    story_writer: { icon: '✍️', name: 'Story Writer', desc: 'Complete Visual Novel' }
  },

  checkBadges(profile) {
    if (profile.gamesPlayed >= 1 && !profile.badges.includes('first_game')) {
      profile.badges.push('first_game');
    }
    if (profile.gamesPlayed >= 10 && !profile.badges.includes('ten_games')) {
      profile.badges.push('ten_games');
    }
    const gameIds = ['escape-room', 'visual-novel', 'verse-match', 'word-puzzle'];
    const allCompleted = gameIds.every(id => profile.gamesCompleted[id]?.plays > 0);
    if (allCompleted && !profile.badges.includes('all_games')) {
      profile.badges.push('all_games');
    }
  },

  awardBadge(badgeId) {
    const profile = this.getProfile();
    if (!profile.badges.includes(badgeId)) {
      profile.badges.push(badgeId);
      this.saveProfile(profile);
    }
  },

  // --- Utility Functions ---
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  // --- Audio Manager ---
  audio: {
    _ctx: null,
    getContext() {
      if (!this._ctx) {
        this._ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
      return this._ctx;
    },
    playTone(freq, duration, type) {
      try {
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + (duration || 0.2));
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + (duration || 0.2));
      } catch { /* audio not supported */ }
    },
    correct() { this.playTone(523, 0.15); setTimeout(() => this.playTone(659, 0.15), 100); },
    wrong() { this.playTone(200, 0.3, 'sawtooth'); },
    click() { this.playTone(440, 0.05); },
    success() {
      this.playTone(523, 0.1);
      setTimeout(() => this.playTone(659, 0.1), 100);
      setTimeout(() => this.playTone(784, 0.2), 200);
    }
  }
};
