export async function checkAuth() {
  const response = await fetch(
    "http://localhost/doctor-appointments/backend/routes/auth/checkAuth.php",
    {
      method: "GET",
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}
