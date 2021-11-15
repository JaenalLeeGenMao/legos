import React, { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { EventContext, Styled } from 'direflow-component';
import styles from './App.css';

const App = (props) => {
  const dispatch = useContext(EventContext);

  const inputEl = useRef();

  const [errorText, setErrorText] = useState('');
  const [showClearButton, setShowClearButton] = useState(false);

  const handleChange = (e) => {
    let regex = new RegExp(props.pattern)
    const matched = e.target.value.match(regex)

    e.target.value = matched === null ? '' : matched[0]

    if (matched !== null) {
      if (matched['input'] !== e.target.value) setErrorText(props.warningMessage);
      else setErrorText('');

      setShowClearButton(true);
    } else {
      if (props.required) {
        setErrorText(props.emptyMessage);
        setShowClearButton(false);
      } else {
        setErrorText('');
        setShowClearButton(false);
      }
    }
    // console.log(matched, e.target.value);

    const event = new CustomEvent('event-change', {
      detail: {
        value: e.target.value
      }
    });
    dispatch(event);
  };

  const handleReset = () => {
    inputEl.current.value = '';

    const event = new CustomEvent('event-change', {
      detail: {
        value: ''
      }
    });
    dispatch(event);

    setShowClearButton(false);
  }

  return (
    <Styled styles={styles}>
      <div className='wrapper'>
        <div className='relative'>
          <input
            ref={inputEl}
            placeholder={props.placeholder}
            className={[
              'input',
              props.disabled ? 'disabled' : '',
              props.rounded ? 'rounded' : '',
              errorText !== '' ? 'pink' : ''
            ].join(' ')}
            disabled={props.disabled}
            onChange={handleChange}
          />
          {showClearButton && !props.disabled && (
            <span onClick={handleReset} className="box-clear"></span>
          )}
        </div>
        <p className="feedback">{errorText}</p>
      </div>
    </Styled>
  );
};

App.defaultProps = {
  placeholder: '',
  pattern: '\\D+',
  warningMessage: '',
  emptyMessage: '',
  disabled: false,
  rounded: false,
  required: false
}

App.propTypes = {
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  warningMessage: PropTypes.string,
  emptyMessage: PropTypes.string,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  required: PropTypes.bool
};

export default App;
