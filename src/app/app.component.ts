import { Component, OnInit, HostListener, Renderer2, ElementRef } from '@angular/core';

declare var AOS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Abdulrahman Alhuwais';
  private cursor: HTMLElement | null = null;
  private cursorDot: HTMLElement | null = null;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    // Initialize AOS animation library
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
      });
    }

    // Create custom cursor elements
    this.createCursorElements();
  }

  private createCursorElements(): void {
    // Only on desktop
    if (window.innerWidth > 768) {
      // Cursor glow
      this.cursor = this.renderer.createElement('div');
      this.renderer.addClass(this.cursor, 'cursor-glow');
      this.renderer.appendChild(document.body, this.cursor);

      // Cursor dot
      this.cursorDot = this.renderer.createElement('div');
      this.renderer.addClass(this.cursorDot, 'cursor-dot');
      this.renderer.appendChild(document.body, this.cursorDot);
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (this.cursor && this.cursorDot) {
      // Smooth follow for glow
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';

      // Instant follow for dot
      this.cursorDot.style.left = e.clientX + 'px';
      this.cursorDot.style.top = e.clientY + 'px';
    }
  }

  @HostListener('document:mousedown')
  onMouseDown(): void {
    if (this.cursor) {
      this.renderer.addClass(this.cursor, 'click');
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.cursor) {
      this.renderer.removeClass(this.cursor, 'click');
    }
  }
}
