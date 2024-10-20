'use client'

import { BankCard } from '@components/Cards/BankCard'
import { DonatorsCard } from '@components/Cards/DonatorsCard'
import { PlayersCard } from '@components/Cards/PlayersCard'
import { TargetCard } from '@components/Cards/TargetCard'
import { WinnerCard } from '@components/Cards/WinnerCard'
import styles from './page.module.css'

export default function AdminPage({ params }: { readonly params: { id: string } }) {
  const rouletteId = params.id

  return (
    <main className={styles.main}>
      <div className={styles.column}>
        <WinnerCard roulette={rouletteId} />
        <TargetCard roulette={rouletteId} />
        <BankCard roulette={rouletteId} />
        <DonatorsCard roulette={rouletteId} />
      </div>
      <div className={styles.column}>
        <PlayersCard roulette={rouletteId} />
      </div>
    </main>
  )
}
