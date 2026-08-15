/*
  Lightweight PIN gate for the Manage Menu page.

  This is a simple deterrent, not real security: anyone who opens
  their browser's developer tools could technically bypass it. But
  it stops people from casually finding admin.html and editing your
  menu, which is what this is for.

  The PIN is stored on THIS device/browser. The first time you (or
  anyone) opens admin.html, you'll be asked to set a PIN. From then
  on, that PIN is required to unlock this page on this device.
*/

(function () {
  const PIN_KEY = "bakery_admin_pin_v1";
  const UNLOCK_KEY = "bakery_admin_unlocked_v1"; // per-tab-session unlock

  const lockScreen = document.getElementById("lock-screen");
  const adminContent = document.getElementById("admin-content");
  const lockTitle = document.getElementById("lock-title");
  const lockSub = document.getElementById("lock-sub");
  const pinInput = document.getElementById("pin-input");
  const pinSubmit = document.getElementById("pin-submit");
  const pinError = document.getElementById("pin-error");

  function getSavedPin() {
    return localStorage.getItem(PIN_KEY);
  }

  function showLock(mode) {
    lockScreen.style.display = "block";
    adminContent.style.display = "none";
    pinError.style.display = "none";
    pinInput.value = "";
    if (mode === "set") {
      lockTitle.textContent = "Set a PIN";
      lockSub.textContent = "Choose a PIN (4+ digits) to protect this page. You'll need it every time you manage the menu on this device.";
      pinSubmit.textContent = "Set PIN";
    } else {
      lockTitle.textContent = "Enter PIN";
      lockSub.textContent = "This page is private. Enter your PIN to manage the menu.";
      pinSubmit.textContent = "Unlock";
    }
    pinInput.focus();
  }

  function unlock() {
    lockScreen.style.display = "none";
    adminContent.style.display = "block";
    sessionStorage.setItem(UNLOCK_KEY, "1");
  }

  function handleSubmit() {
    const saved = getSavedPin();
    const entered = pinInput.value.trim();

    if (!saved) {
      // First time: setting a new PIN
      if (entered.length < 4) {
        pinError.textContent = "Please use at least 4 digits.";
        pinError.style.display = "block";
        return;
      }
      localStorage.setItem(PIN_KEY, entered);
      unlock();
      return;
    }

    if (entered === saved) {
      unlock();
    } else {
      pinError.textContent = "Incorrect PIN. Try again.";
      pinError.style.display = "block";
      pinInput.value = "";
      pinInput.focus();
    }
  }

  pinSubmit.addEventListener("click", handleSubmit);
  pinInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSubmit();
  });

  // On load: if already unlocked this browser tab session, skip straight in.
  // Otherwise always ask for the PIN (or to set one, if none exists yet).
  if (sessionStorage.getItem(UNLOCK_KEY) === "1") {
    unlock();
  } else {
    showLock(getSavedPin() ? "enter" : "set");
  }

  // Exposed so admin.js can wire up "Change PIN" and "Lock" buttons.
  window.pinLock = {
    changePin: function () {
      const current = getSavedPin();
      if (current) {
        const check = prompt("Enter your current PIN to change it:");
        if (check !== current) {
          alert("Incorrect PIN.");
          return;
        }
      }
      const next = prompt("Enter a new PIN (4+ digits):");
      if (!next) return;
      if (next.trim().length < 4) {
        alert("PIN must be at least 4 digits.");
        return;
      }
      localStorage.setItem(PIN_KEY, next.trim());
      alert("PIN updated.");
    },
    lock: function () {
      sessionStorage.removeItem(UNLOCK_KEY);
      showLock("enter");
    },
  };
})();
