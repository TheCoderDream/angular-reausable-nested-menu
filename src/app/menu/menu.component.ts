import { Component, HostBinding, OnInit } from "@angular/core";
import { MenuItemComponent } from "../menu-item/menu-item.component";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent {
  @HostBinding("style.display") public display = "inline-block";
  @HostBinding("style.position") public position = "absolute";

  private activeMenuItem: MenuItemComponent;

  constructor() {}

  registerAsActiveMenu(menuItem: MenuItemComponent): void {
    this.activeMenuItem = menuItem;
  }

  closeActiveMenuIfExists(): void {
    if (this.activeMenuItem) {
      this.activeMenuItem.closeMenu();
    }
  }
}
