import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { awsConfig } from './aws-config';

const s3Client = new S3Client(awsConfig);

export async function uploadImageToS3(file, folderName) {
    const params = {
        Bucket: 'librarymanagementstorage',
        Key: `${folderName}/${file.name}`,
        Body: file,
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        console.log('File uploaded successfully');

        const key = `${folderName}/${file.name}`;
        const url = `https://librarymanagementstorage.s3.ap-southeast-1.amazonaws.com/${folderName}/${file.name}`;
        return url;
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}
