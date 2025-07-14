import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import TrekForm from "./TrekForm";
import { apiVendor } from "@/lib/api";

const EditTrek = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [trekData, setTrekData] = useState(null);

    useEffect(() => {
        loadTrek();
    }, [id]);

    const loadTrek = async () => {
        try {
            setLoading(true);
            const response = await apiVendor.getTrek(id);
            if (response.success) {
                setTrekData(response.data);
            } else {
                toast.error("Failed to load trek data");
            }
        } catch (error) {
            console.error("Error loading trek:", error);
            toast.error("Failed to load trek data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading trek details...</p>
                </div>
            </div>
        );
    }

    return <TrekForm mode="edit" trekId={id} initialData={trekData} />;
};

export default EditTrek;
