import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { DarkModeService } from "src/services/dark-mode.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  @ViewChild('container') container: ElementRef;
  constructor(
    private renderer: Renderer2,
    private darkModeService: DarkModeService) {}
  ngAfterViewInit() {
    this.darkModeService.initService(this.renderer, this.container);
  }
}
