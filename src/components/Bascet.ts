import { IBasket } from "../types";
import { createElement, ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { EventEmitter } from "./base/Events";

export class Basket extends Component<IBasket> {
    protected _list: HTMLElement;
    button: HTMLButtonElement;
    protected _total: HTMLElement;
  
    constructor(container: HTMLElement, protected events: EventEmitter) {
      super(container);
        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this.button = this.container.querySelector('.basket__button');
      this._total = this.container.querySelector('.basket__price');
      if(this.button) this.button.addEventListener('click', () => events.emit('order:open'));
      
      this.items = [];
    }
  
    //Заполнить данными в корзину
    set items(items: HTMLElement[]) {
      if (items.length) {
          this._list.replaceChildren(...items);
          this.button.disabled = false;
      } else {
          this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {textContent: 'Корзина пуста',}));
      }
    }
  
    //Установить сумму всех товаров в корзине
    set total(total: number) {
      this.setText(this._total, `${total.toString()} синапсов`);
    }
  }