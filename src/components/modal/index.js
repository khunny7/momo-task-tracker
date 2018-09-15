import React from 'react';
import PropTypes from 'prop-types';

export class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal-back-drop">
        <div className="modal-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node
};
