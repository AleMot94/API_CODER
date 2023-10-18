export default class SessionDTO {
  constructor(session) {
    if (session) {
      this.email = session.email;
      this.firstName = session.firstName;
      this.lastName = session.lastName;
      this.admin = session.admin;
      this.id = session.id;
    }
  }
}
