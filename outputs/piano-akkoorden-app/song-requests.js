(function () {
  const STATUS_LABELS = {
    nieuw: "Nieuw",
    bekeken: "Bekeken",
    in_behandeling: "In behandeling",
    toegevoegd: "Toegevoegd",
    afgewezen: "Afgewezen",
  };
  const STATUS_OPTIONS = Object.keys(STATUS_LABELS);
  const FORM_ID = "ns-song-request-form";
  let supabaseClient = null;
  let currentUser = null;
  let isAdmin = false;
  let cachedRequests = [];
  let isLoading = false;
  let lastLoadAt = 0;
  let mountTimer = null;

  function findSupabaseClient() {
    if (supabaseClient) return supabaseClient;
    const directCandidates = [
      window.supabaseClient,
      window.nootstudioSupabase,
      window.appSupabase,
      window.sb,
      window.supabase,
    ];
    for (const candidate of directCandidates) {
      if (candidate && typeof candidate.from === "function" && candidate.auth) {
        supabaseClient = candidate;
        return supabaseClient;
      }
    }
    for (const key of Object.keys(window)) {
      try {
        const candidate = window[key];
        if (candidate && typeof candidate.from === "function" && candidate.auth) {
          supabaseClient = candidate;
          return supabaseClient;
        }
      } catch (_) {
        // Some browser globals throw on access.
      }
    }
    return null;
  }

  function html(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatDate(value) {
    if (!value) return "";
    return new Intl.DateTimeFormat("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  }

  async function refreshContext() {
    const client = findSupabaseClient();
    if (!client) return false;
    const sessionResult = await client.auth.getSession();
    currentUser = sessionResult?.data?.session?.user || null;
    if (!currentUser) return false;

    const profileResult = await client
      .from("profiles")
      .select("role")
      .eq("user_id", currentUser.id)
      .maybeSingle();
    isAdmin = profileResult?.data?.role === "admin";
    return true;
  }

  async function loadRequests(force) {
    if (isLoading) return;
    if (!force && cachedRequests.length && Date.now() - lastLoadAt < 30000) return;
    const client = findSupabaseClient();
    if (!client || !currentUser) return;
    isLoading = true;
    const result = await client
      .from("song_requests")
      .select("*")
      .order("created_at", { ascending: false });
    isLoading = false;
    lastLoadAt = Date.now();
    if (!result.error) cachedRequests = result.data || [];
  }

  function ownRequests() {
    if (isAdmin) return [];
    return cachedRequests.filter((request) => request.user_id === currentUser?.id).slice(0, 4);
  }

  function statusBadge(status) {
    return `<span class="ns-song-request-status" data-status="${html(status)}">${html(
      STATUS_LABELS[status] || status || "Nieuw"
    )}</span>`;
  }

  function renderOwnRequests() {
    const items = ownRequests();
    if (!items.length) return "";
    return `
      <div class="ns-song-request-list" aria-label="Jouw ingestuurde liedjes">
        ${items
          .map(
            (request) => `
              <article class="ns-song-request-card">
                <strong>${html(request.title)}</strong>
                <div class="ns-song-request-meta">
                  ${request.artist ? `<span>${html(request.artist)}</span>` : ""}
                  <span>${formatDate(request.created_at)}</span>
                  ${statusBadge(request.status)}
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderStudentPanel() {
    return `
      <div class="ns-song-request-actions">
        <div>
          <h2>Liedje aanvragen</h2>
          <p>Mis je een liedje in de Nootstudio Piano Toolkit? Geef het hier door.</p>
        </div>
      </div>
      <form class="ns-song-request-form" id="${FORM_ID}">
        <label>
          Titel
          <input name="title" autocomplete="off" required placeholder="Bijv. Let it be">
        </label>
        <label>
          Artiest
          <input name="artist" autocomplete="off" placeholder="Bijv. The Beatles">
        </label>
        <label>
          Jouw naam
          <input name="student_name" autocomplete="name" placeholder="Optioneel">
        </label>
        <label>
          E-mailadres
          <input value="${html(currentUser?.email || "")}" disabled>
        </label>
        <label>
          Opmerking
          <textarea name="notes" placeholder="Bijv. graag refrein eerst, of een speciale versie"></textarea>
        </label>
        <div class="ns-song-request-actions">
          <button class="ns-song-request-button" type="submit">Verstuur verzoek</button>
          <span class="ns-song-request-message" id="ns-song-request-message"></span>
        </div>
      </form>
      ${renderOwnRequests()}
    `;
  }

  function requestStats() {
    return STATUS_OPTIONS.map((status) => {
      const count = cachedRequests.filter((request) => request.status === status).length;
      return `<span class="ns-song-request-stat">${html(STATUS_LABELS[status])}: ${count}</span>`;
    }).join("");
  }

  function renderAdminPanel() {
    return `
      <div class="ns-song-request-admin-head">
        <div>
          <h2>Liedjesverzoeken</h2>
          <p>Alle verzoeken van leerlingen staan hier centraal bij elkaar.</p>
        </div>
        <button class="ns-song-request-button secondary" type="button" data-song-request-refresh>Ververs</button>
      </div>
      <div class="ns-song-request-stats">
        <span class="ns-song-request-stat">Totaal: ${cachedRequests.length}</span>
        ${requestStats()}
      </div>
      <div class="ns-song-request-list">
        ${
          cachedRequests.length
            ? cachedRequests
                .map(
                  (request) => `
                    <article class="ns-song-request-card ns-song-request-admin-row" data-song-request-id="${html(
                      request.id
                    )}">
                      <div>
                        <strong>${html(request.title)}</strong>
                        <div class="ns-song-request-meta">
                          ${request.artist ? `<span>${html(request.artist)}</span>` : ""}
                          <span>${html(request.email)}</span>
                          ${request.student_name ? `<span>${html(request.student_name)}</span>` : ""}
                          <span>${formatDate(request.created_at)}</span>
                        </div>
                        ${request.notes ? `<p>${html(request.notes)}</p>` : ""}
                      </div>
                      <select aria-label="Status verzoek" data-song-request-status>
                        ${STATUS_OPTIONS.map(
                          (status) =>
                            `<option value="${html(status)}" ${
                              request.status === status ? "selected" : ""
                            }>${html(STATUS_LABELS[status])}</option>`
                        ).join("")}
                      </select>
                      <button class="ns-song-request-delete" type="button" aria-label="Verwijder verzoek" data-song-request-delete>&times;</button>
                    </article>
                  `
                )
                .join("")
            : `<article class="ns-song-request-card"><p>Er zijn nog geen liedjesverzoeken.</p></article>`
        }
      </div>
    `;
  }

  function findTextAnchor(text) {
    const nodes = Array.from(document.querySelectorAll("section, main > div, .card, .panel, div"));
    return nodes.find((node) => node.textContent && node.textContent.includes(text));
  }

  function placePanel(panel) {
    const anchor = findTextAnchor("Liedjes in deze toonsoort") || findTextAnchor("Akkoorden per noot");
    const parent = anchor?.parentNode || document.querySelector("main") || document.body;
    if (anchor?.nextSibling) parent.insertBefore(panel, anchor.nextSibling);
    else parent.appendChild(panel);
  }

  function placeAdminPanel(panel) {
    const anchor = findTextAnchor("Toegangscodes") || findTextAnchor("Liedje toevoegen");
    const parent = anchor?.parentNode || document.querySelector("main") || document.body;
    if (anchor) parent.insertBefore(panel, anchor);
    else parent.appendChild(panel);
  }

  async function mount() {
    const hasContext = await refreshContext();
    if (!hasContext) return;
    await loadRequests(false);

    let studentPanel = document.getElementById("ns-song-request-panel");
    if (!studentPanel) {
      studentPanel = document.createElement("section");
      studentPanel.id = "ns-song-request-panel";
      studentPanel.className = "ns-song-request-panel";
      placePanel(studentPanel);
    }
    studentPanel.innerHTML = renderStudentPanel();

    let adminPanel = document.getElementById("ns-song-request-admin");
    if (isAdmin) {
      if (!adminPanel) {
        adminPanel = document.createElement("section");
        adminPanel.id = "ns-song-request-admin";
        adminPanel.className = "ns-song-request-admin";
        placeAdminPanel(adminPanel);
      }
      adminPanel.innerHTML = renderAdminPanel();
    } else if (adminPanel) {
      adminPanel.remove();
    }
  }

  async function reloadAndMount() {
    await refreshContext();
    await loadRequests(true);
    await mount();
  }

  document.addEventListener("submit", async (event) => {
    if (event.target?.id !== FORM_ID) return;
    event.preventDefault();
    const message = document.getElementById("ns-song-request-message");
    const formData = new FormData(event.target);
    const title = String(formData.get("title") || "").trim();
    if (!title || !currentUser) return;

    if (message) message.textContent = "Versturen...";
    const result = await findSupabaseClient()
      .from("song_requests")
      .insert({
        user_id: currentUser.id,
        email: currentUser.email,
        title,
        artist: String(formData.get("artist") || "").trim() || null,
        student_name: String(formData.get("student_name") || "").trim() || null,
        notes: String(formData.get("notes") || "").trim() || null,
      });

    if (result.error) {
      if (message) message.textContent = "Verzoek kon niet worden verstuurd.";
      return;
    }
    event.target.reset();
    if (message) message.textContent = "Dank je, je verzoek is verstuurd.";
    await reloadAndMount();
  });

  document.addEventListener("change", async (event) => {
    if (!event.target?.matches("[data-song-request-status]")) return;
    const card = event.target.closest("[data-song-request-id]");
    const id = card?.getAttribute("data-song-request-id");
    if (!id || !isAdmin) return;
    await findSupabaseClient()
      .from("song_requests")
      .update({
        status: event.target.value,
        handled_at: ["toegevoegd", "afgewezen"].includes(event.target.value) ? new Date().toISOString() : null,
        handled_by: ["toegevoegd", "afgewezen"].includes(event.target.value) ? currentUser.id : null,
      })
      .eq("id", id);
    await reloadAndMount();
  });

  document.addEventListener("click", async (event) => {
    if (event.target?.matches("[data-song-request-refresh]")) {
      await reloadAndMount();
      return;
    }
    if (!event.target?.matches("[data-song-request-delete]")) return;
    const card = event.target.closest("[data-song-request-id]");
    const id = card?.getAttribute("data-song-request-id");
    if (!id || !isAdmin) return;
    if (!window.confirm("Dit liedjesverzoek verwijderen?")) return;
    await findSupabaseClient().from("song_requests").delete().eq("id", id);
    await reloadAndMount();
  });

  const observer = new MutationObserver(() => {
    window.clearTimeout(mountTimer);
    mountTimer = window.setTimeout(mount, 250);
  });

  window.NootstudioSongRequests = {
    mount,
    reload: reloadAndMount,
  };

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
