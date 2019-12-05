import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private file: File
  ) {
    firebase.initializeApp({});
  }

  // FILE STUFF
  makeFileIntoBlob(imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = '';
      let filePath = '';

      this.file
        .resolveLocalFilesystemUrl(imagePath)
        .then(fileEntry => {
          const { name, nativeURL } = fileEntry;

          // get the path..
          const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
          console.log('path', path);
          console.log('fileName', name);

          fileName = name;
          filePath = nativeURL;
          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          const imgBlob = new Blob([buffer], {
            type: 'image/jpeg'
          });
          console.log(imgBlob.type, imgBlob.size);
          resolve({
            fileName,
            imgBlob,
            filePath
          });
        })
        .catch(e => reject(e));
    });
  }

  uploadToFirebase(imageBlobInfo) {
    console.log('uploadToFirebase');

    return new Promise((resolve, reject) => {
      const fileRef = firebase.storage().ref('images/' + imageBlobInfo.fileName);
      const uploadTask = fileRef.put(imageBlobInfo.imgBlob);

      uploadTask.on(
        'state_changed',
        (snapshot: any) => {
          console.log(
            'snapshot progess ' +
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        error => {
          console.log(error);
          reject(error);
        },
        () => {
          // completion...
          resolve(uploadTask.snapshot);
        }
      );
    });
  }

  deleteImage(imgUrl: string) {
    firebase.storage().refFromURL(imgUrl).delete();
  }
}
