import { Component, OnInit } from "@angular/core";
import { MessagesService } from "src/app/messages.service";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"],
})
export class MessageComponent implements OnInit {
  messages = [];
  displayText = "";

  constructor(private messageService: MessagesService) {}

  ngOnInit(): void {
    this.getAllMessages();
  }

  getAllMessages() {
    this.messageService.getAllMessages().subscribe((data) => {
      let result: any = data;
      this.messages = result;
      console.log(result);
    });
  }
  check(msg) {
    this.displayText = msg;
  }
  clear() {
    this.displayText = "";
  }
}
