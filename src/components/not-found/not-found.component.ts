import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'not-found',
  templateUrl: 'not-found.component.html',
  styleUrls: ['not-found.component.scss']
})

export class NotFoundComponent implements OnInit{
  @ViewChild('container') container: ElementRef;
  error: string;
  message: string;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    const error = this.activeRoute.snapshot.params['error'];
    console.log(error)
    switch(error) {
      case 'lnf':
        this.error = 'List Not Found';
        this.message = 'Please check your link or if you type correctly the list ID';
        break;
      case 'error':
        this.error = 'Upsss!';
        this.message = `There's something in our side, don't worry, we are working to fix it`;
        break;
      default:
        this.error = 'Page Not Found';
        this.message = `Page you are trying to access doesn't exist`;
    }
  }

  returnHome() {
    this.router.navigateByUrl('/home');
  }
}