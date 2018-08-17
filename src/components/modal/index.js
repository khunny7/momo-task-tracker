import React from 'react';
import PropTypes from 'prop-types';

export class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
      width: '100%',
      height: '100%',
      zIndex: 10,
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      width: '80%',
      margin: '15% auto',
      padding: 30
    };

    return (
      <div style={backdropStyle}>
        <div style={modalStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};
