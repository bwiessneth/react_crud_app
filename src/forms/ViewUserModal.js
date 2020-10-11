import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ViewUserModal = (props) => {
	const [user, setUser] = useState(props.currentUser);

	useEffect(() => {
		setUser(props.currentUser);
	}, [props]);

	const onHide = () => {
		props.setShow(false);
	};

	return (
		<>
			<Modal show={props.show} onHide={onHide}>
				<Modal.Header closeButton>
					<Modal.Title>View user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<div className="form-group">
							<label htmlFor="username">Username</label>
							<input
								readOnly
								type="text"
								name="username"
								className="form-control"
								value={user.username || ""}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								readOnly
								type="text"
								name="email"
								className="form-control"
								value={user.email || ""}
							/>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={onHide}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ViewUserModal;
