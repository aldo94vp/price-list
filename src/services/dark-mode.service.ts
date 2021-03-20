import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DarkModeService {
  private renderer: Renderer2;
  private container: ElementRef<HTMLElement>;
  private lBtn: ElementRef;
  private dBtn: ElementRef;
  private darkModeActivated: boolean = false;
  constructor() {  }

  initService(renderer: Renderer2, container: ElementRef) {
    this.container = container;
    this.renderer = renderer;
    this.lBtn = this.createTriggers('light', '🌝');
    this.dBtn = this.createTriggers('dark', '🌚');
    
    if ((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorage.getItem('dark-mode') === 'true') {
      this.setMode(true, this.dBtn);
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const isDark = e.matches;
      this.setMode(isDark, isDark ? this.dBtn: this.lBtn);
    });
  }

  reloadTheme() {
    this.setMode(this.darkModeActivated, this.darkModeActivated ? this.dBtn: this.lBtn);
  }

  private createTriggers(className: string, icon: string): ElementRef {
    const el = this.renderer.createElement('button');
    this.renderer.addClass(el, 'nes-btn');
    this.renderer.addClass(el, `${className}-mode`);
    this.renderer.setProperty(el, 'textContent', icon);
    this.renderer.listen(el, 'click', () => {
      className === 'dark' ?
        this.setMode(true, el) :
        this.setMode(false, el);
    });
    this.renderer.appendChild(this.container.nativeElement, el);
    return el;
  }

  private setMode(isDark: boolean, el: ElementRef) {
    this.darkModeActivated = isDark ? true : false;
    localStorage.setItem('dark-mode', `${this.darkModeActivated}`);
    this.renderer.setStyle(el, 'display', 'none');
    const childrenContainer = Array.from(document.getElementsByClassName('nes-container'));
    const childrenInput = Array.from(document.getElementsByClassName('nes-input'));
    const childrenBallon = Array.from(document.getElementsByClassName('nes-balloon'));
    this.renderer.setStyle(document.body, 'background-color', isDark ? '#212529': '#fff');
    if (isDark) {
      this.renderer.addClass(this.container.nativeElement, 'is-dark')
    } else {
      this.renderer.removeClass(this.container.nativeElement, 'is-dark');
    }
    this.applyModeChildren(childrenContainer, isDark);
    this.applyModeChildren(childrenInput, isDark);
    this.applyModeChildren(childrenBallon, isDark);
    
    this.renderer.setStyle(isDark ? this.lBtn: this.dBtn, 'display', 'inline-block');
  }

  private applyModeChildren(children: Element[], isDark: boolean) {
    for (const child of children) {
      isDark ?
        this.renderer.addClass(child, 'is-dark') :
        this.renderer.removeClass(child, 'is-dark');
    }
  }
}