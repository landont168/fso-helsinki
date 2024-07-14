import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

// allows Toggleable component to access ref assigned to it
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  // determine whether to show or hide form (props.children)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  // toggle visibility upon button click
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // exposes function so it can be invoked from outside the component
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
