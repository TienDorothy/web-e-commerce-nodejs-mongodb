const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const { signInWithEmailAndPassword } = require("firebase/auth");
const path = require("path");
const { auth } = require("../config/firebase.config");

async function uploadImages(file, quantity, name) {
  const storageFB = getStorage();

  await signInWithEmailAndPassword(
    auth,
    process.env.FIREBASE_USER,
    process.env.FIREBASE_AUTH
  );

  if (quantity === "single") {
    const dateTime = Date.now();
    const fileName = `product/${name}/${file.originName}-${dateTime}`;
    const storageRef = ref(storageFB, fileName);
    const metadata = {
      contentType: file.type,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }

  if (quantity === "multiple") {
    const downloadURLs = [];
    for (let i = 0; i < file.images.length; i++) {
      const dateTime = Date.now();
      const originalname = path.parse(file.images[i].originalname).name;
      const fileName = `product/${name}/${originalname}-${dateTime}`;
      const storageRef = ref(storageFB, fileName);
      const metadata = {
        contentType: file.images[i].mimetype,
      };

      //   const snapshot = await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);
      //   const downloadURL = await getDownloadURL(snapshot.ref);
      await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);
      const downloadURL = await getDownloadURL(storageRef);
      downloadURLs.push(downloadURL);
    }
    return downloadURLs;
  }
}

async function deleteImageUrls(product) {
  // const imageUrls = [product.img1, product.img2, product.img3, product.img4];
  const imageUrls = [product.img1];

  for (const imageUrl of imageUrls) {
    const storage = getStorage();
    const storageRef = ref(storage, imageUrl);
    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.error(`Error deleting image ${imageUrl}:`, error);
    }
  }
}
// async function deleteImageUrls(product) {
//   const imageUrls = [product.img1, product.img2, product.img3, product.img4];

//   const promises = imageUrls.map(async imageUrl => {
//     const storageRef = ref(getStorage(), imageUrl);
//     await deleteObject(storageRef);
//   });

//   await Promise.all(promises);
// }
module.exports = { uploadImages, deleteImageUrls };
