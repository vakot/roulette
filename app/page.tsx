'use client'

import { DonatorsCard } from '@components/Cards/DonatorsCard'
import { RoulettesCard } from '@components/Cards/RoulettesCard'
import { Space } from 'antd'

export default function HomePage() {
  return (
    <main>
      <Space direction="vertical" style={{ width: '100%' }}>
        <RoulettesCard editable />
        <DonatorsCard />
      </Space>
    </main>
  )
}
