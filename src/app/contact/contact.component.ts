import { Component, OnInit } from "@angular/core";
import { MessagesService } from "../messages.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  name: String = "";
  email: String = "";
  message: String = "";
  constructor(private messageServ: MessagesService) {}

  ngOnInit(): void {}

  addMessage() {
    this.messageServ
      .addNewMessage(this.name, this.email, this.message)
      .subscribe((data) => {
        let result: any = data;
        if (result) {
          Swal.fire("Sweet", "Votre message à été envoye merci.", "success");
          this.name = "";
          this.email = "";
          this.message = "";
          console.log(result);
        }
      });
  }
}
