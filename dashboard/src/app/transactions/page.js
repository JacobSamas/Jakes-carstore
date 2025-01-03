'use client';
import { useState, useEffect } from 'react';

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    // Fetch transactions from the backend
    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                console.error('No token found. Redirecting to login...');
                router.push('/login');
                return;
            }
        
            const response = await fetch('http://localhost:5001/api/transactions', {
                headers: { Authorization: `Bearer ${token}` },
            });
        
            if (response.ok) {
                const data = await response.json();
            } else {
                console.error('Failed to fetch transactions');
            }
        };

        fetchTransactions();
    }, []);

    // Handle search
    useEffect(() => {
        let filtered = transactions;

        if (search) {
            filtered = filtered.filter(
                (transaction) =>
                    transaction.car_title.toLowerCase().includes(search.toLowerCase()) ||
                    transaction.buyer_name.toLowerCase().includes(search.toLowerCase()) ||
                    transaction.seller_name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredTransactions(filtered);
    }, [search, transactions]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Transactions</h1>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by car, buyer, or seller"
                    className="p-2 border rounded w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Transactions Table */}
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 text-left">Car</th>
                        <th className="p-4 text-left">Buyer</th>
                        <th className="p-4 text-left">Seller</th>
                        <th className="p-4 text-left">Price</th>
                        <th className="p-4 text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-t hover:bg-gray-50">
                            <td className="p-4">{transaction.car_title}</td>
                            <td className="p-4">{transaction.buyer_name}</td>
                            <td className="p-4">{transaction.seller_name}</td>
                            <td className="p-4">${transaction.price.toLocaleString()}</td>
                            <td className="p-4">
                                {new Date(transaction.transaction_date).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
