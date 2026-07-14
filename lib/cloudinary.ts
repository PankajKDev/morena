const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = "morena_unsigned";

async function uploadBase64(base64: string): Promise<string | null> {
  const cloudName = CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.warn("Cloudinary cloud name not configured");
    return null;
  }

  const formData = new FormData();
  formData.append("file", base64);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData },
    );
    const data = await res.json();
    if (data.secure_url) return data.secure_url;
    console.warn("Cloudinary upload failed", data);
    return null;
  } catch (err) {
    console.warn("Cloudinary upload error", err);
    return null;
  }
}

export { uploadBase64 };
