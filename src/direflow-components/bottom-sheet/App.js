import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { EventContext, Styled } from 'direflow-component';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import styles from './App.scss';

const App = (props) => {
  const dispatch = useContext(EventContext);

  const [open, setOpen] = useState(false);
  const [draggingDistance, setDraggingDistance] = useState(0);

  const rootRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    setOpen(props.open);
    setDraggingDistance(0);

    /** prevent body from scrolling when bottom sheet is open */
    document.body.style.overflowY = props.open ? 'hidden' : 'visible';
  }, [props.open]);

  const isElementInViewport = (el, distanceY) => {
    let top = el.offsetTop;
    return (
      top >= window.pageYOffset &&
      (top + distanceY) <= (window.innerHeight * .8)
    );
  }

  const contentHeight = _get(contentRef, 'current.offsetHeight' , 1);

  const rootAnimatedStyles = useSpring({
    reverse: !open,
    from: { opacity: 0 },
    to: { opacity: 1 - Math.min(draggingDistance / contentHeight, 1) },
    config: {
      clamp: true
    },
  });

  const contentAnimatedStyles = useSpring({
    reverse: !open,
    from: { y: 250, opacity: 0 },
    to: { y: draggingDistance, opacity: 1 },
    config: {
      clamp: true
    },
    onRest: () => {
      /** incase user scoll up and down and suddenly idle or stuck, we set it back to original position */
      if (open) setDraggingDistance(0);
    }
  });

  const chunkAnimatedStyles = useSpring({
    reverse: !open,
    from: { y: 250, opacity: 0 },
    to: { y: Math.max(draggingDistance, 0), opacity: 1 },
    config: {
      clamp: true
    },
  });

  const handleCloseOverlay = () => {
    setOpen(false);
    setDraggingDistance(250);

    const event = new CustomEvent('event-close', {
      detail: {
        value: false
      }
    });
    dispatch(event);
  }

  const handleDrag = ({ down, dragging, distance, movement }) => {
    /** drag top logic */
    if (movement[1] < 0) setDraggingDistance(distance * -.1);
    else {
      /** drag bottom logic */
      if (dragging || down) setDraggingDistance(distance);
      else {
        const isInViewport = isElementInViewport(contentRef.current, distance);

        if (isInViewport) setDraggingDistance(0);
        else handleCloseOverlay()
      }
    }
  }
  const bind = useDrag(handleDrag, {
    filterTaps: true,
  })

  return (
    <Styled styles={styles}>
      <div>
        <animated.div ref={rootRef} {...bind()} style={{ ...rootAnimatedStyles }}>
          <div className={["overlay", open ? "" : "hide"].join(" ")} onClick={handleCloseOverlay} />
          <animated.div className="bloatedchunk" style={{ ...chunkAnimatedStyles, touchAction: 'none', height: `${_get(contentRef.current, 'offsetHeight', '100')}px` }} />
          <animated.div ref={contentRef} className={["content", open ? "" : "hide"].join(" ")} style={{...contentAnimatedStyles, touchAction: 'none'}}>
            <span className="floating-bar"/>
            <div className="pad-20">
              <slot></slot>
            </div>
          </animated.div>
        </animated.div>
      </div>
    </Styled>
  );
};

App.defaultProps = {
  open: false
}

App.propTypes = {
  open: PropTypes.bool
};

export default App;
