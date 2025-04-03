import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    // Check if there is a token and if it is not expired
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // Decode the token to get its expiration time
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        // Check if the token is expired
        return decoded.exp * 1000 < Date.now();
      }
      return false;
    } catch (error) {
      // If decoding fails, consider the token expired
      return true;
    }
  }
  getToken(): string | null {
    // TODO: return the token
    const loggedUser = localStorage.getItem('id_token');
    return loggedUser;
  }

  login(idToken: string) {
    // TODO: set 
    // the token to localStorage
    localStorage.setItem('id_token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    // TODO: redirect to the login page
    window.location.assign('/');
  }
}

export default new AuthService();
