import { CloseOutlined } from '@ant-design/icons'
import { AdminCard } from '@components/Admin/Cards'
import { BasePlayersList } from '@components/Lists/BasePlayersList'
import { useEditRouletteMutation, useGetRouletteQuery } from '@modules/api/roulette'
import { useBank } from '@modules/hooks/useBank'
import { IRoulette } from '@modules/models/Roulette'
import { Button, message, Spin } from 'antd'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export interface TargetCardProps {
  roulette?: IRoulette['_id']
}

export const TargetCard: React.FC<TargetCardProps> = ({ roulette: rouletteId }) => {
  return (
    <AdminCard title={<Title roulette={rouletteId} />}>
      <Body roulette={rouletteId} />
    </AdminCard>
  )
}

const Title: React.FC<TargetCardProps> = ({ roulette: rouletteId }) => {
  const { t } = useTranslation()

  return <span>{t('next-winner')}</span>
}

const Body: React.FC<TargetCardProps> = ({ roulette: rouletteId }) => {
  const { data: roulette, isFetching: isRouletteLoading } = useGetRouletteQuery(rouletteId, { skip: !rouletteId })
  const [editRoulette, { isLoading: isEditRouletteLoading }] = useEditRouletteMutation()
  const [bank, { isLoading: isBankLoading }] = useBank(rouletteId)

  const handleRemoveTarget = useCallback(() => {
    editRoulette({ _id: rouletteId, target: null }).then(() => message.success('Target removed. Next winner is random!'))
  }, [editRoulette])

  return (
    <Spin spinning={isRouletteLoading || isBankLoading || isEditRouletteLoading}>
      <BasePlayersList
        players={roulette?.target ? [{ ...roulette.target, price: Number((bank * 0.9).toFixed(2)), probability: 1 }] : []}
        controls={() => <Button icon={<CloseOutlined />} type="primary" danger onClick={handleRemoveTarget} />}
      />
    </Spin>
  )
}
