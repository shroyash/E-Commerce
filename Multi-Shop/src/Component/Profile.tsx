import { useState, useEffect, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth, db } from "../Firebase/Firebase.config"; // Import Firestore DB
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Firestore functions
import { assets } from '../Assests/assets';
import { toast } from "react-toastify";

const Navbar = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const profileIcon = assets.profile_icon;
  const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref for the file input

  // Handle file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageUpload(e.target.files[0]);
    }
  };

  // Fetch user data from Firestore
  const fetchUserData = async () => {
    if (auth.currentUser) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserName(userData.userName);
        setProfilePicture(userData.profilePicture || null);
      }
    }
    setLoading(false); // Set loading to false after fetching data
  };

  useEffect(() => {
    fetchUserData(); // Fetch the user data when the component mounts
  }, []);

  // Upload image to Firebase Storage and update user profile
  const uploadImage = async () => {
    if (imageUpload === null) return;

    // Create a reference to the image file in Firebase Storage
    const imageRef = ref(storage, `profilePics/${auth.currentUser?.uid}`);
    
    // Upload the image to Firebase Storage
    await uploadBytes(imageRef, imageUpload);

    // Get the download URL of the uploaded image
    const url = await getDownloadURL(imageRef);

    // Update Firebase Auth profile with the image URL
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        photoURL: url,
      });

      // Update Firestore document for the user with the new profile picture URL
      const userDocRef = doc(db, "users", auth.currentUser.uid); // Reference to user's Firestore document
      await updateDoc(userDocRef, {
        profilePicture: url, // Updating the profile picture field in Firestore
      });

      // Update local state with the new profile picture
      setProfilePicture(url);

      // Success notification
      toast.success("Profile picture updated successfully!");

      // Clear the file input and reset state
      setImageUpload(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input using the ref
      }
    }
  };

  // Handle the upload process with error handling
  const handleUploadProfile = () => {
    if (!imageUpload) {
      toast.error("Please select an image to upload");
      return;
    }
    uploadImage();
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div> // Display a loading indicator while fetching
      ) : (
        <div className="flex flex-col items-center space-x-4 space-y-3">
          {/* Display profile picture */}
          <img
            src={profilePicture || profileIcon}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          {/* Display user name */}
          <span>{userName || "Guest"}</span>
          
          {/* File input and upload button */}
          <input type="file" onChange={handleImageChange} ref={fileInputRef} />
          <button onClick={handleUploadProfile} className="bg-green-400 p-1 rounded-sm text-white">
            Upload Profile Picture
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
