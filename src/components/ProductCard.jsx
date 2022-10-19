import styles from './ProductCard.module.css'
import classNames from 'classnames'

import BouquetHeightIcon from '../assets/bouquetHeightIcon.svg'
import BouquetWidthIcon from '../assets/bouquetWidthIcon.svg'
import EmptyFavoriteIcon from '../assets/emptyFavoriteIcon.svg'
import FillHeartIcon from '../assets/fillHeartIcon.svg'
import FlowersCountIcon from '../assets/flowersCountIcon.svg'
import MockBouquetImage from '../assets/bouquet.jpg'

export const ProductCard = ({
  imageUrl,
  title,
  currentPrice,
  oldPrice,
  flowersCount,
  bouquetHeight,
  bouquetWidth,
  isFavorite,
  isHit,
  isSale,
}) => {
  const isSoldOut = !flowersCount
  return (
    <div data-testid="product-card" className={styles['product-card']}>
      <img
        data-testid="favorite-icon"
        className={styles['favorite-icon']}
        src={isFavorite ? FillHeartIcon : EmptyFavoriteIcon}
        alt={(isFavorite ? '' : 'не ') + 'в избранном'}
      />
      <div className={classNames(styles['badges-container'])}>
        {isHit && (
          <div
            className={classNames(styles['badge'], styles['hit-badge'])}
            data-testid="hit-badge"
          >
            хит
          </div>
        )}
        {isSale && (
          <div
            className={classNames(styles['badge'], styles['sale-badge'])}
            data-testid="sale-badge"
          >
            скидка
          </div>
        )}
      </div>
      <img
        src={imageUrl ?? MockBouquetImage}
        alt="букет"
        className={styles['card-image']}
        data-testid="card-image"
      />
      <div className={styles['data-container']}>
        <span className={styles['title']} data-testid="title">
          {title ?? 'без названия'}
        </span>
        {currentPrice ? (
          <div className={styles['prices-row']}>
            <span
              className={classNames(styles['current-price'], {
                [styles['current-price-discount']]: isSale,
              })}
              data-testid="current-price"
            >
              {currentPrice}
            </span>
            {isSale && oldPrice && (
              <span className={styles['old-price']} data-testid="old-price">
                {oldPrice}
              </span>
            )}
          </div>
        ) : (
          <div className={styles['price-error']} data-testid="price-error">
            Нет данных о цене
          </div>
        )}
        <div className={styles['data-row']}>
          <span
            className={classNames(styles['data-item'], styles['flowers-count'])}
            data-testid="flowers-count"
          >
            {flowersCount ? (
              <>
                <img src={FlowersCountIcon} alt="количество цветов" />
                {flowersCount} шт.
              </>
            ) : (
              'распродано'
            )}
          </span>
          {bouquetHeight && (
            <span
              className={classNames(
                styles['data-item'],
                styles['bouquet-height']
              )}
              data-testid="bouquet-height"
            >
              <img src={BouquetHeightIcon} alt="высота букета" />
              {bouquetHeight} см
            </span>
          )}
          {bouquetWidth && (
            <span
              className={classNames(
                styles['data-item'],
                styles['bouquet-width']
              )}
              data-testid="bouquet-width"
            >
              <img src={BouquetWidthIcon} alt="ширина букета" />
              {bouquetWidth} см
            </span>
          )}
        </div>
      </div>
      <div className={styles['button-row']}>
        <button
          type="button"
          className={classNames(styles['button'], styles['button-green'])}
          disabled={isSoldOut}
          data-testid="add-to-cart"
        >
          В корзину
        </button>
        <button
          type="button"
          className={classNames(styles['button'], styles['button-gray'])}
          disabled={isSoldOut}
          data-testid="buy-instantly"
        >
          Купить сразу
        </button>
      </div>
    </div>
  )
}
