import { useState, useEffect, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth, db } from "../Firebase/Firebase.config";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { assets } from '../Assests/assets';
import { toast } from "react-toastify";

const Navbar = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // Add uploading state
  const profileIcon = assets.profile_icon;
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
    const unsubscribe = onSnapshot(doc(db, "users", auth.currentUser?.uid || ""), (doc) => {
      setProfilePicture(doc.data()?.profilePicture || profileIcon);
      setUserName(doc.data()?.userName || "Guest");
    });

    return () => unsubscribe();
  }, []);

  // Upload image to Firebase Storage and update user profile
  const uploadImage = async () => {
    if (imageUpload === null) return;

    try {
      setUploading(true); // Start uploading state

      // Create a reference to the image file in Firebase Storage
      const imageRef = ref(storage, `profilePics/${auth.currentUser?.uid}`);
      await uploadBytes(imageRef, imageUpload);

      // Get the download URL of the uploaded image
      const url = await getDownloadURL(imageRef);

      // Update Firebase Auth profile with the image URL
      await updateProfile(auth.currentUser!, { photoURL: url });

      // Update Firestore document for the user with the new profile picture URL
      const userDocRef = doc(db, "users", auth.currentUser!.uid);
      await updateDoc(userDocRef, { profilePicture: url });

      setProfilePicture(url);
      toast.success("Profile picture updated successfully!");

      setImageUpload(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input using the ref
      }
    } catch (error) {
      toast.error("Error uploading profile picture");
    } finally {
      setUploading(false); // Stop uploading state
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col items-center space-x-4 space-y-3">
          {/* Display profile picture */}
          <img
            src={profilePicture || profileIcon}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span>{userName || "Guest"}</span>

          {/* File input and upload button */}
          <input type="file" onChange={handleImageChange} ref={fileInputRef} />
          <button onClick={uploadImage} className="bg-green-400 p-1 rounded-sm text-white">
            {uploading ? "Uploading..." : "Upload Profile Picture"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
