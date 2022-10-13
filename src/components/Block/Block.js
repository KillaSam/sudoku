import { useContext } from 'react'
import { ArrayContext } from '../../context/ArrayContext'
import getBlock from '../../helpers/getBlock'
import { Cell } from '../Cell/Cell'
import styles from './Block.module.css'

export function Block({ index }) {
  const { allArr } = useContext(ArrayContext)
  const block = getBlock(index, allArr)
  return (
    <div>
      {block.map((row) => 
        <div className={styles.block}>
          {row.map((cellData) => <Cell key={cellData.index} {...cellData} />)}
        </div>
      )}
    </div>
  )
}