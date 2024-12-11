// components/FeaturedHotels.jsx
export default function FeaturedHotels() {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Hotel Cards */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img src="/hotel1.jpg" alt="Hotel" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Luxury Resort & Spa</h3>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="ml-2 text-gray-600">5.0</span>
                </div>
                <p className="text-gray-600 mb-2">Starting from</p>
                <p className="text-xl font-bold text-blue-600">$299/night</p>
              </div>
            </div>
            {/* Add more hotel cards similarly */}
          </div>
        </div>
      </section>
    )
  }