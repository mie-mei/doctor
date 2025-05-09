export async function checkAuth() {
  const response = await fetch(
    "https://doctor-appointments-5pb4.onrender.com/routes/auth/checkAuth.php",
    {
      method: "GET",
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}
