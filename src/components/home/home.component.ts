import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  @ViewChild('ballon') ballon: ElementRef<HTMLParagraphElement>;
  constructor(private renderer: Renderer2) {}

  showDescription() {
    const description = `This app allows you to register products and its price calculating a total and can be modified in real time for multiple users simultaneously`;
    this.renderer.setProperty(this.ballon.nativeElement, 'textContent', description);
    setTimeout(() => {
      this.renderer.setProperty(this.ballon.nativeElement, 'textContent', 'click me!');
    }, 5000);
  }
}
