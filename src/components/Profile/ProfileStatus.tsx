import React, { ChangeEvent } from "react";

type StateType = {
  editMode: boolean;
  status: string;
};

type PropsType = {
  status: string;
  updateStatus: (newStatus: string) => void;
};

class ProfileStatus extends React.Component<PropsType, StateType> {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    const { status, editMode } = this.state;

    const { activateEditMode, deactivateEditMode, onStatusChange } = this;

    return (
      <>
        {!editMode && (
          <div>
            <span onClick={activateEditMode}>{this.props.status}</span>
          </div>
        )}
        {editMode && (
          <div>
            <input
              onChange={onStatusChange}
              onBlur={deactivateEditMode}
              value={status}
              autoFocus={true}
            />
          </div>
        )}
      </>
    );
  }
}
export default ProfileStatus;
