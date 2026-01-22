require("dotenv").config();
const mongoose = require("mongoose");
const { postModal } = require("./modals/post.modal");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};

connectDB();

// CRUD OPERATIONS

try {
  // CREATE
  const createPost = async (post) => {
    const newPost = await postModal.create(post);
    console.log(newPost);
  };

  (async () => {
    await createPost({
      title: "bhAAi",
      content: "bhAAi sAAb",
    });
    await createPost({
      title: "tiGOr",
      content: "Shakthi",
    });
    await createPost({
      title: "dawada",
      content: "RRR",
    });
  })();

  // READ
  const readPosts = async () => {
    const posts = await postModal.find({});
    console.log(posts);
  };
  readPosts();

  // update
  const updatePosts = async (id) => {
    const post = await postModal.updateOne(
      { _id: id },
      {
        $set: { title: "new title for tiGOr", status: "published" },
      },
      {
        runValidators: true,
      },
    );

    console.log(post);
  };

  updatePosts("6971aa23aae469c57d1eba99");

  // delete
  const deletePost = async (id) => {
    await postModal.deleteOne({ _id: id });
    console.log("post deleted successfully");
  };
  deletePost("6971aa23aae469c57d1eba99");

  const deleteAllPosts = async () => {
    await postModal.deleteMany({});
    console.log("all posts deleted successfully");
  };

  deleteAllPosts();
} catch (error) {
  console.log(error.message);
}
