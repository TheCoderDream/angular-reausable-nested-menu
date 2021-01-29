import {
  Component,
  HostListener,
  Input,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: "app-menu-item",
  templateUrl: "./menu-item.component.html",
  styleUrls: ["./menu-item.component.css"]
})
export class MenuItemComponent {
  @Input() menuFor: TemplateRef<MenuComponent>;
  @ViewChild("viewContainerRef", { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;
  constructor(@Optional() private menuComponent: MenuComponent) {}

  @HostListener("mouseenter")
  onMouseEnter(): void {
    this.openMenu();
  }

  @HostListener("mouseleave")
  onMouseLeave(): void {
    this.closeMenu();
  }

  get containerCssClass(): string {
    return this.isRoot()
      ? "button__container--root"
      : "button__container--leaf";
  }

  onToggle() {
    if (!this.menuFor) return;
    if (this.containerIsEmpty()) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  openMenu(): void {
    this.closeAlreadyActiveMenu();
    this.registerAsActiveMenu();
    this.addTemplateToContainer(this.menuFor);
  }

  closeMenu(): void {
    this.clearContainer();
  }

  private clearContainer(): void {
    this.viewContainerRef.clear();
  }

  private addTemplateToContainer(template: TemplateRef<any>): void {
    this.viewContainerRef.createEmbeddedView(template);
  }

  private isRoot(): boolean {
    return !this.menuComponent;
  }

  private containerIsEmpty(): boolean {
    return this.viewContainerRef.length === 0;
  }

  private closeAlreadyActiveMenu(): void {
    if (this.menuComponent) {
      this.menuComponent.closeActiveMenuIfExists();
    }
  }

  private registerAsActiveMenu(): void {
    if (this.menuComponent) {
      this.menuComponent.registerAsActiveMenu(this);
    }
  }
}
