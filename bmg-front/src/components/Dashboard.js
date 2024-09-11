// Dashboard.js
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient, fetchClients, deleteClient } from '../api/clientApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '',cep: '', logradouro: '', complemento: '', numero: null, bairro: '', cidade: '', uf: '' });
  const [errors, setErrors] = useState({});
  const [expandedClient, setExpandedClient] = useState(null);

  const queryClient = useQueryClient();

  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
  });

  const mutation = useMutation({
    mutationFn: createClient,
    onSuccess: (data) => {
      queryClient.setQueryData(['clients'], (oldData) => [...oldData, data]);
      setFormData({ nome: '', email: '', telefone: '',cep: '', logradouro: '', complemento: '', numero: 0, bairro: '', cidade: '', uf: '' });
      setErrors({})
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['clients']);
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTelefoneChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatTelefoneNumber(value);
    setFormData({ ...formData, [name]: formattedValue });
  };

  const formatTelefoneNumber = (value) => {
    if (!value) return value;
    const telefoneNumber = value.replace(/[^\d]/g, '');
    const telefoneNumberLength = telefoneNumber.length;
    if (telefoneNumberLength < 4) return telefoneNumber;
    if (telefoneNumberLength < 7) {
      return `(${telefoneNumber.slice(0, 2)}) ${telefoneNumber.slice(2)}`;
    }
    return `(${telefoneNumber.slice(0, 2)}) ${telefoneNumber.slice(2, 7)}-${telefoneNumber.slice(7, 11)}`;
  };

  const validate = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email não é valido';
    }
    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Telefone deve estar no formato (00) 00000-0000';
    }
     if (!formData.nome || formData.nome.trim() === '') {
      newErrors.nome = 'Nome não pode estar vazio';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      mutation.mutate({
        Nome: formData.nome,
        Email: formData.email,
        Telefone: formData.telefone,
        Cep: formData.cep,
        Logradouro: formData.logradouro,
        Complemento: formData.complemento,
        Numero: formData.numero,
        Bairro: formData.bairro,
        Cidade: formData.cidade,
        Uf: formData.uf,
      });
    }
  };

  const uf = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];
  const inactiveClients = clients.filter(client => !client.status);

  const handleExpand = (index) => {
    setExpandedClient(expandedClient === index ? null : index);
  };

  const handleDelete = (clientId) => {
    deleteMutation.mutate(clientId);
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard cliente BMG</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="border border-gray-300 rounded-md p-4 mt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Telefone</label>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleTelefoneChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>}
            </div>

          </div>
        </div>
        <div className="border border-gray-300 rounded-md p-4 mt-4">
          <div className='flex flex-col-3 gap-2'>
            <div className="w-72">
              <label className="block text-sm font-medium text-gray-700">Cep</label>
              <input
                type="text"
                name="cep"
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Logradouro</label>
              <input
                type="text"
                name="logradouro"
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Complemento</label>
              <input
                type="text"
                name="complemento"
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className='flex flex-col-3 gap-2 pt-2'>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Número</label>
              <input
                type="text"
                name="numero"
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Bairro</label>
              <input
                type="text"
                name="bairro"
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Cidade</label>
              <input
                type="text"
                name="cidade"
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">UF</label>
              <select
                name="uf"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Selecione UF</option>
                {uf.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
        >
          Criar
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Todos os Clientes</h2>
      <table className="min-w-full divide-y divide-gray-200 mb-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.telefone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleExpand(index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  {item.status == true ? (
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                       <FontAwesomeIcon icon={faTrash} />
                    </button>
                  ) : (<></>)}
                </td>
              </tr>
              {expandedClient === index && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className='grid grid-cols-3'>
                      <p><strong>CEP:</strong> {item.cep}</p>
                      <p><strong>Logradouro:</strong> {item.logradouro}</p>
                      <p><strong>Complemento:</strong> {item.complemento}</p>
                      <p><strong>Número:</strong> {item.numero}</p>
                      <p><strong>Bairro:</strong> {item.bairro}</p>
                      <p><strong>Cidade:</strong> {item.cidade}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-bold mb-4">Clientes Inativos</h2>
      <table className="min-w-full divide-y divide-gray-200 mb-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {inactiveClients.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;