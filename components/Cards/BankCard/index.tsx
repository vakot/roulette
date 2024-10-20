import Icon from '@ant-design/icons'
import { useBank } from '@modules/hooks/useBank'
import { IRoulette } from '@modules/models/Roulette'
import CoinIcon from '@public/coin-thumb-up-01.svg'
import { Card, Spin } from 'antd'
import { t } from 'i18next'
import Image from 'next/image'

export interface BankCardProps {
  roulette?: IRoulette['_id']
}

export const BankCard: React.FC<BankCardProps> = ({ roulette: rouletteId }) => {
  const [bank, { isLoading }] = useBank(rouletteId)

  return (
    <Card title={t('total-bank')} style={{ fontSize: 32 }}>
      <Spin spinning={isLoading}>
        {bank.toFixed(2)} <Icon component={() => <Image src={CoinIcon} alt="coin" width={32} height={32} />} />
      </Spin>
    </Card>
  )
}
