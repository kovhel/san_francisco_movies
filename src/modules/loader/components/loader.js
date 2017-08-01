import React from 'react';

class Loader extends React.Component {
  componentDidMount() {
    this.props.loadAllFilmsData();
  }

  render() {
    const { progressPerCent } = this.props;

    return (
      <div
        style={{
          position: 'absolute',
          top: '90%',
          left: '10%',
          width: '80%',
          height: '12px',
          zIndex: '1000',
          borderRadius: '5px',
          backgroundColor: 'rgba(200, 200, 200, 0.33)',
          display: progressPerCent < 1.0 ? 'block' : 'none',
        }}
      >
        <div
          style={{
            height: '12px',
            borderRadius: '5px',
            backgroundColor: 'rgba(120, 120, 120, 0.33)',
            width: `calc(${80 * progressPerCent}%)`,
          }}
        />
      </div>
    );
  }
}

export default Loader;
