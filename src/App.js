import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import AddUserModal from "./forms/AddUserModal";
import EditUserModal from "./forms/EditUserModal";
import ViewUserModal from "./forms/ViewUserModal";
import UserList from "./lists/UserList";

const App = () => {
	// Set initial states
	const [users, setUsers] = useState([
		{ id: 1, username: "jan", email: "jan@example.com" },
		{ id: 2, username: "hein", email: "hein@example.com" },
		{ id: 3, username: "klaas", email: "klaas@example.com" },
		{ id: 4, username: "pit", email: "pit@example.com" },
	]);
	const [currentUser, setCurrentUser] = useState({
		id: null,
		name: "",
		username: "",
	});
	const [showEditModal, setShowEditModal] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [showViewModal, setShowViewModal] = useState(false);

	// Function to call when component render is done (only once)
	useEffect(() => {
		readUsers();
	}, []);

	// UI function to show the add modal
	const onShowAddModal = () => {
		setShowAddModal(true);
	};

	// UI function to show the view modal
	const onViewUser = (user) => {
		readUser(user.id);
		setCurrentUser({ id: user.id, username: user.username, email: user.email });
		setShowViewModal(true);
	};

	// UI function to show the edit modal
	const onEditUser = (user) => {
		setCurrentUser({ id: user.id, username: user.username, email: user.email });
		setShowEditModal(true);
	};

	// CRUD operations against the API
	// Create/
	const addUser = (user) => {
		console.log("addUser()", user);
		axios
			.post("http://localhost:1025/users", user)
			.then((res) => {
				setUsers([...users, res.data.data]);
			})
			.catch((err) => console.log(err));
	};

	const readUsers = () => {
		axios
			.get("http://localhost:1025/users")
			.then((res) => {
				setUsers(res.data.data);
			})
			.catch((err) => console.log(err));
	};

	const readUser = (id) => {
		console.log("readUser()", id);
		axios
			.get("http://localhost:1025/users/" + id)
			.then((res) => {
				setUsers(users.map((user) => (user.id === id ? res.data.data : user)));
			})
			.catch((err) => console.log(err));
	};

	const updateUser = (id, currentUser) => {
		console.log("updateUser()", id, currentUser);
		axios
			.patch("http://localhost:1025/users/" + id, currentUser)
			.then((res) => {
				setUsers(users.map((user) => (user.id === id ? res.data.data : user)));
			})
			.catch((err) => console.log(err));
	};

	const deleteUser = (id) => {
		console.log("deleteUser()", id);
		axios
			.delete("http://localhost:1025/users/" + id)
			.then((res) => {
				if (res.status === 204) {
					setUsers(users.filter((user) => user.id !== id));
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="container">
			<h1>React - CRUD app</h1>
			<AddUserModal show={showAddModal} setShow={setShowAddModal} addUser={addUser} />
			<ViewUserModal show={showViewModal} setShow={setShowViewModal} currentUser={currentUser} />
			<EditUserModal
				show={showEditModal}
				setShow={setShowEditModal}
				currentUser={currentUser}
				updateUser={updateUser}
			/>
			<div className="container">
				<div className="flex-large">
					<Button variant="primary" onClick={onShowAddModal}>
						Create new user
					</Button>
				</div>
				<div className="flex-large">
					<h2>View users</h2>
					<UserList users={users} viewUser={onViewUser} editUser={onEditUser} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	);
};

export default App;
