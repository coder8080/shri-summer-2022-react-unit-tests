import { React } from 'react'
import { render, screen } from '@testing-library/react'
import { ProductCard } from './ProductCard.jsx'
import MockBouquetImage from '../assets/bouquet.jpg'
import FillHeartIcon from '../assets/fillHeartIcon.svg'
import EmptyFavoriteIcon from '../assets/emptyFavoriteIcon.svg'

const mockBouquet = {
  bouquetHeight: 93,
  bouquetWidth: 45,
  currentPrice: 1200,
  flowersCount: 15,
  id: '12891c9c-4f86-42d3-b5f1-c0e05194aa27',
  imageUrl: MockBouquetImage,
  isFavorite: true,
  isHit: true,
  isSale: true,
  oldPrice: 1600,
  title: '15 альстромерий',
}

const getFilenameByUrl = (url) => url.split('/').at(-1)

describe('Компонент «Карточка товара»', () => {
  it('компонент рендерится', () => {
    const application = <ProductCard {...mockBouquet} />
    render(application)
    const cardElement = screen.getByTestId('product-card')
    expect(cardElement).toBeTruthy()
  })
  it('картинка отображается', () => {
    const application = <ProductCard {...mockBouquet} />
    render(application)
    const cardImage = screen.getByTestId('card-image')
    const imageUrl = cardImage.src
    const imageFilename = getFilenameByUrl(imageUrl)
    expect(imageFilename).toBe(mockBouquet.imageUrl)
  })
  it('название отображается', () => {
    const application = <ProductCard {...mockBouquet} />
    render(application)
    const title = screen.getByTestId('title')
    expect(title).toHaveTextContent(mockBouquet.title)
  })
  it('название отображает "без названия" если нет данных', () => {
    const application = <ProductCard {...{ ...mockBouquet, title: null }} />
    render(application)
    const title = screen.getByTestId('title')
    expect(title).toHaveTextContent('без названия')
  })
  it('плашка хит отображается', () => {
    const application = <ProductCard {...mockBouquet} />
    render(application)
    const hitBadge = screen.getByTestId('hit-badge')
    expect(hitBadge).toHaveTextContent('хит')
  })
  it('плашка хит отображается корректно', () => {
    const application = <ProductCard {...{ ...mockBouquet, isHit: false }} />
    render(application)
    let error = null
    try {
      screen.getByTestId('hit-badge')
    } catch (e) {
      error = e
    }
    expect(error).toBeTruthy()
  })
  it('плашка скидка отображается', () => {
    const application = <ProductCard {...mockBouquet} />
    render(application)
    const saleBadge = screen.getByTestId('sale-badge')
    expect(saleBadge).toHaveTextContent('скидка')
  })
  it('плашка скидка отображается корректно', () => {
    const application = <ProductCard {...{ ...mockBouquet, isSale: false }} />
    render(application)
    let error = null
    try {
      screen.getByTestId('sale-badge')
    } catch (e) {
      error = e
    }
    expect(error).toBeTruthy()
  })
  it('значок избранного отображается', () => {
    const application = <ProductCard {...mockBouquet} />
    render(application)
    const favoriteIcon = screen.getByTestId('favorite-icon')
    const imageUrl = favoriteIcon.src
    const imageFilename = getFilenameByUrl(imageUrl)
    expect(imageFilename).toBe(FillHeartIcon)
  })
  it('значок избранного отображает нужную иконку', () => {
    const application = (
      <ProductCard {...{ ...mockBouquet, isFavorite: false }} />
    )
    render(application)
    const favoriteIcon = screen.getByTestId('favorite-icon')
    const imageUrl = favoriteIcon.src
    const imageFilename = getFilenameByUrl(imageUrl)
    expect(imageFilename).toBe(EmptyFavoriteIcon)
  })
  it('высота букета отображается', () => {
    const application = <ProductCard {...mockBouquet} />
    render(application)
    const bouquetHeight = screen.getByTestId('bouquet-height')
    expect(bouquetHeight).toHaveTextContent(String(mockBouquet.bouquetHeight))
  })
  it('высота букета не отображается при отсутствии данных', () => {
    const application = (
      <ProductCard {...{ ...mockBouquet, bouquetHeight: null }} />
    )
    render(application)
    let error = null
    try {
      screen.getByTestId('bouquet-height')
    } catch (e) {
      error = e
    }
    expect(error).toBeTruthy()
  })
  it('ширина букета отображается', () => {
    const application = <ProductCard {...mockBouquet} />
    render(application)
    const bouquetWidth = screen.getByTestId('bouquet-width')
    expect(bouquetWidth).toHaveTextContent(String(mockBouquet.bouquetWidth))
  })
  it('ширина букета не отображается при отсутствии данных', () => {
    const application = (
      <ProductCard {...{ ...mockBouquet, bouquetWidth: null }} />
    )
    render(application)
    let error = null
    try {
      screen.getByTestId('bouquet-width')
    } catch (e) {
      error = e
    }
    expect(error).toBeTruthy()
  })
  it('количество цветов отображается', () => {
    const application = <ProductCard {...mockBouquet} />
    render(application)
    const flowersCount = screen.getByTestId('flowers-count')
    expect(flowersCount).toHaveTextContent(String(mockBouquet.flowersCount))
  })
  it('отображается "распродано" если товара нет', () => {
    const application = (
      <ProductCard {...{ ...mockBouquet, flowersCount: null }} />
    )
    render(application)
    const flowersCount = screen.getByTestId('flowers-count')
    expect(flowersCount).toHaveTextContent('распродано')
  })
  it('цена отображается', () => {
    const application = <ProductCard {...mockBouquet} />
    render(application)
    const currentPrice = screen.getByTestId('current-price')
    expect(currentPrice).toHaveTextContent(String(mockBouquet.currentPrice))
  })
  it('цена не отображается при отсутсвии данных', () => {
    const application = (
      <ProductCard {...{ ...mockBouquet, currentPrice: null }} />
    )
    render(application)
    const currentPrice = screen.getByTestId('price-error')
    let error = null
    try {
      screen.getByTestId('current-price')
    } catch (e) {
      error = e
    }
    expect(currentPrice).toHaveTextContent('Нет данных о цене')
    expect(error).toBeTruthy()
  })
  it('старая цена отображется', () => {
    const application = <ProductCard {...mockBouquet} />
    render(application)
    const oldPrice = screen.getByTestId('old-price')
    expect(oldPrice).toHaveTextContent(String(mockBouquet.oldPrice))
  })
  it('старая цена не отображается при отсутсвии данных', () => {
    const application = <ProductCard {...{ ...mockBouquet, oldPrice: null }} />
    render(application)
    let error = null
    try {
      screen.getByTestId('old-price')
    } catch (e) {
      error = e
    }
    expect(error).toBeTruthy()
  })
  it('старая цена не отображается когда нет скидки', () => {
    const application = <ProductCard {...{ ...mockBouquet, isSale: false }} />
    render(application)
    let error = null
    try {
      screen.getByTestId('old-price')
    } catch (e) {
      error = e
    }
    expect(error).toBeTruthy()
  })
})
