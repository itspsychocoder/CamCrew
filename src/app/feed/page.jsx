"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { databases } from "@/utils/appwrite"; // assuming you store photos in a DB
import Image from "next/image";
const { loggedInUser, setLoggedInUser } = useUserStore();

function page() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // 🔹 Replace with Appwrite database call for photos
    const fetchPhotos = async () => {
      try {
        const res = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_PHOTOS_COLLECTION_ID
        );
        setPhotos(res.documents);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] p-6">
      <div className="max-w-5xl mx-auto space-y-6">
      <h1>{loggedInUser?.name}</h1>
      <h1>{loggedInUser?.email}</h1>
      <h1>{loggedInUser?.$id}</h1>
      <h1>{loggedInUser?.role}</h1>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-[#E0E0E0]"
        >
          📸 Camcrew Feed
        </motion.h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.$id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="bg-[#1E1E1E] border border-[#2E7D32]/20 shadow-xl rounded-2xl overflow-hidden">
                <div className="relative w-full h-56">
                  <Image
                    src={photo.url} // should be from Appwrite Storage
                    alt={photo.caption || "Photo"}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="p-4">
                  <h2 className="text-lg font-semibold text-[#E0E0E0]">
                    {photo.caption || "Untitled"}
                  </h2>
                  <p className="text-sm text-[#E0E0E0]/70">
                    {photo.category || "General"}
                  </p>
                </CardHeader>
                <CardContent className="flex justify-between items-center p-4">
                  <Button className="bg-[#2E7D32] hover:bg-[#FF6F61] text-[#E0E0E0] rounded-xl px-4 py-2 text-sm">
                    ❤️ Like
                  </Button>
                  <span className="text-[#00FF9D] text-sm cursor-pointer hover:underline">
                    View details
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default page
