import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Dialog } from '@capacitor/dialog';

export const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    // allowEditing: true,
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
  });

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  //   const imageUrl = image.dataUrl;
  Dialog.alert({
    title: 'image',
    message: image.path || 'null',
  });
  console.log(image);
};

export const pickFromGallery = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    // allowEditing: true,
    resultType: CameraResultType.Uri,
    source: CameraSource.Photos,
  });

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  //   const imageUrl = image.dataUrl;
  Dialog.alert({
    title: 'image',
    message: image.path || 'null',
  });
  console.log(image);
};

