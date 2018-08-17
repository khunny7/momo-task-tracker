import React from 'react'
import { Modal } from '../modal'

export class NewTaskCreate extends React.Component {
  constructor(props) {
    super(props)
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.isOpen}
          onClose={this.toggleModal}>
          Some content for the modal
        </Modal>
      </div>
    )
  }
}