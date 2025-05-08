export async function checkAuth() {
  const response = await fetch(
    "http://doctorappointments.atwebpages.com/doctor-appointments/Backend/routes/auth/checkAuth.php",
    {
      method: "GET",
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}
