const BASE_URL = "http://localhost:8000";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";
    return;
  }

  if (!response.ok) {
    let text;
    try { text = await response.text(); }
    catch { text = null; }

    throw new Error(`Erro na requisição: ${response.status}${text ? ' — ' + text : ''}`);
  }

  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return await response.text();
  }

  return await response.json();
}
