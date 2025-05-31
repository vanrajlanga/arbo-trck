import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const ImageUpload = ({ images, onChange }) => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (event) => {
    event.preventDefault(); // Prevent form submission
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    // Convert FileList to array to process files
    const fileArray = Array.from(files);
    let processedFiles = 0;
    const newImages = [...images];
    
    fileArray.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`Image "${file.name}" exceeds the 10MB size limit`);
        processedFiles++;
        if (processedFiles === fileArray.length) {
          setUploading(false);
        }
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result;
        newImages.push(result);
        processedFiles++;
        
        if (processedFiles === fileArray.length) {
          onChange(newImages);
          setUploading(false);
          toast.success(`${fileArray.length} image(s) uploaded successfully`);
        }
      };
      
      reader.onerror = () => {
        toast.error(`Failed to read file: ${file.name}`);
        processedFiles++;
        if (processedFiles === fileArray.length) {
          setUploading(false);
        }
      };
      
      reader.readAsDataURL(file);
    });
    
    // Clear the file input
    event.target.value = '';
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
    toast.success("Image removed");
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="image-upload">Trek Images</Label>
        <div className="mt-2">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> trek images
                </p>
                <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB each)</p>
                {uploading && (
                  <p className="text-blue-500 mt-2">Uploading images...</p>
                )}
              </div>
              <Input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
                onClick={(e) => e.stopPropagation()} // Prevent form submission on click
              />
            </label>
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <div>
          <Label>Uploaded Images ({images.length})</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
            {images.map((image, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative group">
                    <img
                      src={image}
                      alt={`Trek image ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent form submission
                          e.stopPropagation();
                          removeImage(index);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No images uploaded yet</p>
          <p className="text-sm">Add some beautiful trek images to attract customers</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
