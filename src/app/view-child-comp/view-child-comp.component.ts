import { Component, OnInit, Directive, Input, ViewChild } from "@angular/core";

@Directive({ selector: "pane" })
export class Pane {
  @Input() id!: string;
}
@Component({
  selector: "app-view-child-comp",
  templateUrl: "./view-child-comp.component.html",
  styleUrls: ["./view-child-comp.component.css"],
})
export class ViewChildCompComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @ViewChild(Pane)
  set pane(v: Pane) {
    setTimeout(() => {
      this.selectedPane = v.id;
    }, 0);
  }
  selectedPane: string = "";
  shouldShow = true;
  toggle() {
    this.shouldShow = !this.shouldShow;
  }
}
