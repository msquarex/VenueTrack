import { db } from "./firebase";
import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";

// Venue operations
export const addVenue = async (venueData) => {
  try {
    const docRef = await addDoc(collection(db, "venues"), venueData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getVenues = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "venues"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

// Booking operations
export const bookVenue = async (userId, bookingData) => {
  try {
    console.log('bookVenue called with:', userId, bookingData);
    
    // Add the booking to the 'bookings' collection
    console.log('Adding booking to Firestore...');
    const bookingRef = await addDoc(collection(db, 'bookings'), {
      userId,
      createdAt: serverTimestamp(),
      startDate: bookingData.startDate,
      status: bookingData.status,
      venueId: bookingData.venueId,
      venueName: bookingData.venueName,
      reason: bookingData.reason
    });

    console.log('Booking added with ID: ', bookingRef.id);

    // Update the venue's status to 'booked'
    console.log('Updating venue status...');
    const venueRef = doc(db, 'venues', bookingData.venueId);
    await updateDoc(venueRef, {
      status: 'booked'
    });

    console.log('Venue status updated to booked');

    return bookingRef.id;
  } catch (error) {
    console.error('Error in bookVenue:', error);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    if (error.message) {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export const getUserBookings = async (userId) => {
  try {
    const q = query(collection(db, "bookings"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};