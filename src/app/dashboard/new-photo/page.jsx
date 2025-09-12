"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Client, Storage, Databases, ID, Permission, Role } from "appwrite";
import { Switch } from "@/components/ui/switch";
import { useUserStore } from "@/store/store";
import toast from "react-hot-toast";

const AddPhotoPage = () => {
    const { loggedInUser, setLoggedInUser } = useUserStore();

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [caption, setCaption] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [location, setLocation] = useState("");
    const [dateTaken, setDateTaken] = useState("");
    const [source, setSource] = useState("dslr");
    const [cameraModel, setCameraModel] = useState("");
    const [lens, setLens] = useState("");
    const [iso, setIso] = useState("");
    const [aperture, setAperture] = useState("");
    const [shutterSpeed, setShutterSpeed] = useState("");
    const [deviceDetails, setDeviceDetails] = useState("");
    const [isEdited, setIsEdited] = useState(false);
    const [editingInfo, setEditingInfo] = useState("");

    // New fields
    const [price, setPrice] = useState("");
    const [licenseType, setLicenseType] = useState("personal");
    const [availableForSell, setAvailableForSell] = useState(false);

    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

    const storage = new Storage(client);
    const databases = new Databases(client);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selected = e.target.files[0];
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a photo to upload");

        try {
            toast.loading("Uploading photo...");
            // 1. Upload file
            const uploaded = await storage.createFile(
                process.env.NEXT_PUBLIC_BUCKET_ID,
                ID.unique(),
                file
            );

            // 2. Save metadata
            await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
                process.env.NEXT_PUBLIC_COLLECTION_ID,
                ID.unique(),
                {
                    imageId: uploaded.$id,
                    caption,
                    category,
                    tags: tags.split(",").map((t) => t.trim()),
                    location,
                    dateTaken: dateTaken ? new Date(dateTaken).toISOString() : null,
                    source,
                    cameraModel: source === "dslr" ? cameraModel : "",
                    lens: source === "dslr" ? lens : "",
                    iso: source === "dslr" ? parseInt(iso) || null : null,
                    aperture: source === "dslr" ? aperture : "",
                    shutterSpeed: source === "dslr" ? shutterSpeed : "",
                    deviceDetails: source === "mobile" ? deviceDetails : "",
                    isEdited,
                    editingInfo,
                    price: price === "" ? null : Number(price),
                    licenseType,
                    availableForSell,
                    userId: loggedInUser.$id,
                }
            );
            toast.dismiss();

            toast.success("Photo uploaded successfully!");
            setFile(null);
            setPreview(null);
            setCaption("");
            setCategory("");
            setTags("");
            setLocation("");
            setDateTaken("");
            setSource("dslr");
            setCameraModel("");
            setLens("");
            setIso("");
            setAperture("");
            setShutterSpeed("");
            setDeviceDetails("");
            setIsEdited(false);
            setEditingInfo("");
            setPrice("");
            setLicenseType("personal");
            setAvailableForSell(false);
        } catch (error) {
            console.error("Upload failed:", error);
            toast.dismiss();
            toast.error("Failed to upload photo");
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center p-6">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl bg-[#1E1E1E] rounded-2xl shadow-lg p-8 space-y-6"
            >
                <h2 className="text-2xl font-bold text-[#00FF9D] mb-4 text-center">
                    Add New Photo
                </h2>

                {/* Image Upload with Preview */}
                <div>
                    <label className="block text-[#E0E0E0] mb-2">Upload Photo</label>

                    <div
                        className="relative flex flex-col items-center justify-center w-full h-40 
               rounded-lg border-2 border-dashed border-[#2E7D32] 
               bg-[#1E1E1E] hover:border-[#FF6F61] 
               cursor-pointer transition-colors"
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <p className="text-[#E0E0E0] text-sm">
                            Drag & drop or <span className="text-[#00FF9D]">browse</span>
                        </p>
                    </div>

                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-4 rounded-lg w-full max-h-64 object-cover border border-[#2E7D32]"
                        />
                    )}
                </div>


                {/* Caption */}
                <div>
                    <label className="block text-[#E0E0E0] mb-2">Caption</label>
                    <input
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full bg-[#121212] text-[#E0E0E0] border border-[#2E7D32] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00FF9D]"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-[#E0E0E0] mb-2">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. Portrait, Landscape"
                        className="w-full bg-[#121212] text-[#E0E0E0] border border-[#2E7D32] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00FF9D]"
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-[#E0E0E0] mb-2">
                        Tags (comma separated)
                    </label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="portrait, natural light"
                        className="w-full bg-[#121212] text-[#E0E0E0] border border-[#2E7D32] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00FF9D]"
                    />
                </div>

                {/* Location & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[#E0E0E0] mb-2">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-[#121212] text-[#E0E0E0] border border-[#2E7D32] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00FF9D]"
                        />
                    </div>
                    <div>
                        <label className="block text-[#E0E0E0] mb-2">Date Taken</label>
                        <input
                            type="date"
                            value={dateTaken}
                            onChange={(e) => setDateTaken(e.target.value)}
                            className="w-full bg-[#121212] text-[#E0E0E0] border border-[#2E7D32] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00FF9D]"
                        />
                    </div>
                </div>

                {/* Source */}
                <div>
                    <label className="block text-[#E0E0E0] mb-2">Source</label>
                    <select
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="w-full bg-[#121212] text-[#E0E0E0] border border-[#2E7D32] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00FF9D]"
                    >
                        <option value="dslr">DSLR</option>
                        <option value="mobile">Mobile</option>
                    </select>
                </div>

                {/* Camera Details */}
                {source === "dslr" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Camera Model"
                            value={cameraModel}
                            onChange={(e) => setCameraModel(e.target.value)}
                            className="bg-[#121212] text-[#E0E0E0] border border-[#2E7D32] rounded-lg px-4 py-2"
                        />
                        <input
                            type="text"
                            placeholder="Lens"
                            value={lens}
                            onChange={(e) => setLens(e.target.value)}
                            className="bg-[#121212] text-[#E0E0E0] border border-[#2E7D32] rounded-lg px-4 py-2"
                        />
                        <input
                            type="number"
                            placeholder="ISO"
                            value={iso}
                            onChange={(e) => setIso(e.target.value)}
                            className="bg-[#121212] text-[#E0E0E0] border border-[#2E7D32] rounded-lg px-4 py-2"
                        />
                        <input
                            type="text"
                            placeholder="Aperture"
                            value={aperture}
                            onChange={(e) => setAperture(e.target.value)}
                            className="bg-[#121212] text-[#E0E0E0] border border-[#2E7D32] rounded-lg px-4 py-2"
                        />
                        <input
                            type="text"
                            placeholder="Shutter Speed"
                            value={shutterSpeed}
                            onChange={(e) => setShutterSpeed(e.target.value)}
                            className="bg-[#121212] text-[#E0E0E0] border border-[#2E7D32] rounded-lg px-4 py-2"
                        />
                    </div>
                )}

                {/* Device Details if Mobile */}
                {source === "mobile" && (
                    <div>
                        <label className="block text-[#E0E0E0] mb-2">Device Details</label>
                        <input
                            type="text"
                            value={deviceDetails}
                            onChange={(e) => setDeviceDetails(e.target.value)}
                            placeholder="e.g. iPhone 15 Pro"
                            className="w-full bg-[#121212] text-[#E0E0E0] border border-[#2E7D32] rounded-lg px-4 py-2"
                        />
                    </div>
                )}

                {/* Edited */}
                <div className="flex items-center gap-3">
                    <Switch
                        checked={isEdited}
                        onCheckedChange={setIsEdited}
                        className="data-[state=checked]:bg-[#2E7D32] data-[state=unchecked]:bg-[#FF6F61]"
                    />
                    <label className="text-[#E0E0E0]">Edited</label>
                </div>

                {/* Editing Info */}
                {isEdited && (
                    <div>
                        <label className="block text-[#E0E0E0] mb-2">
                            Editing Info (Software/Details)
                        </label>
                        <input
                            type="text"
                            value={editingInfo}
                            onChange={(e) => setEditingInfo(e.target.value)}
                            placeholder="e.g. Lightroom, Photoshop"
                            className="w-full bg-[#121212] text-[#E0E0E0] border border-[#2E7D32] rounded-lg px-4 py-2"
                        />
                    </div>
                )}

                {/* --- NEW BUSINESS FIELDS --- */}

                {/* Price */}
                <div>
                    <label className="block text-[#E0E0E0] mb-2">Price (USD)</label>
                    <input
                        type="number"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full bg-[#121212] text-[#E0E0E0] border border-[#2E7D32] rounded-lg px-4 py-2"
                    />
                </div>

                {/* License Type */}
                <div>
                    <label className="block text-[#E0E0E0] mb-2">License Type</label>
                    <select
                        value={licenseType}
                        onChange={(e) => setLicenseType(e.target.value)}
                        className="w-full bg-[#121212] text-[#E0E0E0] border border-[#2E7D32] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00FF9D]"
                    >
                        <option value="personal">Personal</option>
                        <option value="commercial">Commercial</option>
                        <option value="editorial">Editorial</option>
                    </select>
                </div>

                {/* Available for Sale */}
                <div className="flex items-center gap-3">
                    <Switch
                        checked={availableForSell}
                        onCheckedChange={setAvailableForSell}
                        className="data-[state=checked]:bg-[#2E7D32] data-[state=unchecked]:bg-[#FF6F61]"
                    />
                    <label className="text-[#E0E0E0]">Available for Sale</label>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-[#2E7D32] text-white py-3 rounded-lg font-semibold hover:bg-[#FF6F61] transition-colors duration-300"
                >
                    Save Photo
                </button>
            </motion.form>
        </div>
    );
};

export default AddPhotoPage;
