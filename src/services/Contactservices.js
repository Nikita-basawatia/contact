import axios from "axios";

export class Contactservices {
  static serverURL = "http://localhost:9000";

  static getAllContacts() {
    let dataURL = `${this.serverURL}/contact`;
    return axios.get(dataURL);
  }

  static deleteContact(id) {
    const response = axios.delete(`${this.serverURL}/contact/${id}`);
    return response.data;
  }
}
