import type { IPlayer } from '@modules/models/Player'

export interface IDonator extends Omit<IPlayer, 'roulette'> {}
