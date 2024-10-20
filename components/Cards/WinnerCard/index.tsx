import { BasePlayersList } from '@components/Lists/BasePlayersList'
import { useGetRouletteQuery } from '@modules/api/roulette'
import { useBank } from '@modules/hooks/useBank'
import { IRoulette } from '@modules/models/Roulette'
import { Card, Spin } from 'antd'
import { useTranslation } from 'react-i18next'

export interface WinnerCardProps {
  roulette?: IRoulette['_id']
}

export const WinnerCard: React.FC<WinnerCardProps> = ({ roulette: rouletteId }) => {
  return (
    <Card title={<Title roulette={rouletteId} />}>
      <Body roulette={rouletteId} />
    </Card>
  )
}

const Title: React.FC<WinnerCardProps> = ({ roulette: rouletteId }) => {
  const { t } = useTranslation()

  return <span>{t('last-winner')}</span>
}

const Body: React.FC<WinnerCardProps> = ({ roulette: rouletteId }) => {
  const { data: roulette, isFetching: isRouletteLoading } = useGetRouletteQuery(rouletteId, { skip: !rouletteId })
  const [bank, { isLoading: isBankLoading }] = useBank(rouletteId)

  return (
    <Spin spinning={isRouletteLoading || isBankLoading}>
      <BasePlayersList players={roulette?.winner ? [{ ...roulette.winner, price: Number((bank * 0.9).toFixed(2)) }] : []} />
    </Spin>
  )
}
