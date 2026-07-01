const USERS_ENDPOINT = "http://localhost:3000/users";

async function getUsers() {
    const btn = document.getElementById("load-btn");
    const result = document.getElementById("result");

    btn.disabled = true;
    btn.innerHTML = '<span class="btn-prompt">&gt;</span> Loading…';
    result.innerHTML = '<p class="state-message">Querying network…</p>';

    try {
        const response = await fetch(USERS_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        result.innerHTML = `<p class="state-message error">Couldn't reach the roster endpoint. ${error.message}</p>`;
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-prompt">&gt;</span> Load Users';
    }
}

function renderUsers(users) {
    const result = document.getElementById("result");

    if (!Array.isArray(users) || users.length === 0) {
        result.innerHTML = '<p class="state-message">No vertices found on the network.</p>';
        return;
    }

    const cards = users.map(user => renderUserCard(user)).join("");

    result.innerHTML = `<div class="user-grid">${cards}</div>`;
}

function renderUserCard(user) {
    // Adapts to whatever shape the API returns — falls back gracefully
    // if a field is missing instead of printing "undefined".
    const name = user.name ?? user.username ?? user.email ?? `User ${user.id ?? ""}`.trim();
    const initials = getInitials(name);

    const subtitle = user.username
        ? `@${user.username}`
        : (user.email ?? "");

    const metaFields = ["email", "phone", "website"]
        .filter(key => key in user && user[key] && user[key] !== name && `@${user[key]}` !== subtitle)
        .map(key => `<p class="user-meta">${escapeHtml(String(user[key]))}</p>`)
        .join("");

    return `
        <div class="user-card">
            <div class="vertex-marker">${initials}</div>
            <div class="user-info">
                <p class="user-name">${escapeHtml(String(name))}</p>
                ${subtitle ? `<p class="user-username">${escapeHtml(String(subtitle))}</p>` : ""}
                ${metaFields}
            </div>
        </div>
    `;
}

function getInitials(name) {
    if (!name) return "?";
    return name
        .split(" ")
        .map(part => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str ?? "";
    return div.innerHTML;
}