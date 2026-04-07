/**
 * Profile Card Builder — script.js
 * Vanilla JS only — no frameworks, no libraries
 *
 * Covers:
 *  - Form submit event + preventDefault()
 *  - Inline DOM validation (no alert())
 *  - DOM manipulation: textContent, style, createElement, appendChild
 *  - Checkbox loop → dynamic <span> skill tags
 *  - Color picker → avatar background via JS
 *  - BONUS: Live input listener (name updates card in real-time)
 */

// ─── Element References ────────────────────────────────────────────
const form        = document.getElementById('profileForm');
const formError   = document.getElementById('formError');

const inputName   = document.getElementById('fullName');
const inputTitle  = document.getElementById('jobTitle');
const inputBio    = document.getElementById('bio');
const inputColor  = document.getElementById('avatarColor');
const colorLabel  = document.getElementById('colorHexLabel');

const cardName    = document.getElementById('cardName');
const cardTitle   = document.getElementById('cardTitle');
const cardBio     = document.getElementById('cardBio');
const cardAvatar  = document.getElementById('cardAvatar');
const cardInitials = document.getElementById('cardInitials');
const cardSkills  = document.getElementById('cardSkills');
const cardAccent  = document.getElementById('cardAccent');
const previewHint = document.getElementById('previewHint');

// ─── Utility: Get initials from a name string ──────────────────────
function getInitials(name) {
  if (!name || !name.trim()) return '?';
  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0].toUpperCase())
    .slice(0, 2)
    .join('');
}

// ─── Utility: Show inline error message ───────────────────────────
function showError(message) {
  formError.textContent = message;
  formError.removeAttribute('hidden');
  // Scroll error into view on mobile
  formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ─── Utility: Clear error message ─────────────────────────────────
function clearError() {
  formError.textContent = '';
  formError.setAttribute('hidden', '');
}

// ─── Utility: Validate form fields ────────────────────────────────
function validateForm() {
  const name  = inputName.value.trim();
  const title = inputTitle.value.trim();

  if (!name && !title) {
    showError('⚠ Full Name and Job Title are required. Please fill them in.');
    inputName.focus();
    return false;
  }
  if (!name) {
    showError('⚠ Full Name is required.');
    inputName.focus();
    return false;
  }
  if (!title) {
    showError('⚠ Job Title is required.');
    inputTitle.focus();
    return false;
  }

  clearError();
  return true;
}

// ─── Render Skill Tags ─────────────────────────────────────────────
function renderSkillTags() {
  // Clear existing tags
  cardSkills.innerHTML = '';

  // Get all checked checkboxes
  const checkedSkills = document.querySelectorAll('input[name="skills"]:checked');

  if (checkedSkills.length === 0) {
    // Show placeholder if no skills selected
    const placeholder = document.createElement('span');
    placeholder.className = 'skill-tag skill-tag--placeholder';
    placeholder.textContent = 'No skills selected';
    cardSkills.appendChild(placeholder);
    return;
  }

  // Loop over checked checkboxes → create <span> for each
  checkedSkills.forEach(function(checkbox) {
    const tag = document.createElement('span');
    tag.textContent = checkbox.value;
    tag.setAttribute('role', 'listitem');
    cardSkills.appendChild(tag);
  });
}

// ─── Update Avatar Color ───────────────────────────────────────────
function updateAvatarColor(color) {
  cardAvatar.style.backgroundColor = color;
  // Update accent bar gradient to match
  cardAccent.style.background = `linear-gradient(90deg, ${color}, #a78bfa)`;
}

// ─── Update Card Preview from form data ───────────────────────────
function updateCardPreview() {
  const name  = inputName.value.trim();
  const title = inputTitle.value.trim();
  const bio   = inputBio.value.trim();
  const color = inputColor.value;

  // Update text content via DOM manipulation
  cardName.textContent    = name  || 'Your Name';
  cardTitle.textContent   = title || 'Your Job Title';
  cardBio.textContent     = bio   || 'Your bio will appear here once you fill the form.';
  cardInitials.textContent = getInitials(name);

  // Update avatar color
  updateAvatarColor(color);

  // Render skill tags
  renderSkillTags();
}

// ─── BONUS: Live Input Listener (name → card in real-time) ────────
inputName.addEventListener('input', function() {
  // Real-time name update as user types
  const name = inputName.value.trim();
  cardName.textContent = name || 'Your Name';
  cardInitials.textContent = getInitials(name);
});

// Live bio update
inputBio.addEventListener('input', function() {
  const bio = inputBio.value.trim();
  cardBio.textContent = bio || 'Your bio will appear here once you fill the form.';
});

// ─── Color Picker: Live update + hex label ────────────────────────
inputColor.addEventListener('input', function() {
  const color = inputColor.value;
  colorLabel.textContent = color;
  updateAvatarColor(color);
});

// ─── Form Submit Event ─────────────────────────────────────────────
form.addEventListener('submit', function(event) {
  // Prevent default form submission / page reload
  event.preventDefault();

  // Validate — show inline error if invalid (no alert() used)
  if (!validateForm()) {
    return;
  }

  // Valid → update card preview
  updateCardPreview();

  // Hide the hint text after first successful generation
  if (previewHint) {
    previewHint.style.opacity = '0';
    previewHint.style.transition = 'opacity 0.4s ease';
    setTimeout(function() {
      previewHint.style.display = 'none';
    }, 400);
  }

  // Micro-feedback: brief button state
  const btn     = document.getElementById('generateBtn');
  const btnText = btn.querySelector('.btn-text');
  btnText.textContent = 'Card Updated!';
  btn.style.background = '#22c55e';

  setTimeout(function() {
    btnText.textContent = 'Generate Card';
    btn.style.background = '';
  }, 1800);
});

// ─── Init: Set initial avatar color on page load ──────────────────
(function init() {
  updateAvatarColor(inputColor.value);
  colorLabel.textContent = inputColor.value;
})();