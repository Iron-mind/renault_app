import { useEffect, useState } from "react";
import { getClients } from "../../api/client.api";
import LoadingSpinner from "../../components/Loading";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({ name: "" });
  useEffect(() => {
    setLoading(true);
    setInput({ name: "" });
    function fetchData() {
      getClients().then((res) => {
        const data = res.data;
        setClients(data);
        setLoading(false);
      });
    }
    fetchData();
  }, []);
  function handleInputChange(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }
  function handleSearch() {
    setLoading(true);
    getClients({ name: input.name }).then((res) => {
      setClients(res.data);
    }).finally(()=>setLoading(false));
  }
  return (
    <div>
      <div className="flex flex-col items-center justify-between p-14 ml-14">
        <h1 className="text-4xl font-bold mb-4">Clientes</h1>
        <div className="flex flex-col items-center justify-between p-14 ml-14">
          <div className="flex items-center justify-center py-2">
            <input
              className="border text-black border-gray-300 rounded-l px-4 py-2 focus:outline-none"
              type="text"
              placeholder="Buscar..."
              value={input.name}
              name="name"
              onChange={handleInputChange}
              
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r"
              onClick={handleSearch}
              
            >
              Buscar
            </button>
          </div>
        </div>
        {loading ? (
          <LoadingSpinner />):
        <div className="flex flex-col items-center justify-between p-14 ml-14">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Apellido</th>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Dirección</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="border px-4 py-2">{client.name}</td>
                  <td className="border px-4 py-2">{client.lastname}</td>
                  <td className="border px-4 py-2">{client.email}</td>
                  <td className="border px-4 py-2">{client.phone}</td>
                  <td className="border px-4 py-2">{client.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
      </div>
    </div>
  );
}
