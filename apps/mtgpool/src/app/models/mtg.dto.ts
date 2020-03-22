import { CardRarity, Expansion } from './mtg.enum';

export interface ICard {
  name: string;
  manaCost: string;
  type: string;
  subtype: string;
  expansion: Expansion;
  rarity: CardRarity;
  textbox: string;
  power: number;
  toughness: number;
  creator: string;
  copyright: string;
  foil: boolean;
}
