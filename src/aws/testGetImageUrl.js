import React, { useState } from 'react';
import { uploadImageToS3 } from 'aws/uploadImageToS3';

function AvatarUploader() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedImage) {
            const url = await uploadImageToS3(selectedImage, 'avatars');
            setImageUrl(url);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />{' '}
            <button onClick={handleUpload}> Upload </button> {imageUrl && <img src={imageUrl} alt="Avatar" />}
            <p>{imageUrl}</p>
        </div>
    );
}

export default AvatarUploader;
