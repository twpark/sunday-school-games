/* ===== Sunday School Games v2 — Profile UI ===== */

(function() {
  const profile = SSG.getProfile();

  // Update profile bar if on hub page
  const nameEl = document.getElementById('profile-name');
  const scoreEl = document.getElementById('profile-score');
  const badgesEl = document.getElementById('profile-badges');

  if (nameEl) nameEl.textContent = profile.name;
  if (scoreEl) scoreEl.textContent = profile.totalPoints + ' Faith Points';
  if (badgesEl) {
    badgesEl.innerHTML = profile.badges
      .map(id => {
        const badge = SSG.BADGES[id];
        return badge ? '<span class="badge-icon" title="' + badge.name + '">' + badge.icon + '</span>' : '';
      })
      .join('');
  }
})();
