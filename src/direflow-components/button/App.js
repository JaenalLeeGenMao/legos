import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { EventContext, Styled } from 'direflow-component';
import styles from './App.css';

const App = (props) => {
  const dispatch = useContext(EventContext);

  const handleClick = (e) => {
    if (!props.disabled) {
      const event = new CustomEvent('event-click', e);
      dispatch(event);
    }
  };

  return (
    <Styled styles={styles}>
      <button
        className={[
          'button',
          props.disabled ? 'disabled' : '',
          props.rounded ? 'rounded' : ''
        ].join(' ')}
        onClick={handleClick}
      >
        {props.label}
      </button>
    </Styled>
  );
};

App.defaultProps = {
  label: '',
  disabled: false,
  rounded: false
}

App.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool
};

export default App;
