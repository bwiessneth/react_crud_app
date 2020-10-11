import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditUserModal = (props) => {
	const [user, setUser] = useState(props.currentUser);

	useEffect(() => {
		setUser(props.currentUser);
	}, [props]);

	const handleClose = () => {
		props.setShow(false);
	};

	const handleSubmit = () => {
		if (!user.username || !user.email) return;
		props.updateUser(user.id, user);
		handleClose();
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
	};

	return (
		<>
			<Modal show={props.show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<div className="form-group">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								name="username"
								className="form-control"
								value={user.username || ""}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="text"
								name="email"
								className="form-control"
								value={user.email || ""}
								onChange={handleInputChange}
							/>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default EditUserModal;
