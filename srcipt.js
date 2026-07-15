/* =========================================================
   EASTCSO Web Portal - script.js
   Handles: Navigation toggle, CRUD for Events & Announcements,
   Contact form, Quick stats
   ========================================================= */

/* ---------- Mobile Navigation ---------- */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

/* Close mobile menu when a link is clicked */
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

/* =========================================================
   IN-MEMORY DATA STORE (acts as our "database")
   ========================================================= */
let events = [
  { id: 1, title: 'Freshers Orientation', date: '2026-07-05', desc: 'Welcome session for new students with campus tour.' },
  { id: 2, title: 'Annual Sports Gala', date: '2026-08-12', desc: 'Inter-class sports competitions and award ceremony.' },
  { id: 3, title: 'Career Fair', date: '2026-09-20', desc: 'Meet employers and explore internship opportunities.' }
];

let announcements = [
  { id: 1, title: 'Exam Timetable Released', body: 'The Semester II exam timetable is now available on Moodle. Please check your schedule.', date: '2026-06-10' },
  { id: 2, title: 'Library Hours Extended', body: 'The library will now remain open until 9 PM on weekdays during the exam period.', date: '2026-06-08' }
];

let eventIdCounter = events.length ? Math.max(...events.map(e => e.id)) + 1 : 1;
let announcementIdCounter = announcements.length ? Math.max(...announcements.map(a => a.id)) + 1 : 1;

/* =========================================================
   EVENTS - CRUD
   ========================================================= */
const eventForm = document.getElementById('eventForm');
const eventIdField = document.getElementById('eventId');
const eventTitleField = document.getElementById('eventTitle');
const eventDateField = document.getElementById('eventDate');
const eventDescField = document.getElementById('eventDesc');
const eventSubmitBtn = document.getElementById('eventSubmitBtn');
const eventCancelBtn = document.getElementById('eventCancelBtn');
const eventsTableBody = document.getElementById('eventsTableBody');

function renderEvents() {
  eventsTableBody.innerHTML = '';

  if (events.length === 0) {
    eventsTableBody.innerHTML = '<tr><td colspan="4">No events scheduled yet. Add one above.</td></tr>';
  } else {
    // Sort by date ascending
    const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

    sorted.forEach(ev => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${escapeHTML(ev.title)}</td>
        <td>${formatDate(ev.date)}</td>
        <td>${escapeHTML(ev.desc)}</td>
        <td>
          <button class="btn-edit" data-action="edit-event" data-id="${ev.id}">Edit</button>
          <button class="btn-delete" data-action="delete-event" data-id="${ev.id}">Delete</button>
        </td>
      `;
      eventsTableBody.appendChild(row);
    });
  }

  updateStats();
}

eventForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = eventIdField.value;
  const title = eventTitleField.value.trim();
  const date = eventDateField.value;
  const desc = eventDescField.value.trim();

  if (!title || !date || !desc) return;

  if (id) {
    // UPDATE
    const ev = events.find(x => x.id === Number(id));
    if (ev) {
      ev.title = title;
      ev.date = date;
      ev.desc = desc;
    }
  } else {
    // CREATE
    events.push({ id: eventIdCounter++, title, date, desc });
  }

  resetEventForm();
  renderEvents();
});

eventCancelBtn.addEventListener('click', resetEventForm);

function resetEventForm() {
  eventForm.reset();
  eventIdField.value = '';
  eventSubmitBtn.textContent = 'Add Event';
  eventCancelBtn.hidden = true;
}

eventsTableBody.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const id = Number(btn.dataset.id);

  if (btn.dataset.action === 'edit-event') {
    const ev = events.find(x => x.id === id);
    if (!ev) return;
    eventIdField.value = ev.id;
    eventTitleField.value = ev.title;
    eventDateField.value = ev.date;
    eventDescField.value = ev.desc;
    eventSubmitBtn.textContent = 'Update Event';
    eventCancelBtn.hidden = false;
    eventForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  if (btn.dataset.action === 'delete-event') {
    if (confirm('Delete this event?')) {
      events = events.filter(x => x.id !== id);
      renderEvents();
    }
  }
});

/* =========================================================
   ANNOUNCEMENTS - CRUD
   ========================================================= */
const announcementForm = document.getElementById('announcementForm');
const announcementIdField = document.getElementById('announcementId');
const announcementTitleField = document.getElementById('announcementTitle');
const announcementBodyField = document.getElementById('announcementBody');
const announcementSubmitBtn = document.getElementById('announcementSubmitBtn');
const announcementCancelBtn = document.getElementById('announcementCancelBtn');
const announcementList = document.getElementById('announcementList');

function renderAnnouncements() {
  announcementList.innerHTML = '';

  if (announcements.length === 0) {
    announcementList.innerHTML = '<li class="announcement-item">No announcements yet.</li>';
  } else {
    const sorted = [...announcements].sort((a, b) => new Date(b.date) - new Date(a.date));

    sorted.forEach(a => {
      const li = document.createElement('li');
      li.className = 'announcement-item';
      li.innerHTML = `
        <h4>${escapeHTML(a.title)}</h4>
        <div class="meta">${formatDate(a.date)}</div>
        <p>${escapeHTML(a.body)}</p>
        <div class="item-actions">
          <button class="btn-edit" data-action="edit-announcement" data-id="${a.id}">Edit</button>
          <button class="btn-delete" data-action="delete-announcement" data-id="${a.id}">Delete</button>
        </div>
      `;
      announcementList.appendChild(li);
    });
  }

  updateStats();
}

announcementForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = announcementIdField.value;
  const title = announcementTitleField.value.trim();
  const body = announcementBodyField.value.trim();

  if (!title || !body) return;

  if (id) {
    // UPDATE
    const a = announcements.find(x => x.id === Number(id));
    if (a) {
      a.title = title;
      a.body = body;
    }
  } else {
    // CREATE
    const today = new Date().toISOString().split('T')[0];
    announcements.push({ id: announcementIdCounter++, title, body, date: today });
  }

  resetAnnouncementForm();
  renderAnnouncements();
});

announcementCancelBtn.addEventListener('click', resetAnnouncementForm);

function resetAnnouncementForm() {
  announcementForm.reset();
  announcementIdField.value = '';
  announcementSubmitBtn.textContent = 'Post Announcement';
  announcementCancelBtn.hidden = true;
}

announcementList.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const id = Number(btn.dataset.id);

  if (btn.dataset.action === 'edit-announcement') {
    const a = announcements.find(x => x.id === id);
    if (!a) return;
    announcementIdField.value = a.id;
    announcementTitleField.value = a.title;
    announcementBodyField.value = a.body;
    announcementSubmitBtn.textContent = 'Update Announcement';
    announcementCancelBtn.hidden = false;
    announcementForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  if (btn.dataset.action === 'delete-announcement') {
    if (confirm('Delete this announcement?')) {
      announcements = announcements.filter(x => x.id !== id);
      renderAnnouncements();
    }
  }
});

/* =========================================================
   CONTACT FORM
   ========================================================= */
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  contactStatus.textContent = 'Thank you! Your message has been received.';
  contactForm.reset();
  setTimeout(() => { contactStatus.textContent = ''; }, 4000);
});

/* =========================================================
   QUICK STATS
   ========================================================= */
function updateStats() {
  document.getElementById('statEvents').textContent = events.length;
  document.getElementById('statAnnouncements').textContent = announcements.length;
}

/* =========================================================
   HELPERS
   ========================================================= */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* =========================================================
   INITIAL RENDER
   ========================================================= */
renderEvents();
renderAnnouncements();