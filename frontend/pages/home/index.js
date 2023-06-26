
import Image from 'next/image'

export default function Home() {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec turpis eget lorem posuere placerat.',
      avatar: '/images/user.png',
    },
    {
      id: 2,
      name: 'Jane Smith',
      testimonial: 'Fusce facilisis lacus non nibh egestas sagittis. In commodo enim eu enim facilisis, vitae lacinia tellus consequat.',
      avatar: '/images/user.png',
    },
  ];

  return (
    <div className="flex w-auto flex-col bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner con imagen */}
        <div className="mb-8">
          <h3 className="text-3xl text-gray-800 font-semibold mt-4">Bienvenido a Renault</h3>
          <img
            className="w-full h-auto rounded-lg"
            src="https://corporate.enelx.com/content/dam/global/storie-page/2021/06/benefits-of-electric-cars/desk-hero-benefits-electric-cars.jpg"
            alt="Banner de la aplicación"
          />
        </div>

        {/* Sección de testimonios */}
        <div className="mb-8">
          <h2 className="text-3xl text-gray-800 font-semibold mb-4">Testimonios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center mb-4">
                  <img
                    className="w-12 h-12 rounded-full mr-4"
                    src={testimonial.avatar}
                    alt={`Avatar de ${testimonial.name}`}
                  />
                  <p className="text-gray-800 font-semibold">{testimonial.name}</p>
                </div>
                <p className="text-gray-600">{testimonial.testimonial}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gif de pasos para cotizar */}
        <div>
          <h2 className="text-3xl text-gray-800 font-semibold mb-4">Pide tu cotización</h2>
          <img
            className="w-full h-auto"
            src="/images/cotiza.gif"
            alt="Pasos para cotizar"
          />
        </div>
      </div>
    </div>
  );s
}
