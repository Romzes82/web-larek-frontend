import {EventEmitter} from "./base/events";
import { Component } from './base/Component';
import { createElement, ensureElement } from '../utils/utils';

interface ICounter {
    amount: number;
}

export class Counter extends Component<ICounter> {
    protected _counter: HTMLElement;
    protected _increment: HTMLButtonElement;
    protected _decrement: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);

        this._counter = createElement<HTMLElement>('div');
        this._increment = createElement<HTMLButtonElement>('button', {
            className: 'button',
            textContent: '+'
        });
        this._decrement = createElement<HTMLButtonElement>('button', {
            className: 'button',
            textContent: '-'
        });

        this.container.append(this._counter, this._increment, this._decrement);

        this._increment.addEventListener('click', this.onClick(1));
        this._decrement.addEventListener('click', this.onClick(-1));
    }

    protected onClick = (change: number) =>() => {
        console.log('change', change);
        this.amount += change;
    }

    set amount(value: number) {
       this.setText(this._counter, value);
    }

    get amount() {
        return Number(this._counter.textContent);
    }

}


// counter.render({amount: 5});
