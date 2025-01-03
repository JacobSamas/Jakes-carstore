'use client';

export default function EditCarModal({ isOpen, onClose, onEditCar, editCar, setEditCar }) {
    if (!isOpen) return null;

    return (
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
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={onEditCar}
                    >
                        Update Car
                    </button>
                </div>
            </div>
        </div>
    );
}
