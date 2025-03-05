"use server";
export default async function registerNewUser(formData: FormData) {
  // Validate what has been passed in
  await new Promise((res) => setTimeout(res, 3000));
  console.log(formData);
  const height = formData.get("height");
  console.log(height);
}
