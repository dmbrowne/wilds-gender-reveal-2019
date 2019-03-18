import React, { useEffect, useState } from 'react'

const useGameComplete = (complete: boolean) => {
  const [isComplete, setIsComplete] = useState(complete);
  useEffect(() => 
    setIsComplete(complete)
  ,[complete])

  return isComplete;
}

export default useGameComplete
