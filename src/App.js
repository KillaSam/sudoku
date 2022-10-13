import './App.css';
import { useEffect, useState } from 'react';
import { Block } from './components/Block/Block';
import { createArray, hasNewValueInBlock, isValidValueByColumn, isValidValueByRow, resetAndFillRandom } from './helpers/resetAndFillRandom';
import { ArrayContext } from './context/ArrayContext';
import getBlock from './helpers/getBlock';

function App() {
  const [allArr, setAllArr] = useState(createArray())
  const [isCompleted, setIsCompleted] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const onChangeCell = (index) => () => {
    const row = index.split('')[1]
    const column = index.split('')[0]
    const newArr = JSON.parse(JSON.stringify(allArr))
    newArr[column][row].value = newArr[column][row].value === 9 ? 1 : (newArr[column][row].value ?? 0) + 1
    setAllArr(newArr)
  }

  const reset = () => {
    setErrorMessage(null)
    setIsCompleted(false);
    setAllArr(resetAndFillRandom(createArray()))
  }

  const onSubmit = () => {
    setErrorMessage(null)
    if(allArr.some((row) => row.some(({ value }) => value === null))) {
      setErrorMessage('Something is not filled');
      return;
    }
    for(let i = 0; i < allArr.length; i++){
      for(let j = 0; j < allArr[i].length; j++) {
        if(!isValidValueByRow(allArr, { row: i, value: allArr[i][j].value })) {
          setErrorMessage('Error with row')
          return;
        }
        if(!isValidValueByColumn(allArr, { column: j, value: allArr[j][i].value })) {
          setErrorMessage('Error with column')
          return;
        }
      }
      const block = getBlock(i, allArr)
      if(hasNewValueInBlock(block, allArr)) {
        setErrorMessage('Error in block')
        return;
      }
    }
    setIsCompleted(true);
  }

  useEffect(() => (setAllArr(resetAndFillRandom(allArr))), [])

  return (
    <div className="App">
      <ArrayContext.Provider value={{ allArr, setAllArr, onChangeCell }}>
        <div style={{ display: 'inline-grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr' }}>
          {allArr.map((_, i) => <Block index={i} key={i} />)}
        </div>
        {errorMessage && <div>Error: {errorMessage}</div>}
        <button onClick={() => reset()}>Reset</button>
        {isCompleted ? <div>Completed!</div> : <button onClick={onSubmit}>Validate</button>}
      </ArrayContext.Provider>
    </div>
  );
}

export default App;
