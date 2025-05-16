export async function checkAuth() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await fetch(`${backendUrl}routes/auth/checkAuth.php`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
}
