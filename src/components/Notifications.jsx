import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Swal from "sweetalert2"

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userToken = useSelector(state=>state.userToken)
  console.log(userToken)

  useEffect(() => {
    const fetchNotifications = async () => {
        // Swal.fire({
        //     title: 'Processing...',
        //     text: 'Please wait while we process your request.',
        //     allowOutsideClick: true,
        //     didOpen: () => {
        //         Swal.showLoading();
        //     },
        // });

      try {
        const response = await axios.get('https://paysphere-api.vercel.app/notifications', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const newNotifications = response.data;
        console.log(response.data)

        // // Compare and find new notifications
        // const newOnes = newNotifications.filter(
        //   newNotif => !notifications.some(notif => notif.id === newNotif.id)
        // );

        // if (newOnes.length > 0) {
        //   // Show only new notifications (for example, alerting or displaying a modal)
        //   alert(`You have new notifications: ${newOnes.map(n => n.title).join(', ')}`);
        // }

        setNotifications(newNotifications);
      } catch (err) {
        console.error(err)
        // if (err.response && err.response.status === 404) {
        //   setError(err.response.data.message || "User not found.");
        // } else {
        //   setError("Failed to fetch notifications.");
        // }
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications(); // Initial fetch
    const intervalId = setInterval(fetchNotifications, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [notifications]); // Add notifications to dependency array

  if (loading) {
    return <LoadingMessage>Loading your notifications...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (notifications.length === 0) {
    return <NoNotificationMessage>You don't have any notifications yet.</NoNotificationMessage>;
  }

  return (
    <NotificationContainer>
      <Title>Your Notifications</Title>
      {notifications.map((notification) => (
        <NotificationCard key={notification.id}>
          <NotificationInfo>
            <p><strong>Title:</strong> {notification.title}</p>
            <p><strong>Message:</strong> {notification.message}</p>
          </NotificationInfo>
        </NotificationCard>
      ))}
    </NotificationContainer>
  );
};

export default Notifications;

// Styled components
const NotificationContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const NotificationCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

const NotificationInfo = styled.div`
  p {
    margin: 5px 0;
    color: #555;
    font-size: 16px;

    strong {
      color: #000;
    }
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #007bff;
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: red;
`;

const NoNotificationMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #555;
`;
