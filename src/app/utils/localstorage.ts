export class LocalStorageUtils {

  public obterUsuario() {
    return JSON.parse(localStorage.getItem('o2.user'));
  }

  public obterTokenUsuario(): string {
    return localStorage.getItem('o2.token')
  }

  public salvarUsuario(user: string) {
    localStorage.setItem('o2.user', JSON.stringify(user));
  }

  public salvarTokenUsuario(token: string) {
    localStorage.setItem('o2.token', token);
  }

  public salvarDadosLocaisUsuario(response: any) {
    this.salvarTokenUsuario(response.accessToken);
    this.salvarUsuario(response.userToken);
  }

  public limparDadosLocaisUsuario() {
    localStorage.removeItem('o2.token');
    localStorage.removeItem('o2.user');
  }
}
