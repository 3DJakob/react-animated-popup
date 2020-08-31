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
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
  z-index: 100;
  cursor: default;
  transition: ${props => props.animationDuration}ms;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'scale(1)' : 'scale(0.9)'};
`

function Popup ({ children, visible, onClose, animationDuration = 100, style }) {
  const [animationState, setAnimationState] = useState(visible)

  const bgClick = (e) => {
    e.stopPropagation()
    setAnimationState(false)

    window.setTimeout(() => {
      onClose()
    }, animationDuration)
  }

  useEffect(() => {
    setAnimationState(visible)
  }, [visible])

  if (!visible) return null

  return (
    React.createElement(Container, { clickable: animationState, onClick: bgClick }, [
      React.createElement(PromptElement, { style: { style }, onClick: (e) => e.stopPropagation(), visible: animationState, animationDuration: animationDuration }, children)
    ])
  )
}

export default Popup
