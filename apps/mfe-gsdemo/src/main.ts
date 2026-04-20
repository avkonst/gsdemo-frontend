// In a real setup these would be imported from the SDK packages.
// Here we inline minimal typed clients for the demo.

interface LoginResponse {
  token: string;
}

interface VerifyResponse {
  valid: boolean;
}

interface SampleRow {
  id: number;
  name: string;
  value: string;
}

const SSO_BASE = "/api/sso";
const CORE_BASE = "/api/core";

async function ssoLogin(): Promise<string> {
  const res = await fetch(`${SSO_BASE}/login`, { method: "POST" });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  const data: LoginResponse = await res.json();
  return data.token;
}

async function coreGetRow(id: number, token: string): Promise<SampleRow> {
  const res = await fetch(`${CORE_BASE}/rows/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Fetch row failed: ${res.status}`);
  return res.json() as Promise<SampleRow>;
}

const output = document.getElementById("output")!;
const loginBtn = document.getElementById("login-btn") as HTMLButtonElement;
const fetchBtn = document.getElementById("fetch-btn") as HTMLButtonElement;

let currentToken = "";

loginBtn.addEventListener("click", async () => {
  try {
    output.textContent = "Logging in...";
    currentToken = await ssoLogin();
    output.textContent = `Token: ${currentToken}`;
    fetchBtn.disabled = false;
  } catch (e) {
    output.textContent = `Error: ${e}`;
  }
});

fetchBtn.addEventListener("click", async () => {
  try {
    output.textContent = "Fetching row #1...";
    const row = await coreGetRow(1, currentToken);
    output.textContent = JSON.stringify(row, null, 2);
  } catch (e) {
    output.textContent = `Error: ${e}`;
  }
});
