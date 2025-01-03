'use client';
import { useState, useEffect } from 'react';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [editUser, setEditUser] = useState({});

    // Fetch users from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/users');
                const data = await response.json();
                setUsers(data);
                setFilteredUsers(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Handle search
    useEffect(() => {
        let filtered = users;

        if (search) {
            filtered = filtered.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredUsers(filtered);
    }, [search, users]);

    // Edit user role
    const handleEditUser = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/users/${editUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: editUser.role }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUsers((prev) =>
                    prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
                );
                setFilteredUsers((prev) =>
                    prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
                );
                setShowEditModal(false);
                alert('User role updated successfully!');
            } else {
                throw new Error('Failed to update user role');
            }
        } catch (error) {
            console.error('Error updating user role:', error);
            alert('Error updating user role');
        }
    };

    // Delete a user
    const handleDeleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/users/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUsers((prev) => prev.filter((user) => user.id !== id));
                setFilteredUsers((prev) => prev.filter((user) => user.id !== id));
                alert('User deleted successfully!');
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    className="p-2 border rounded w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Edit User Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Edit User Role</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Role</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={editUser.role}
                                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={() => setShowEditModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={handleEditUser}
                            >
                                Update Role
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* User Table */}
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-left">Role</th>
                        <th className="p-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-t hover:bg-gray-50">
                            <td className="p-4">{user.name}</td>
                            <td className="p-4">{user.email}</td>
                            <td className="p-4">{user.role}</td>
                            <td className="p-4 flex justify-center gap-2">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => {
                                        setEditUser(user);
                                        setShowEditModal(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
