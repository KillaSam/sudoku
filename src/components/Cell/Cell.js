import { useContext } from 'react'
import { ArrayContext } from '../../context/ArrayContext'
import styles from './Cell.module.css'

export const Cell = ({ isDefault, value, index}) => {
  const { onChangeCell } = useContext(ArrayContext)
  return (
    <div
      className={`${styles.cell} ${isDefault ? styles.default : ''}`}
      {...(!isDefault && { onClick: onChangeCell(index) })}
    >
      {value}
    </div>
  )
}