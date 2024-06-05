const FileNameAndMimeType = uri => {
  const fileName = uri.split('/').pop();

  const mimeTypes = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
  };

  const fileExtension = fileName.split('.').pop().toLowerCase();

  const mimeType = mimeTypes[fileExtension] || 'application/octet-stream';

  return {fileName, mimeType};
};

export default FileNameAndMimeType;
