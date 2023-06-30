import React from 'react'

const activeContext = React.createContext({
  activeId: 'ALL',
  changeActiveId: () => {},
})

export default activeContext
