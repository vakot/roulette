import { FilterOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons'
import { PlayerWithProbability } from '@components/Lists/PlayersList'
import { Button, Flex, Form, Input, Select, Slider, Space } from 'antd'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export type Filter = {
  name?: string
  price?: [number, number]
  sort?: 'price' | 'name'
  order?: 'asc' | 'desc'
}

export interface PlayerFiltersProps {
  players?: PlayerWithProbability[]
  setPlayers?: React.Dispatch<React.SetStateAction<PlayerWithProbability[]>>
}

export const PlayerFilters: React.FC<PlayerFiltersProps> = ({ players = [], setPlayers }) => {
  const [form] = Form.useForm()

  const name = Form.useWatch<Filter['name']>('name', form)
  const price = Form.useWatch<Filter['price']>('price', form)
  const sort = Form.useWatch<Filter['sort']>('sort', form)
  const order = Form.useWatch<Filter['order']>('order', form)

  const { t } = useTranslation()

  const { min, max } = useMemo(() => {
    return {
      min: Math.max(Math.min(...players.map(({ price }) => price ?? 0)), 0),
      max: Math.min(Math.max(...players.map(({ price }) => price ?? 0)), 999_999),
    }
  }, [players])

  useEffect(() => {
    let result = [...players]
      .filter((player) => player.name?.toLowerCase().includes(name ?? ''))
      .filter(
        (player) =>
          !price ||
          price.length < 2 ||
          ((player.price ?? 0) >= (isFinite(price[0]) ? price[0] : min) &&
            (player.price ?? 0) <= (isFinite(price[1]) ? price[1] : max))
      )

    if (sort) {
      result.sort((a, b) => {
        const keyA = sort === 'name' ? a[sort]?.toLowerCase() : a[sort]
        const keyB = sort === 'name' ? b[sort]?.toLowerCase() : b[sort]

        if (!keyA || !keyB) {
          return 0
        }

        return keyA < keyB ? -1 : keyA > keyB ? 1 : 0
      })
    }

    setPlayers?.(order === 'desc' ? result.reverse() : result)
  }, [players, setPlayers, name, price, sort, order, min, max])

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        price: [min, max],
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Form.Item name="name" noStyle>
          <Input placeholder={t("Search")} />
        </Form.Item>

        <Form.Item name="price" noStyle>
          <Slider step={10} range min={min} max={max} tooltip={{ formatter: (value) => value?.toFixed(0) }} />
        </Form.Item>
        <Flex gap={8}>
          <Form.Item name="sort" style={{ flex: 1, margin: 0 }}>
            <Select
              placeholder={t("Sort by")}
              options={[
                { label: `${t('Name')}`, value: 'name' },
                { label: `${t('Price')}`, value: 'price' },
                { label: `${t('Probability')}`, value: 'probability' },
              ]}
              suffixIcon={<FilterOutlined />}
              allowClear
            />
          </Form.Item>
          <Form.Item name="order" noStyle>
            <Button
              type="primary"
              icon={order === 'desc' ? <SortDescendingOutlined /> : <SortAscendingOutlined />}
              onClick={() => form.setFieldValue('order', order === 'desc' ? 'asc' : 'desc')}
            />
          </Form.Item>
          <Button type="primary" danger icon={<FilterOutlined />} onClick={() => form.resetFields()}>
            {t('Reset')}
          </Button>
        </Flex>
      </Space>
    </Form>
  )
}
