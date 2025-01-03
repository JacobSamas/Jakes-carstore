'use client';

export default function AddCarModal({ isOpen, onClose, onAddCar, newCar, setNewCar }) {
    if (!isOpen) return null;

    return (
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
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={onAddCar}
                    >
                        Add Car
                    </button>
                </div>
            </div>
        </div>
    );
}
