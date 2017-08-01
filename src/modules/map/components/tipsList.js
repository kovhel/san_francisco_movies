import React from 'react';

const tips = [
  'Let\'s see how many movies are filmed in San Francisco',
  'You can search by title and pressing Enter',
  'Click on marker to see a list of movies that were filmed near',
  'Check movie details by clicking on it\'s title in marker popup',
  'GL & HF',
];

const TipsList = () => (
  <div style={{ position: 'absolute', zIndex: '1000', top: '30%', left: '50px', width: '20%' }}>
    {
      tips.map((tip, i) => (
        <div
          key={i}
          style={{
            backgroundColor: 'rgba(20, 20, 150, 0.5)',
            color: 'white',
            borderRadius: '5px',
            marginTop: '5px',
            padding: '5px',
          }}
        >{tip}</div>
      ))
    }
  </div>
);

export default TipsList;
