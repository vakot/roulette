import { DontatorsList } from '@components/Lists/DonatorsList'
import { useEditPlayersMutation, useGetPlayersQuery } from '@modules/api/player'
import { useGetRouletteQuery } from '@modules/api/roulette'
import { IRoulette } from '@modules/models/Roulette'
import { Button, Card, Flex, message, Modal } from 'antd'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export interface DonatorsCardProps {
  roulette?: IRoulette['_id']
}

export const DonatorsCard: React.FC<DonatorsCardProps> = ({
  roulette: rouletteId,
}) => {
  return (
    <Card title={<Title roulette={rouletteId} />}>
      <Body roulette={rouletteId} />
    </Card>
  )
}

const Title: React.FC<DonatorsCardProps> = ({ roulette: rouletteId }) => {
  const { data: donators } = useGetPlayersQuery({ roulette: 'none' })
  const { data: roulette } = useGetRouletteQuery(rouletteId, {
    skip: !rouletteId,
  })

  const [editPlayers] = useEditPlayersMutation()

  const { t } = useTranslation()

  const handleRegisterAll = useCallback(() => {
    if (!donators?.length) {
      message.error(t('no-donators'))
      return
    }

    if (!roulette) {
      message.error(t('no-roulette'))
      return
    }

    Modal.confirm({
      title: t('register-all'),
      content: t('register-all-confirm'),
      type: 'warning',
      onOk: () => {
        if (donators.length && roulette) {
          editPlayers(
            donators.map((donator) => ({ ...donator, roulette: roulette._id }))
          )
        }
      },
    })
  }, [donators, editPlayers, roulette, t])

  return (
    <Flex justify="space-between" align="center">
      <span>
        {t('donators')} - {donators?.length ?? 0}
      </span>
      <span>
        <Button type="primary" onClick={handleRegisterAll}>
          {t('register-all')}
        </Button>
      </span>
    </Flex>
  )
}

const Body: React.FC<DonatorsCardProps> = ({ roulette: rouletteId }) => {
  return <DontatorsList roulette={rouletteId} />
}
