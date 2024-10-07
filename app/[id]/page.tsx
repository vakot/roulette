'use client'

import Icon from '@ant-design/icons'
import { LastDonatorsCard } from '@components/Cards/LastDonatorsCard'
import { PlayersList } from '@components/Lists/PlayersList'
import { PlayersRoulette } from '@components/Players/Roulette'
import Roulette from '@components/Roulette'
import { useEditPlayerMutation, useEditPlayersMutation, useGetPlayersQuery } from '@modules/api/player'
import { useEditRouletteMutation, useGetRouletteQuery } from '@modules/api/roulette'
import { IPlayer } from '@modules/models/Player'
import CoinIcon from '@public/coin-thumb-up-01.svg'
import { getRandomIndexWithProbabilities } from '@utils/helpers'
import { Button, Card, Empty } from 'antd'
import { NextPage } from 'next'
import Image from 'next/image'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './page.module.css'

const RoulettePage: NextPage<{ params: { id: string } }> = (context) => {
  const rouletteId = context.params.id

  const rouletteRef = Roulette.useRoulette()

  const { data: players } = useGetPlayersQuery({ roulette: rouletteId })
  const { data: lastDonators } = useGetPlayersQuery({ roulette: 'none' })
  const { data: roulette } = useGetRouletteQuery(rouletteId)

  const [editRoulette] = useEditRouletteMutation()
  const [editPlayer] = useEditPlayerMutation()
  const [editPlayers] = useEditPlayersMutation()

  const { t } = useTranslation()

  const bank = useMemo<number>(() => {
    return (
      players?.reduce((acc, player) => {
        return acc + Number(player.price)
      }, 0) ?? 0
    )
  }, [players])

  const handleFinish = useCallback(
    (player: IPlayer) => {
      editRoulette({ ...roulette, winner: player })
    },
    [roulette, editRoulette]
  )

  const handleTargetSelect = useCallback(
    (player: IPlayer) => {
      editRoulette({ ...roulette, target: player })
    },
    [editRoulette, roulette]
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

  const handleRegister = useCallback(
    (donator: IPlayer) => {
      editPlayer({ ...donator, roulette: roulette?._id })
    },
    [editPlayer, roulette]
  )

  const handleRegisterAll = useCallback(() => {
    if (lastDonators?.length) {
      editPlayers(lastDonators.map((player) => ({ ...player, roulette: roulette?._id })))
    }
  }, [lastDonators, editPlayers, roulette])

  return (
    <main className={styles.main}>
      <div className={styles.column}>
        <Card title={t('last-winner')}>
          {!!roulette?.winner ? (
            <PlayersList
              players={[{ ...roulette.winner, price: Number((bank * 0.9).toFixed(2)), probability: undefined }]}
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Card>
        <Card title={t('total-bank')} style={{ fontSize: 32 }}>
          {bank.toFixed(2)} <Icon component={() => <Image src={CoinIcon} alt="coin" width={32} height={32} />} />
        </Card>
        <Card className={styles.roulette}>
          <PlayersRoulette
            className={styles.roulette}
            roulette={rouletteRef}
            players={players}
            onFinish={handleFinish}
          />
        </Card>
        <Button size="large" type="primary" block onClick={handleSpin}>
          {t('spin')}
        </Button>
        <LastDonatorsCard editable roulette={roulette?._id} />
      </div>
      <div className={styles.column}>
        <Card title={`${t('players')} - ${players?.length ?? 0}`}>
          <PlayersList players={players} onClick={handleTargetSelect} />
        </Card>
      </div>
    </main>
  )
}

export default RoulettePage
