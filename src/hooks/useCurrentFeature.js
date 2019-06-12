import React from 'react'

export default (id) => {
  const [currentFeature, setCurrentFeature] = React.useState(0)
  //
  // const [value, setValue] = React.useState(
  //   localStorage.getItem(localStorageKey) || '',
  // )

  React.useEffect(() => {
    setCurrentFeature(currentFeature)
  }, [currentFeature])

  return [currentFeature, setCurrentFeature]
}
