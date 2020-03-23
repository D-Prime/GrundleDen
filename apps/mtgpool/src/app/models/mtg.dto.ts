import { CardRarity, CardExpansion } from './mtg.enum';

export interface ICard {
  name: string;
  manaCost: string;
  type: string;
  subtype: string;
  expansion: CardExpansion;
  rarity: CardRarity;
  textbox: string;
  power: number;
  toughness: number;
  creator: string;
  copyright: string;
  foil: boolean;
}
