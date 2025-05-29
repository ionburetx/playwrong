import { FC } from 'react';

interface ProfileData {
    name: string;
    email: string;
    role: string;
    bio: string;
}

const MyProfile: FC = () => {
    const profileData: ProfileData = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Software Developer',
        bio: 'Passionate about web development and new technologies.'
    };

    return (
        <div className="profile-container">
            <h1>My Profile</h1>
            <div className="profile-content">
                <div className="profile-section">
                    <h2>{profileData.name}</h2>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>Role:</strong> {profileData.role}</p>
                </div>
                <div className="profile-section">
                    <h3>About Me</h3>
                    <p>{profileData.bio}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile; 