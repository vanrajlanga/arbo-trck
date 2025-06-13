};

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";


export const TrekShorts = () => {
  const [trekShorts, setTrekShorts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTrekShorts();
  }, []);

  const fetchTrekShorts = async () => {
    const { data, error } = await supabase
      .from('trek_shorts')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (data && !error) {
      setTrekShorts(data);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === trekShorts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? trekShorts.length - 1 : prevIndex - 1
    );
  };

  if (trekShorts.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-gray-500 text-center">No trek shorts available</p>
        </CardContent>
      </Card>
    );

  const currentShort = trekShorts[currentIndex];

  return (
    <div className="relative">
      <Card>
        <CardContent className="p-4">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
            {currentShort.embed_code ? (
              <div dangerouslySetInnerHTML={{ __html: currentShort.embed_code }} />
            ) : currentShort.thumbnail_image ? (
              <img 
                src={currentShort.thumbnail_image} 
                alt={currentShort.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Video Preview
              </div>
            )}
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">{currentShort.title}</h3>
          {currentShort.description && (
            <p className="text-sm text-gray-600">{currentShort.description}</p>
          )}
        </CardContent>
      </Card>

      {trekShorts.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center mt-3 space-x-2">
            {trekShorts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
