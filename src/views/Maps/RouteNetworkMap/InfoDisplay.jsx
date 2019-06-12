import React from 'react'
import Card from '../../../components/Card/Card.jsx'

var InfoDisplay = props => {
  return (
    <Card
      title="Light Bootstrap Table Heading"
      category="Created using Roboto Font Family"
      content={
        <div>
          <p className="category">Header 1</p>Light Bootstrap
          Table Heading{" "}
        </div>
      }
    />
  )
}

export default InfoDisplay
