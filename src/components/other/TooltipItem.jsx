import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';

const TooltipItem = ({  id ,  toolTipLabel , index }) => {

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

    return (   
        <Tooltip
            placement='top'
            isOpen={tooltipOpen}
            target={`tooltip-${index}`}
            toggle={toggle}
            key={index}
        >
            {toolTipLabel}
        </Tooltip>
  );
}

export default TooltipItem

TooltipItem.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string,
  toolTipLabel : PropTypes.string,
  index : PropTypes.number
};