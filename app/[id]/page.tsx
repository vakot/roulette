'use client'

import { BankCard } from '@components/Cards/BankCard'
import { DonatorsCard } from '@components/Cards/DonatorsCard'
import { PlayersCard } from '@components/Cards/PlayersCard'
import { WinnerCard } from '@components/Cards/WinnerCard'
import { PlayersRoulette } from '@components/Players/Roulette'
import Roulette from '@components/Roulette'
import { useGetPlayersQuery } from '@modules/api/player'
import { useEditRouletteMutation, useGetRouletteQuery } from '@modules/api/roulette'
import { IPlayer } from '@modules/models/Player'
import { getRandomIndexWithProbabilities } from '@utils/helpers'
import { Button, Card } from 'antd'
import { NextPage } from 'next'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './page.module.css'

const RoulettePage: NextPage<{ params: { id: string } }> = (context) => {
  const rouletteId = context.params.id

  const rouletteRef = Roulette.useRoulette()

  const { data: players } = useGetPlayersQuery({ roulette: rouletteId })
  const { data: roulette } = useGetRouletteQuery(rouletteId)

  const [editRoulette] = useEditRouletteMutation()

  const { t } = useTranslation()

  const handleFinish = useCallback(
    (player: IPlayer) => {
      editRoulette({ ...roulette, winner: player })
    },
    [roulette, editRoulette]
  )

  const handleSpin = useCallback(() => {
    if (!players) {
      return
    }

    const index = roulette?.target
      ? players.findIndex(({ _id }) => _id === roulette.target!._id)
      : getRandomIndexWithProbabilities(players.map(({ price }) => price ?? 0))

    if (index < 0) {
      return
    }

    rouletteRef.current?.spin(index)
  }, [rouletteRef, roulette, players])

  return (
    <main className={styles.main}>
      <div className={styles.column}>
        <WinnerCard roulette={roulette?._id} />
        <BankCard roulette={roulette?._id} />
        <Card className={styles.roulette}>
          <PlayersRoulette className={styles.roulette} roulette={rouletteRef} players={players} onFinish={handleFinish} />
        </Card>
        <Button size="large" type="primary" block onClick={handleSpin}>
          {t('spin')}
        </Button>
        <DonatorsCard roulette={roulette?._id} />
      </div>
      <div className={styles.column}>
        <PlayersCard roulette={roulette?._id} />
      </div>
    </main>
  )
}

export default RoulettePage
