import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MessagesService {
  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  getAllMessages() {
    return this.http.get(this.BASE_URL + "messages/");
  }
  addNewMessage(name, email, message) {
    return this.http.post(this.BASE_URL + "messages/add/message", {
      name: name,
      email: email,
      message,
    });
  }
}
