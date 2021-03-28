import { Component, ElementRef, Renderer2, ViewChild, AfterViewChecked, AfterViewInit } from "@angular/core";
import { DarkModeService } from "src/services/dark-mode.service";

@Component({
  selector: "price-list",
  templateUrl: "./price-list.component.html",
  styleUrls: ["./price-list.component.scss"]
})
export class PriceListComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef;
  rendered: boolean = false;
  constructor(
    private renderer: Renderer2,
    private darkModeService: DarkModeService) {}

  ngAfterViewInit() {
    this.darkModeService.initService(this.renderer, this.container);
  }
  
  ngAfterViewChecked() {
    this.darkModeService.reloadTheme();
  }
}
