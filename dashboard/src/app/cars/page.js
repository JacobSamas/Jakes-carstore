'use client';
import { useState, useEffect } from 'react';
import AddCarModal from '../../components/AddCarModal';
import EditCarModal from '../../components/EditCarModal';

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

    useEffect(() => {
        const fetchCars = async () => {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                alert('Please log in first.');
                return;
            }

            try {
                const response = await fetch('http://localhost:5001/api/cars', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch cars');
                }

                const data = await response.json();
                setCars(data);
                setFilteredCars(data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    useEffect(() => {
        let filtered = cars;

        if (search) {
            filtered = filtered.filter((car) =>
                car.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredCars(filtered);
    }, [search, cars]);

    const handleAddCar = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert('Please log in first.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/cars/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newCar),
            });

            if (!response.ok) {
                throw new Error('Failed to add car');
            }

            const addedCar = await response.json();
            setCars((prev) => [...prev, { ...newCar, id: addedCar.carId }]);
            setFilteredCars((prev) => [...prev, { ...newCar, id: addedCar.carId }]);
            setNewCar({ title: '', description: '', price: '', condition: 'new', ownerId: 1 });
            setShowAddModal(false);
            alert('Car added successfully!');
        } catch (error) {
            console.error('Error adding car:', error);
            alert('Error adding car');
        }
    };

    const handleEditCar = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert('Please log in first.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5001/api/cars/${editCar.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editCar),
            });

            if (!response.ok) {
                throw new Error('Failed to update car');
            }

            const updatedCar = await response.json();
            setCars((prev) =>
                prev.map((car) => (car.id === updatedCar.id ? updatedCar : car))
            );
            setFilteredCars((prev) =>
                prev.map((car) => (car.id === updatedCar.id ? updatedCar : car))
            );
            setShowEditModal(false);
            alert('Car updated successfully!');
        } catch (error) {
            console.error('Error updating car:', error);
            alert('Error updating car');
        }
    };

    const handleDeleteCar = async (id) => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert('Please log in first.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5001/api/cars/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Failed to delete car');
            }

            setCars((prev) => prev.filter((car) => car.id !== id));
            setFilteredCars((prev) => prev.filter((car) => car.id !== id));
            alert('Car deleted successfully!');
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

            <div className="mb-6 flex justify-between">
                <input
                    type="text"
                    placeholder="Search cars..."
                    className="p-2 border rounded w-1/2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => setShowAddModal(true)}
                >
                    Add Car
                </button>
            </div>

            <AddCarModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAddCar={handleAddCar}
                newCar={newCar}
                setNewCar={setNewCar}
            />

            <EditCarModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onEditCar={handleEditCar}
                editCar={editCar}
                setEditCar={setEditCar}
            />

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
