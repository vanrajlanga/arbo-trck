
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";


  bannerType | "trek_short" | "seasonal_forecast";

export const BannerSlider = ({ bannerType }nnerSliderProps) => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchBanners();
  }, [bannerType]);

  const fetchBanners = async () => {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .eq('banner_type', bannerType)
      .eq('is_active', true)
      .order('display_order');

    if (data && !error) {
      setBanners(data);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  if (banners.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-gray-500 text-center">No banners available</p>
        </CardContent>
      </Card>
    );

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <CardContent 
          className="p-0 h-48 relative"
          style={{
            backgroundColor: currentBanner.background_color,
            backgroundImage: currentBanner.background_image ? `url(${currentBanner.background_image})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          <div className="relative z-10 p-6 h-full flex flex-col justify-end">
            <h3 
              className="text-xl font-bold mb-2"
              style={{ color: currentBanner.text_color }}
            >
              {currentBanner.title}
            </h3>
            {currentBanner.description && (
              <p 
                className="text-sm opacity-90"
                style={{ color: currentBanner.text_color }}
              >
                {currentBanner.description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {banners.length > 1 && (
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
            {banners.map((_, index) => (
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
