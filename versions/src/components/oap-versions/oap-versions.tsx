import {Component, Element, Prop, h, State, Listen, Event} from '@stencil/core';
import {EventEmitter} from "../../../dist/types/stencil-public-runtime";

interface Item {
  url: string;
  version: string;
  active: boolean;
}

@Component({
  tag: 'oap-versions',
  styleUrl: 'oap-versions.css',
  shadow: true,
})
export class Version {

  @Event({
    eventName: 'oapClose',
    composed: true,
    cancelable: true,
    bubbles: true
  })

  closeOther: EventEmitter<void>;
  closeSend: boolean = false;

  @Prop() version: string;
  @Prop() visible: string = 'master';

  @State() open: boolean = false;

  @Element() me: HTMLElement;

  left1: Item = null;
  left2: Item = null;
  versions: Item[] = [];

  componentWillLoad() {
    for (let i = 0; i < this.me.children.length; i++) {
      const item = {
        url: this.me.children[i].attributes.getNamedItem('data-url').value,
        version: this.me.children[i].attributes.getNamedItem('data-version').value
      } as Item;
      item.active = item.version === this.version

      if (item.version === this.visible) {
        this.left1 = item;
      }
      else {
        this.versions.push(item)
      }
    }

    this.versions.sort((l, r) => r.version.localeCompare(l.version));

    const active = this.versions.find(i => i.active)
    if(active) {
      this.left2 = active;
      this.versions = this.versions.filter(i => !i.active)
    } else {
      this.left2 = this.versions.shift()
    }
  }

  toggleDropdown() {
    this.open = !this.open;
    if (this.open) {
      this.closeSend = true;
      this.closeOther.emit();
    }
  }

  closeDropdown() {
    this.open = false;
  }

  handleClick = () => {
   this.toggleDropdown();
 }

 handleOutside = () => {
    this.closeDropdown();
 }

  @Listen('keydown', { target: 'window' })
  handleEscape(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      this.closeDropdown();
    }
  }

  @Listen('oapClose', { target: 'window' })
  handleClose(/*event: CustomEvent<string>*/) {
    if(this.closeSend) {
      this.closeSend = false;
    } else {
      this.closeDropdown();
    }
  }

  render() {
    return (
      <div class="relative flex">
        {this.render1()}
        {this.render2()}
        {this.renderMore()}
    </div>
    );
  }

  empty(): string {
    return '';
  }

  render1(): string {
    if (!this.left1) {
      return '';
    }

    const classes = `btn hover px-1 ${this.left1.active ? 'active' : ''} mr-1 last:mr-0`
    return <a href={this.left1.url} class={classes}>{this.left1.version}</a>;
  }

  render2(): string {
    if (!this.left2) {
      return '';
    }

    const classes = `btn hover px-1 ${this.left2.active ? 'active' : ''} mr-1 last:mr-0`
    return <a href={this.left2.url} class={classes}>{this.left2.version}</a>;
  }

  renderMore(): string {
    if (this.versions.length == 0) {
      return '';
    }

    const classes = `relative z-20 block px-1 btn hover`
    return (
      <div>
        <button class={classes} onClick={this.handleClick}>other</button>
        {this.renderOutside()}
        {this.renderDropdown()}
      </div>
    )
  }

  renderOutside(): string {
    if (!this.open) {
      return '';
    }

    return <button onClick={this.handleOutside} tabindex="-1" class="fixed z-10 w-full h-full inset-0 bg-transparent cursor-default"/>;
  }

  renderDropdown(): string {
    if (!this.open) {
      return '';
    }

    return <div class="absolute z-30 mt-1 w-32 py-1 bg-white border border-gray-400 rounded shadow">
      {this.versions
        .map(i =>
          <a href={i.url} class="block px-4 py-1 text-xs text-gray-800 hover:bg-green-500 hover:text-white">{i.version}</a>
        )
      }
    </div>;
  }

}
