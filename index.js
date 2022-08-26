import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

const PromptElement = styled.div`
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  margin: 20px;
  max-width: 400px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  z-index: 100;
  cursor: default;
  transition: ${(props) => props.animationDuration}ms;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) => (props.visible ? 'scale(1)' : 'scale(0.9)')};
`

function Popup ({ children, visible, onClose, animationDuration = 100, style }) {
  const [animationState, setAnimationState] = useState(visible)

  const [displayNothing, setDisplayNothing] = useState(!visible)

  useEffect(() => {
    if (visible) {
      // Trigger chained effect
      setDisplayNothing(false)
    }

    if (!visible) {
      setAnimationState(visible)
      window.setTimeout(() => {
        setDisplayNothing(true)
      }, animationDuration)
    }
  }, [visible, animationDuration])

  // Chained effects to be able to animate in from not existing
  useEffect(() => {
    if (!displayNothing) {
      setAnimationState(visible)
    }
  }, [displayNothing, visible])

  if (displayNothing) return null

  return React.createElement(
    Container,
    { clickable: animationState, onClick: onClose },
    [
      React.createElement(
        PromptElement,
        {
          animationDuration: animationDuration,
          onClick: (e) => e.stopPropagation(),
          style: { ...style },
          visible: animationState
        },
        children
      )
    ]
  )
}

export default Popup
