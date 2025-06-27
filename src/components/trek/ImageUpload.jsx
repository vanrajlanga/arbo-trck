import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ImageUpload = ({
  images,
  onChange
}) => {
  const [uploading, setUploading] = useState(false);
  const handleImageUpload = event => {
    event.preventDefault(); // Prevent form submission
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    // Convert FileList to array to process files
    const fileArray = Array.from(files);
    let processedFiles = 0;
    const newImages = [...images];
    fileArray.forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`Image "${file.name}" exceeds the 10MB size limit`);
        processedFiles++;
        if (processedFiles === fileArray.length) {
          setUploading(false);
        }
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
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
  const removeImage = index => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
    toast.success("Image removed");
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "space-y-6",
    children: [/*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx(Label, {
        htmlFor: "image-upload",
        children: "Trek Images"
      }), /*#__PURE__*/_jsx("div", {
        className: "mt-2",
        children: /*#__PURE__*/_jsx("div", {
          className: "flex items-center justify-center w-full",
          children: /*#__PURE__*/_jsxs("label", {
            htmlFor: "image-upload",
            className: "flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex flex-col items-center justify-center pt-5 pb-6",
              children: [/*#__PURE__*/_jsx(Upload, {
                className: "w-8 h-8 mb-4 text-gray-500"
              }), /*#__PURE__*/_jsxs("p", {
                className: "mb-2 text-sm text-gray-500",
                children: [/*#__PURE__*/_jsx("span", {
                  className: "font-semibold",
                  children: "Click to upload"
                }), " trek images"]
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-gray-500",
                children: "PNG, JPG or JPEG (MAX. 10MB each)"
              }), uploading && /*#__PURE__*/_jsx("p", {
                className: "text-blue-500 mt-2",
                children: "Uploading images..."
              })]
            }), /*#__PURE__*/_jsx(Input, {
              id: "image-upload",
              type: "file",
              multiple: true,
              accept: "image/*",
              onChange: handleImageUpload,
              disabled: uploading,
              className: "hidden",
              onClick: e => e.stopPropagation() // Prevent form submission on click
            })]
          })
        })
      })]
    }), images.length > 0 && /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsxs(Label, {
        children: ["Uploaded Images (", images.length, ")"]
      }), /*#__PURE__*/_jsx("div", {
        className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2",
        children: images.map((image, index) => /*#__PURE__*/_jsx(Card, {
          className: "relative overflow-hidden",
          children: /*#__PURE__*/_jsx(CardContent, {
            className: "p-0",
            children: /*#__PURE__*/_jsxs("div", {
              className: "relative group",
              children: [/*#__PURE__*/_jsx("img", {
                src: image,
                alt: `Trek image ${index + 1}`,
                className: "w-full h-32 object-cover"
              }), /*#__PURE__*/_jsx("div", {
                className: "absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
                children: /*#__PURE__*/_jsx(Button, {
                  type: "button",
                  variant: "destructive",
                  size: "sm",
                  onClick: e => {
                    e.preventDefault(); // Prevent form submission
                    e.stopPropagation();
                    removeImage(index);
                  },
                  children: /*#__PURE__*/_jsx(X, {
                    className: "h-4 w-4"
                  })
                })
              })]
            })
          })
        }, index))
      })]
    }), images.length === 0 && /*#__PURE__*/_jsxs("div", {
      className: "text-center py-8 text-gray-500",
      children: [/*#__PURE__*/_jsx(ImageIcon, {
        className: "h-12 w-12 mx-auto mb-4 text-gray-300"
      }), /*#__PURE__*/_jsx("p", {
        children: "No images uploaded yet"
      }), /*#__PURE__*/_jsx("p", {
        className: "text-sm",
        children: "Add some beautiful trek images to attract customers"
      })]
    })]
  });
};
export default ImageUpload;