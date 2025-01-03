'use client';
import { useState, useEffect } from 'react';

export default function CarsPage() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editCar, setEditCar] = useState({});
    const [newCar, setNewCar] = useState({
        title: '',
        description: '',
        price: '',
        condition: 'new',
        ownerId: 1,
    });

    // Fetch cars from the backend
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/cars');
                const data = await response.json();
                setCars(data);
                setFilteredCars(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cars:', error);
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    // Handle search and filters
    useEffect(() => {
        let filtered = cars;

        if (search) {
            filtered = filtered.filter((car) =>
                car.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredCars(filtered);
    }, [search, cars]);

    // Add a new car
    const handleAddCar = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/cars/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCar),
            });

            if (response.ok) {
                const addedCar = await response.json();
                setCars((prev) => [...prev, { ...newCar, id: addedCar.carId }]);
                setFilteredCars((prev) => [...prev, { ...newCar, id: addedCar.carId }]);
                setNewCar({ title: '', description: '', price: '', condition: 'new', ownerId: 1 });
                setShowAddModal(false);
                alert('Car added successfully!');
            } else {
                throw new Error('Failed to add car');
            }
        } catch (error) {
            console.error('Error adding car:', error);
            alert('Error adding car');
        }
    };

    // Edit a car
    const handleEditCar = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/cars/${editCar.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editCar),
            });

            if (response.ok) {
                const updatedCar = await response.json();
                setCars((prev) =>
                    prev.map((car) => (car.id === updatedCar.id ? updatedCar : car))
                );
                setFilteredCars((prev) =>
                    prev.map((car) => (car.id === updatedCar.id ? updatedCar : car))
                );
                setShowEditModal(false);
                alert('Car updated successfully!');
            } else {
                throw new Error('Failed to update car');
            }
        } catch (error) {
            console.error('Error updating car:', error);
            alert('Error updating car');
        }
    };

    // Delete a car
    const handleDeleteCar = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/cars/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setCars((prev) => prev.filter((car) => car.id !== id));
                setFilteredCars((prev) => prev.filter((car) => car.id !== id));
                alert('Car deleted successfully!');
            } else {
                throw new Error('Failed to delete car');
            }
        } catch (error) {
            console.error('Error deleting car:', error);
            alert('Error deleting car');
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Cars</h1>

            {/* Add Car Button */}
            <div className="mb-6">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => setShowAddModal(true)}
                >
                    Add Car
                </button>
            </div>

            {/* Add Car Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Add New Car</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={newCar.title}
                                onChange={(e) => setNewCar({ ...newCar, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows="3"
                                value={newCar.description}
                                onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Price</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded"
                                    value={newCar.price}
                                    onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Condition</label>
                                <select
                                    className="w-full p-2 border rounded"
                                    value={newCar.condition}
                                    onChange={(e) => setNewCar({ ...newCar, condition: e.target.value })}
                                >
                                    <option value="new">New</option>
                                    <option value="used">Used</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={() => setShowAddModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={handleAddCar}
                            >
                                Add Car
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Car Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Edit Car</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={editCar.title}
                                onChange={(e) => setEditCar({ ...editCar, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows="3"
                                value={editCar.description}
                                onChange={(e) => setEditCar({ ...editCar, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Price</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded"
                                    value={editCar.price}
                                    onChange={(e) => setEditCar({ ...editCar, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Condition</label>
                                <select
                                    className="w-full p-2 border rounded"
                                    value={editCar.condition}
                                    onChange={(e) => setEditCar({ ...editCar, condition: e.target.value })}
                                >
                                    <option value="new">New</option>
                                    <option value="used">Used</option>
                                </select>
                            </div>
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
                                onClick={handleEditCar}
                            >
                                Update Car
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Car Table */}
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 text-left">Title</th>
                        <th className="p-4 text-left">Condition</th>
                        <th className="p-4 text-left">Price</th>
                        <th className="p-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCars.map((car) => (
                        <tr key={car.id} className="border-t hover:bg-gray-50">
                            <td className="p-4">{car.title}</td>
                            <td className="p-4">{car.condition}</td>
                            <td className="p-4">${car.price.toLocaleString()}</td>
                            <td className="p-4 flex justify-center gap-2">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => {
                                        setEditCar(car);
                                        setShowEditModal(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => handleDeleteCar(car.id)}
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
