const admin = require("firebase-admin");

// const serviceAccount = {
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
// };


const serviceAccount = {
  projectId: "learning-firebase-sdk",
  clientEmail:
    "firebase-adminsdk-fbsvc@learning-firebase-sdk.iam.gserviceaccount.com",
  privateKey:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkvbW2dYyo69oZ\n4nfh7YZz307Z1RBK9CjpvCejKW0OyBtwjcqxsaR2sGF6b5LMtXM+KfIEd0oBv6VR\nfRE4Pi2tb26ZtLi5+lu2/KGQx0TiKjalmSyhs2wTmJQ8t3uH0mMK+xIW12ndaHHN\nW/5Nr5EwZrGUYSnYnx+IzExSU/kLe/K8YxnjQG8vX/I+8w8KwWNjUTnbSoyobxNh\nj+a8gog7iQUyrCwpTynhuPVoTG5GrJIRtcbWBNHC03kpr3C/L1pR1Sd5WwNHW9+P\njyonj6+sMeLvgFzUz7RRJbqNL/N9FpHrGSFkVvbMd1Jrohl10V9jJRlxD2ralRgx\np5Hqtym7AgMBAAECggEABHrtgBOAHbBVI2lF/FymA7mzeCrnGtRU1oJzWE8bAN3O\n5tRpI94vMrq6QLoPD0a+zLAXilwm8ZduKtV2/4VFX1cz9hv0y1Rnl4YVHyeKlCIB\nj9nzqkdQYNOmvsrFbvZF39/f6CoeKwZmB4E0dpVk1Yc9b7BMX71E5MbPK1mbel67\nf7OjGX8WdZbSe73W/ectDcUVWgGfnzkLe51in8tpt3YF5DjileAWaTUcbSZXURf3\neWBB4aNr3x+SYFCJW4DnZ5E2ZLjbQF7foCatnWQvhad1RD6eXsUsqhksPpac2WHC\nQvwKdtx8Xl7kAUUeFVUXefitN21sXxCkF+COraAYmQKBgQDRRf/VfeWvdnemGYjs\nGqTkFEuIh5iph9FrCudr7cX+p9NCXZVUgD+ZluzJTH3CewfsybkDejSOmPv/uNEc\nfD8V7UVmIMWsmHbLeLiN06MUkaV21OMWfu3k7thH1zXuAoG9tG8PQ1aITqxNi6/2\nv0l1zlZg5MbP49/QEEnRK8jpiQKBgQDJhkEU+jDFV3uR6il3pcGci82V/qcCj/dX\nm3a0aG8++hZKVK7oRS5gD3V745CNzLGtjGVg2slAZjSBr/56hR3XXSlzMICLSuvq\ngOIbOBLL4FYVE0qGU4jPIR2j7PdUfjbUBUSdWojWTWiL8KlkMFncpSU/hVcggKOB\neyUcHUJcIwKBgD9vsp9qrGdFx/snnmPDp9wjcsoOIG6zZv3FrmT/DJenE9j4OT4G\nKkFKiLh0YWLEnKBgfZ7aOnhHU4wu3+R8nTruU60jngg1pz0CeR802ihwBfJBkhzN\nmRtec11DlWtygxWYTloYFXD4OC7BezOWxJPbWj/A2atG7h9J8LZhSWPRAoGASXFQ\nDqEPXRwAwLCh5CTYZoDcr6lanChzb84MeLsGr+DcdsJd6/Aqcn+vxTKt37+VkTX1\nTFLvvTSCNjE5gNU6ht5A2OX4MstfJttJi7nnv71GIfAh3MpctX/QGYmmqXhF6wbw\ndpgj/lW/oCBY21ZzqWHWLUwe8I1xCSMj5xcStBkCgYEAmnrxvj9B1pd8cOzTj2vA\nQNeE9iZ/bfTdMBzo8ymjuM46y/juBKzwG+cQG+T9bQ8IKwJNwLscll8bBvJsz3GB\neCadRuv4bSyNPLvkZ7tfBZOeiP4KkucgkyBggjLTHqQ3PrHz45d4nP6oyfbtGXIi\nL/iFUlB6D+xeCCW6Nj4ZqaQ=\n-----END PRIVATE KEY-----\n",
};


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };
