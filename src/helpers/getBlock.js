const getBlock = (index, arr) => {
  return Array.from({ length: 3 }, (_, i) => Array.from({ length: 3 }, (_, j) => arr[(Math.floor(index/3))*3+i][(Math.floor(index%3))*3+j]))
}

export default getBlock;