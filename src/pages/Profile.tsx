import React, { useState, useEffect, ChangeEvent } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<{ id: number; name: string; email: string; profile_picture: string | null } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleUpdateProfile = async () => {
    const newName = prompt('Enter new name:') || '';
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user/${user?.id}/name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: newName })
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
      } else {
        console.error('Failed to update profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          alert('Account deleted successfully');
          // You may want to redirect the user to the login page or perform additional cleanup
        } else {
          console.error('Failed to delete account:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpdateProfilePicture = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('profile_picture', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/profile-picture', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser.user); // Assuming the response contains the updated user object
        alert('Profile picture updated successfully');
      } else {
        console.error('Failed to update profile picture:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <strong>User Profile</strong>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {user ? (
          <div>
            <div>
              {user.profile_picture ? (
                <img src={`http://127.0.0.1:8000/storage/${user.profile_picture}`} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
              ) : (
                <p>No profile picture available</p>
              )}
            </div>
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <button onClick={handleUpdateProfile}>Update Profile</button>
            <button onClick={handleDeleteAccount}>Delete Account</button>
            <div>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button onClick={handleUpdateProfilePicture}>Update Profile Picture</button>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
