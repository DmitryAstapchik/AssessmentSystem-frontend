import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class RegisterNotificationComponent implements OnInit {

  showEmailSend = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.params['showEmailSend']) {
      this.showEmailSend = false;
    }
  }
}
