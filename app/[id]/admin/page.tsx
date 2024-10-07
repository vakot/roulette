'use client'

import Icon from '@ant-design/icons/lib/components/Icon'
import { AdminCard } from '@components/Admin/Cards'
import { LastDonatorsCard } from '@components/Cards/LastDonatorsCard'
import { EditPlayerForm } from '@components/Forms/EditPlayerForm'
import { PlayersList } from '@components/Lists/PlayersList'
import { useEditPlayerMutation, useEditPlayersMutation, useGetPlayersQuery } from '@modules/api/player'
import { useEditRouletteMutation, useGetRouletteQuery } from '@modules/api/roulette'
import { useProbabilities } from '@modules/hooks/useProbabilities'
import { IPlayer } from '@modules/models/Player'
import CoinIcon from '@public/coin-thumb-up-01.svg'
import { Button, Card, Flex, Form } from 'antd'
import Image from 'next/image'
import { useCallback, useMemo } from 'react'
import styles from './page.module.css'

export default function AdminPage({ params }: { readonly params: { id: string } }) {
  const rouletteId = params.id

  const [addPlayerForm] = Form.useForm()

  const { data: players } = useGetPlayersQuery({ roulette: rouletteId })
  const { data: lastDonators } = useGetPlayersQuery({ roulette: 'none' })
  const { data: roulette } = useGetRouletteQuery(rouletteId)

  const [editRoulette] = useEditRouletteMutation()
  const [editPlayer] = useEditPlayerMutation()
  const [editPlayers] = useEditPlayersMutation()

  const bank = useMemo<number>(() => {
    return (
      players?.reduce((acc, player) => {
        return acc + Number(player.price)
      }, 0) ?? 0
    )
  }, [players])

  const probabilities = useProbabilities(players)

  const handleTargetSelect = useCallback(
    (player?: IPlayer) => {
      editRoulette({ ...roulette, target: player ?? null })
    },
    [roulette, editRoulette]
  )

  return (
    <main className={styles.main}>
      <div className={styles.column}>
        <Card title="Last winner">
          <PlayersList players={roulette?.winner ? [{ ...roulette.winner, price: Number((bank * 0.9).toFixed(2)) }] : []} />
        </Card>
        <AdminCard title="Next winner">
          <PlayersList players={roulette?.target ? [roulette.target] : []} />
          <Button type="primary" danger block onClick={() => handleTargetSelect()}>
            Clear
          </Button>
        </AdminCard>
        <Card title="Total bank" style={{ fontSize: 32 }}>
          <span>
            {bank.toFixed(2)} <Icon component={() => <Image src={CoinIcon} alt="coin" width={32} height={32} />} />
          </span>
        </Card>
        <AdminCard title="Add player">
          <EditPlayerForm form={addPlayerForm} roulette={roulette?._id} />
          <Flex justify="flex-end">
            <Button type="primary" onClick={() => addPlayerForm.submit()}>
              Add
            </Button>
          </Flex>
        </AdminCard>
        <LastDonatorsCard editable />
      </div>
      <div className={styles.column}>
        <AdminCard title={`Players - ${players?.length ?? 0}`}>
          <PlayersList
            showFilters
            editable
            players={players?.map((player, index) => ({ ...player, probability: probabilities[index].value }))}
          />
        </AdminCard>
      </div>
    </main>
  )
}
