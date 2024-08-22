import { IDocument, timestamp } from '@modules/models/Document'
import { IPlayer } from '@modules/models/Player'
import mongoose from 'mongoose'

export interface IRoulette {
  _id?: string
  winner?: IPlayer | null // TODO: move to api types
  target?: IPlayer | null // TODO: move to api types
}
export type RouletteModelType = Omit<IRoulette, '_id'> & IDocument

export const RouletteSchema = new mongoose.Schema<RouletteModelType>({
  winner: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Player' },
  target: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Player' }
}).plugin(timestamp)

const Roulette =
  mongoose.models.Roulette<mongoose.Model<RouletteModelType>> || mongoose.model<RouletteModelType>('Roulette', RouletteSchema)

export default Roulette
