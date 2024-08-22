import { IDocument, timestamp } from '@modules/models/Document'
import { IRoulette } from '@modules/models/Roulette'
import { getRandomColor } from '@utils/helpers'
import mongoose from 'mongoose'

export interface IPlayer {
  _id: string
  roulette?: IRoulette
  color: string
  name?: string
  price?: number
  avatar?: string
  message?: string
}
export type PlayerModelType = Omit<IPlayer, '_id'> & IDocument

export const PlayerSchema = new mongoose.Schema<PlayerModelType>({
  roulette: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Roulette' },
  color: { type: String, required: false, default: getRandomColor },
  name: { type: String, required: false, default: 'anonim' },
  price: { type: Number, required: true, default: 0 },
  avatar: {
    type: String,
    required: false,
    default: ({ _id }: { _id: string }) => `https://api.dicebear.com/7.x/miniavs/svg?seed=${_id}`
  },
  message: { type: String, required: false }
}).plugin(timestamp)

const Player = mongoose.models.Player<mongoose.Model<PlayerModelType>> || mongoose.model<PlayerModelType>('Player', PlayerSchema)

export default Player
