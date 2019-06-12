import React from 'react'
import Card from '../../../components/Card/Card.jsx'
import { useStateValue } from '../../../hooks/state.jsx'

const InfoDisplay = () => {
  const [{ currentFeature }, dispatch] = useStateValue();

  return (
    <Card
      title="Light Bootstrap Table Heading"
      category="Created using Roboto Font Family"
      content={
        <div>
          currentFeature
          {currentFeature}
          <p className="category">Header 1</p>Light Bootstrap
          Table Heading{" "}
        </div>
      }
    />
  )
}

export default InfoDisplay
