import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { EventContext, Styled } from 'direflow-component';
import styles from './App.css';

const App = (props) => {
  const dispatch = useContext(EventContext);

  const handleChange = (e) => {
    let regex = new RegExp(props.pattern)
    const matched = e.target.value.match(regex)

    e.target.value = matched === null ? '' : matched[0]

    const event = new CustomEvent('event-change', {
      detail: {
        value: e.target.value
      }
    });
    dispatch(event);
  };

  return (
    <Styled styles={styles}>
      <div className='wrapper'>
        <input
          placeholder={props.placeholder}
          className={[
            'input',
            props.rounded ? 'rounded' : ''
          ].join(' ')}
          onChange={handleChange}
        />
      </div>
    </Styled>
  );
};

App.defaultProps = {
  placeholder: '',
  pattern: '\\D+',
  rounded: false
}

App.propTypes = {
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  rounded: PropTypes.bool
};

export default App;
