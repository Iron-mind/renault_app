import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header>
        {/* Navbar */}
        <nav>
          <ul>
            <li>
              <a href="/home">Inicio</a>
            </li>
            <li>
              <a href="#contenido">Acerca de</a>
            </li>
            <li>
              <a href="/cars">Vehículos</a>
            </li>
            <li>
              <a href="#footer">Contacto</a>
            </li>
          </ul>
        </nav>
      </header>
      <section className="banner h-30 relative">
        <img
          src="/images/banner.jpeg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </section>

      <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full  ">
        <section id='contenido' className="  p-8">
          <h1 className="text-4xl font-bold mb-4">
            Construyendo un futuro eléctrico
          </h1>
          <p className="text-lg text-gray-700">
            Renault es una reconocida empresa automotriz que ha abrazado el
            futuro de la movilidad con su enfoque innovador y sostenible. Como
            pioneros en la fabricación y venta de vehículos eléctricos, Renault
            ha impulsado la adopción masiva de la movilidad eléctrica y ha
            sentado las bases para un mundo más limpio y respetuoso con el medio
            ambiente. Nuestros vehículos eléctricos de la marca Renault
            representan la combinación perfecta entre tecnología de vanguardia,
            diseño elegante y una experiencia de conducción excepcional. Cada
            modelo ha sido cuidadosamente diseñado y fabricado para ofrecer una
            movilidad inteligente y eficiente, sin comprometer el rendimiento ni
            el estilo. En Renault, nos enorgullece liderar la revolución de los
            autos eléctricos, creando soluciones de movilidad que no solo
            satisfacen las necesidades actuales, sino que también contribuyen
            activamente a la preservación del planeta. Nuestra visión va más
            allá de simplemente fabricar vehículos eléctricos; estamos
            comprometidos con un ecosistema completo de movilidad sostenible que
            incluye infraestructura de carga, servicios de conectividad y
            soluciones de energía renovable. Con un enfoque centrado en la
            excelencia, la seguridad y la calidad, cada vehículo eléctrico de
            Renault ha sido sometido a rigurosas pruebas y está respaldado por
            una garantía confiable. Además, nuestro compromiso con la
            satisfacción del cliente se refleja en un servicio de posventa
            excepcional y una red de concesionarios comprometidos en brindar
            asesoramiento experto y soporte en todo momento. En Renault, creemos
            en un futuro en el que la movilidad eléctrica sea la norma, y
            estamos trabajando incansablemente para hacer realidad esa visión.
            Únete a nosotros en esta emocionante transformación hacia un mundo
            más limpio, más eficiente y más conectado. Descubre la experiencia
            de conducir un vehículo eléctrico Renault y sé parte del cambio
            hacia un futuro sostenible.
          </p>
        </section>
      </main>

      <footer id="footer">
        {/* Footer */}
        <p>
          Contactanos{" "}
          <a color="#0000FF" href="mailto:rosa@melano.com">
            renaultficty@app.com
          </a>
        </p>
        <p>&copy; 2023 renaultficty. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
