import { useEffect, useState } from "react";
import { getClients } from "../../api/client.api";
import LoadingSpinner from "../../components/Loading";
import styles from '../../styles/inicioCliente.module.css';


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
    <div id='va' className={`${styles.inicioCliente} h-screen`}>
      {!loading ? 
        <div>
          <div className="flex flex-col items-center justify-between px-14 py-2">
          <h1 className="text-4xl font-bold my-4">Clientes</h1>
          <div className="flex items-center justify-center flex-col py-2">
            <label>Filtra por nombre aqui</label>
            <input
              className="border text-black border-gray-300 rounded px-4 py-2 focus:outline-none mt-4"
              type="text"
              placeholder="nombre"
              value={input.name}
              name="name"
              onChange={handleInputChange}
            />
            <button
              className="bg-[#b6f09c] hover:bg-[#95c480] text-[#131619] font-bold py-2 px-4 rounded mt-4"
              onClick={handleSearch}
            >
              Buscar
            </button>
          </div>
        </div>
          <div className="flex flex-col items-center justify-between p-3">
          <div className="max-w-[100%] max-h-[30rem] h-auto overflow-auto bg-[#95c480] text-black">
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
            </div>
          </div>
        </div>
      :<LoadingSpinner />}
      
    </div>
  );
}
