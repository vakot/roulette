import { IDocument, timestamp } from '@modules/models/Document'
import { IRoulette } from '@modules/models/Roulette'
import mongoose from 'mongoose'

export interface IPlayer {
  _id: string
  name?: string
  // image?: string
  price?: number
  roulette?: IRoulette
}
export type PlayerModelType = Omit<IPlayer, '_id'> & IDocument

export const PlayerSchema = new mongoose.Schema<PlayerModelType>({
  name: { type: String, required: false },
  // image: { type: String, required: false },
  price: { type: Number, required: true },
  roulette: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Roulette' }
}).plugin(timestamp)

const Player = mongoose.models.Player<mongoose.Model<PlayerModelType>> || mongoose.model<PlayerModelType>('Player', PlayerSchema)

export default Player
