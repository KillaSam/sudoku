import getBlock from './getBlock'

export const isValidValueByRow = (arr, { row, value: newValue }) => arr[row].every(({ value }) => value !== newValue)
export const isValidValueByColumn = (arr, { column, value: newValue }) => arr.reduce((acc, curr) => [...acc, curr[column]],[]).every(({ value }) => value !== newValue)
export const hasNewValueInBlock = (block, newValue) => block.some((row) => row.some(({ value }) => value === newValue))

const fillBlock = (index, arr) => {

  // Get data and generate random position
  const block = getBlock(index, arr)
  const blockRow = Math.floor(Math.random() * 3)
  const blockColumn = Math.floor(Math.random() * 3)
  const arrRow = block[blockColumn][blockRow].index.split('')[0]
  const arrColumn = block[blockColumn][blockRow].index.split('')[1]

  // Genetate again if position exist
  if(block[blockColumn][blockRow].value) fillBlock(index, arr)

  // Generate random value and validation all board
  let newValue = Math.floor(Math.random() * 9) + 1
  let isValidRow = isValidValueByRow(arr, { row: arrRow, value: newValue })
  let isValidColumn = isValidValueByColumn(arr, { column: arrColumn, value: newValue })
  let hasValueInBlock = hasNewValueInBlock(block, newValue)

  // Repeat generation of value if value is the same
  while(!isValidRow || !isValidColumn || hasValueInBlock) {
    newValue = Math.floor(Math.random() * 10) + 1
    isValidRow = isValidValueByRow(arr, { row: arrRow, value: newValue })
    isValidColumn = isValidValueByColumn(arr, { column: arrColumn, value: newValue })
    hasValueInBlock = hasNewValueInBlock(block, newValue)
  }

  // Set value and repeat if count of filled value less than 4
  arr[arrRow][arrColumn].value = newValue
  arr[arrRow][arrColumn].isDefault = true
  block[blockColumn][blockRow].value = newValue
  const countOfFilled = block.reduce((acc, curr) => acc+curr.reduce((acc2, curr2) => curr2.value ? acc2+1 : acc2 ,0),0)
  if(countOfFilled < 4) fillBlock(index, arr)
}

export const createArray = () => {
  return Array.from({ length: 9 }, (_, i) => Array.from({ length: 9 }, (_, j) => ({ index: `${i}${j}`, value: null })))
}

export const resetAndFillRandom = (arr) => {
  const newArr = JSON.parse(JSON.stringify(arr))
  for(let i = 0; i < newArr.length; i++) fillBlock(i, newArr)
  return newArr
}