import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { CardsFacade } from '@MTGPool/cardsStore';
import { Subject } from 'rxjs';
import { ICard, CardRarity, CardExpansion } from '@MTGPool/models';

@Component({
  selector: 'mtg-card-details-form',
  templateUrl: './card-details-form.component.html',
  styleUrls: ['./card-details-form.component.scss']
})
export class CardDetailsFormComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  private _storeCard: ICard;
  public cardFormGroup: FormGroup;
  public cardRarity = CardRarity;
  public cardExpansiohn = CardExpansion;

  constructor(private _fb: FormBuilder, private cardsFacade: CardsFacade) {}

  ngOnInit(): void {
    // Gets card form data from store.
    this.cardsFacade.getCardGen$
      .pipe(takeUntil(this._destroy$))
      .subscribe(card => (this._storeCard = card));

    this._initCard();

    // Updates store on form value change.
    this.cardFormGroup.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((changes: ICard) => {
        this.cardsFacade.updateCardGen(changes);
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * Generates cardFormGroup and assigns values from store.
   *
   * @private
   * @memberof CardDetailsFormComponent
   */
  private _initCard(): void {
    this.cardFormGroup = this._fb.group({
      name: [this._storeCard?.name],
      manaCost: [this._storeCard?.manaCost],
      type: [this._storeCard?.type],
      subtype: [this._storeCard?.subtype],
      expansion: [this._storeCard?.expansion],
      rarity: [this._storeCard?.rarity],
      textbox: [this._storeCard?.textbox],
      power: [this._storeCard?.power],
      toughness: [this._storeCard?.toughness],
      creator: [this._storeCard?.creator],
      copyright: [this._storeCard?.copyright]
    });
  }

  /**
   * Generates string[] from enum.
   *
   * @param {{ [key: string]: string }} enumObj
   * @returns {string[]}
   * @memberof CardDetailsFormComponent
   */
  public enumArray(enumObj: { [key: string]: string }): string[] {
    return Object.values(enumObj);
  }
}
