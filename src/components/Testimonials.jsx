import { useState, useEffect } from 'react'

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "Adventure Traveler",
      image: "https://i.pravatar.cc/150?img=1", // Using placeholder images
      rating: 5,
      text: "Amazing experience! The booking process was smooth, and the destinations recommended were exactly what I was looking for. Will definitely use this service again!"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      role: "Family Vacationer",
      image: "https://i.pravatar.cc/150?img=2",
      rating: 5,
      text: "Perfect family vacation planning! They thought of everything - from kid-friendly hotels to activities that kept everyone entertained. Couldn't be happier!"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Business Traveler",
      image: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      text: "As a frequent business traveler, I appreciate their efficiency and attention to detail. The 24/7 support has been invaluable during my trips."
    },
    {
      id: 4,
      name: "Emma Thompson",
      role: "Luxury Traveler",
      image: "https://i.pravatar.cc/150?img=4",
      rating: 5,
      text: "The luxury packages exceeded my expectations. Every detail was perfect, from the 5-star accommodations to the private tours. Truly a premium service!"
    },
    {
      id: 5,
      name: "David Rodriguez",
      role: "Backpacker",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: "Found amazing budget-friendly options without compromising on experience. Their local insights helped me discover hidden gems I wouldn't have found otherwise."
    },
    {
      id: 6,
      name: "Lisa Chang",
      role: "Honeymoon Planner",
      image: "https://i.pravatar.cc/150?img=6",
      rating: 5,
      text: "They made our honeymoon absolutely magical! The romantic destinations and special arrangements were perfect. Every moment was memorable!"
    }
  ]

  // Simplified animation logic
  const [visibleItems, setVisibleItems] = useState(testimonials)  // Show all items immediately

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">What Our Travelers Say</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Read genuine reviews from our satisfied travelers who have experienced unforgettable journeys with us.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-blue-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
              
              <div className="mt-4 flex justify-end">
                <svg className="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}