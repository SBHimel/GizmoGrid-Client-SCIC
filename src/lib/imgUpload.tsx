export const imageUpload = async (image: File) => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;

  if (!apiKey) {
    console.error("ImgBB API Key is missing inside environment variables!");
    return null;
  }

  const formData = new FormData();
  formData.append("image", image);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      return data.data.url;
    } else {
      console.error("ImgBB Upload Error:", data.error?.message);
      return null;
    }
  } catch (error) {
    console.error("Failed to upload image:", error);
    return null;
  }
};
