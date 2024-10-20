/**
 * This is what we can receive from donatello.io
 *
 * @external https://donatello.to/panel/doc-api?tab=callbacks
 */
export interface ITip {
  pubId: string
  clientName?: string
  message?: string
  amount?: number
  currency?: string
  source?: string
  goal?: string
  interactionMedia?: string
  interactionMediaStartTime?: number
  show?: boolean
  isPaidFee?: boolean
  createdAt?: number
}
