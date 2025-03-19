import React, { useState } from 'react';
import './App.css';

function NewComponent() {
    const [count, setCount] = useState(0);
    const [users, setUsers] = useState([]); // Initially empty, won't fetch automatically
    const [formData, setFormData] = useState({ name: '', age: '', specialOccasion: '' });
    const [showForm, setShowForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/users");
            if (!response.ok) {
                console.log("Error fetching data");
                return;
            }
            const data = await response.json();
            setUsers(data); // Now users will be set only when the button is clicked
        } catch (err) {
            console.log("Error:", err);
        }
    };

    // const handleDelete = async (id) => {
    //     try {
    //         await fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' });
    //         setUsers(users.filter(user => user._id !== id));
    //     } catch (err) {
    //         console.log("Error:", err);
    //     }
    // };

    // const handleUpdateClick = (user) => {
    //     setCurrentUser(user);
    //     setFormData({ name: user.name, age: user.age, specialOccasion: user.specialOccasion });
    //     setShowUpdateForm(true);
    // };

    // const handleUpdateSubmit = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:3000/users/${currentUser._id}`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(formData)
    //         });
    //         if (!response.ok) return;
    //         setShowUpdateForm(false);
    //         fetchData();
    //     } catch (err) {
    //         console.log("Error:", err);
    //     }
    // };

    const handleAddUser = async () => {
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) return;
            setShowForm(false);
            fetchData();
        } catch (err) {
            console.log("Error:", err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <button className="like-button" onClick={handleIncrement}>Like: {count}</button>
            <button className="fetch-button" onClick={fetchData}>Fetch Data</button>
            <button className="add-button" onClick={() => setShowForm(true)}>Add User</button>
            
            {showForm && (
                <div className="form-container">
                    <input name="name" placeholder="Name" onChange={handleChange} />
                    <input name="age" placeholder="Age" type="number" onChange={handleChange} />
                    <input name="specialOccasion" placeholder="Special Occasion" onChange={handleChange} />
                    <button onClick={handleAddUser}>Submit</button>
                    <button onClick={() => setShowForm(false)}>Cancel</button>
                </div>
            )}
            
            {/* {showUpdateForm && (
                <div className="form-container">
                    <h3>Update User</h3>
                    <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                    <input name="age" placeholder="Age" type="number" value={formData.age} onChange={handleChange} />
                    <input name="specialOccasion" placeholder="Special Occasion" value={formData.specialOccasion} onChange={handleChange} />
                    <button onClick={handleUpdateSubmit}>Update</button>
                    <button onClick={() => setShowUpdateForm(false)}>Cancel</button>
                </div>
            )} */}

            <div className="user-container">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user._id} className="user-card">
                            <h2>{user.name}</h2>
                            <p>Age: {user.age}</p>
                            <p>Special Occasion: {user.specialOccasion}</p>
                            {/* <button onClick={() => handleUpdateClick(user)}>Update</button> */}
                            {/* <button onClick={() => handleDelete(user._id)}>Delete</button> */}
                        </div>
                    ))
                ) : (
                    <p>No data available. Click "Fetch Data" to load users.</p>
                )}
            </div>
        </div>
    );
}

export default NewComponent;
