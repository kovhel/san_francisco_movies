import React from 'react';
import { markersIcons } from '../../../constants/markersIcons';

const legendLineHeight = 20;
const legendStyle = {
  float: 'left',
  height: `${legendLineHeight}px`,
  lineHeight: `${legendLineHeight}px`,
};

const MarkersLegend = () => (
  <div
    style={{
      position: 'absolute',
      zIndex: '1000',
      bottom: '50px',
      left: '50px',
      color: 'white',
    }}
  >
    <h4>Markers colors</h4>
    {
      Object.keys(markersIcons).map((key, i) => (
        <div key={key} style={{ clear: 'both' }}>
          <img
            src={markersIcons[key]}
            alt="marker"
            style={{
              float: 'left',
              height: `${legendLineHeight}px`,
              paddingRight: '3px',
            }}
          />
          {
            i !== Object.keys(markersIcons).length - 1 ?
              <span style={legendStyle}>less than {key} films per location</span> :
              <span style={legendStyle}>more than {key} films per location</span>
          }
        </div>
      ))
    }
  </div>
);

export default MarkersLegend;
