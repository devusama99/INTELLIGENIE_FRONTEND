export function logout(history) {
  localStorage.clear();
  history.push("/signIn");
}

export function logoutAdmin(history) {
  localStorage.clear();
  history.push("/adminSignin");
}
