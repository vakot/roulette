'use client'

import { LastDonatorsCard } from '@components/Cards/LastDonatorsCard'
import { RoulettesCard } from '@components/Cards/RoulettesCard'
import { Space } from 'antd'

export default function HomePage() {
  return (
    <main>
      <Space direction="vertical" style={{ width: '100%' }}>
        <RoulettesCard editable />
        <LastDonatorsCard />
      </Space>
    </main>
  )
}
