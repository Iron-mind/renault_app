import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
function getCardType(number) {
  // visa
  var re = new RegExp("^4");
  if (number.match(re) != null) return "Visa";

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (number.match(/^(5[1-5]|2[2-7])/) != null) return "Mastercard";

  // AMEX
  re = new RegExp("^3[47]");
  if (number.match(re) != null) return "Amex";

  return "Visa";
}

const PaymentComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cards, setCards] = useState([]);
  const [description, setDescription] = useState("");
    const router = useRouter();
  useEffect(() => {
    // Simulación de una solicitud de pago
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setCards(
      localStorage.getItem("cards")
        ? JSON.parse(localStorage.getItem("cards"))
        : []
    );
    setDescription(localStorage.getItem("paymentDesc"));
  }, []);

  const handleCardSelection = (card) => {
    setSelectedCard(card);
    setShowForm(false);
  };

  const handlePayment = () => {
    // Simulación de una solicitud de pago completada
    setIsLoading(true);
    setTimeout(() => {
      setIsPaymentComplete(true);
      setIsLoading(false);
    }, 2000);
  };

  const handlePaymentFormSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para procesar el pago utilizando la información de la tarjeta ingresada
    handlePayment();

    localStorage.setItem(
      "cards",
      JSON.stringify([
        ...cards,
        { type: getCardType(cardNumber), number: cardNumber },
      ])
    );
  };

  return (
    <div
      style={{ width: "600px" }}
      className=" w-full mx-auto my-5 p-4 bg-white rounded shadow text-black"
    >
      <h2 className="text-xl font-bold mb-4">Proceso de pago</h2>
      <p className="text-xl font-bold mb-4">{description}</p>

      {isLoading && (
        <div className="flex items-center justify-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          <span className="ml-2">Cargando...</span>
        </div>
      )}

      {!isLoading && !isPaymentComplete && (
        <div className="w-40">
          <h3 className="font-bold mb-2">Selecciona una tarjeta:</h3>
          <div className="flex flex-col mb-4">
            {cards.map((card) => (
              <button
                key={card.number}
                className={`mr-2 my-2 p-2 rounded w-80 ${
                  selectedCard === card.type
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => handleCardSelection(card.type)}
              >
                {card.type} - {card.number.slice(-5)}***
              </button>
            ))}

            <button
              className={`p-2 rounded border ${
                showForm ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancelar" : "Nueva Tarjeta"}
            </button>
          </div>

          {!showForm && selectedCard && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePayment}
            >
              Realizar pago
            </button>
          )}

          {showForm && (
            <form onSubmit={handlePaymentFormSubmit} className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="cardNumber">
                Número de tarjeta:
              </label>
              <input
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                id="cardNumber"
                className="border p-2 mb-2 rounded"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />

              <label className="block mb-2 font-bold" htmlFor="expiryDate">
                Fecha de caducidad:
              </label>
              <input
                type="text"
                placeholder="MM/AA"
                id="expiryDate"
                className="border p-2 mb-2 rounded"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />

              <label className="block mb-2 font-bold" htmlFor="cvv">
                CVV:
              </label>
              <input
                type="text"
                placeholder="XXX"
                id="cvv"
                className="border p-2 mb-4 rounded"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Realizar pago
              </button>
            </form>
          )}
        </div>
      )}

      {!isLoading && isPaymentComplete && (
        <div className="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p>Pago completado exitosamente.</p>
            
          <button onClick={() => router.push("/order")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" >
            Volver a la tienda
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentComponent;
