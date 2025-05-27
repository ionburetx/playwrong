import React from 'react';

const Admin = () => {
    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <div className="admin-content">
                <section className="admin-section">
                    <h2>Welcome to Admin Panel</h2>
                    <p>Manage your application settings and users here.</p>
                </section>
                
                <section className="admin-section">
                    <h3>Quick Actions</h3>
                    <div className="admin-actions">
                        <button className="admin-button">Manage Users</button>
                        <button className="admin-button">View Reports</button>
                        <button className="admin-button">System Settings</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Admin;