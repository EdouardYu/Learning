export default class AuthenticationService {
  static isAuthenticated(): boolean {
    const token: string | null = localStorage.getItem("token");
    // la double négation permet de convertir le token en boolean
    return !!token;
  }

  static login(username: string, password: string): Promise<boolean> {
    return fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.saveToken(response.token);
        return this.isAuthenticated();
      })
      .catch((error) => {
        this.handleError(error);
        return false;
      });
  }

  static saveToken(token: string): void {
    // c'est comme le cookie de la page de navigation qui n'a pas d'expiration
    // contrairement au sessionStorage qui est nettoyé quand le navigateur prend fin
    if (token) localStorage.setItem("token", token);
  }

  static logout(): void {
    localStorage.removeItem("token");
  }

  static handleError(error: Error): void {
    console.log(error);
    window.location = "/server/error" as unknown as Location;
  }
}
