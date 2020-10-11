import React from "react";

const UserList = (props) =>
	props.users.length > 0 ? (
		props.users.map((user) => (
			<div className="card mt-3" key={user.id}>
				<div className="card-body">
					<h5 className="card-title">
						{user.username} <span className="text-muted">#{user.id}</span>
					</h5>
					<h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
					<p className="card-text"></p>
					<button
						onClick={() => {
							props.viewUser(user);
						}}
						className="btn btn-primary"
					>
						View
					</button>
					<button
						onClick={() => {
							props.editUser(user);
						}}
						className="btn btn-secondary"
					>
						Edit
					</button>
					<button
						onClick={() => {
							props.deleteUser(user.id);
						}}
						className="btn btn-danger"
					>
						Delete
					</button>
				</div>
			</div>
		))
	) : (
		<div className="card mt-3 border-danger">
			<div className="card-body">
				<h5 className="card-title">No users</h5>
				<p className="card-text"></p>
			</div>
		</div>
	);

export default UserList;
