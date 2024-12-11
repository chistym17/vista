// components/PopularDestinations.jsx
export default function PopularDestinations() {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Destination Cards */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img src="/destination1.jpg" alt="Destination" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Bali, Indonesia</h3>
                <p className="text-gray-600">Experience paradise on Earth</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img src="/destination2.jpg" alt="Destination" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Santorini, Greece</h3>
                <p className="text-gray-600">Breathtaking views and sunsets</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img src="/destination3.jpg" alt="Destination" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Maldives</h3>
                <p className="text-gray-600">Crystal clear waters await</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }