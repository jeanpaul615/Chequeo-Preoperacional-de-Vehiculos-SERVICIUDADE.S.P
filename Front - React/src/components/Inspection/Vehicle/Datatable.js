import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import Sidebar from '../../../containers/Sidebar';
import Navbar from '../../../containers/Navbar';
import ModalNewVehicle from './ModalNewVehicle';
import ModalUpdate from './ModalUpdate';
import Swal from 'sweetalert2';
import { GetVehicles } from '../../../controllers/Inspection/DashboardControllers/Vehicle';
import { DeleteVehicle } from '../../../controllers/Inspection/VehicleControllers/DeleteVehicle';

// Función para formatear la fecha
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const DatatableVehicles = () => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
  const [modalNewVehicleIsOpen, setModalNewVehicleIsOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetVehicles();
        const formattedData = result.map(item => ({
          ...item,
          // No formatear las fechas aquí para que estén en formato original
          soat_until: item.soat_until,
          rtm_until: item.rtm_until,
          seguro_contractual_until: item.seguro_contractual_until,
          seguro_extracontractual_until: item.seguro_extracontractual_until,
          created_at: item.created_at,
          updated_at: item.updated_at,
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {  // Verificar si hay datos antes de inicializar la tabla
      const tableElement = tableRef.current;
  
      const dataTable = $(tableElement).DataTable({
        data: data,
        columns: [
          { title: 'ID vehiculo', data: 'vehicle_id' },
          { title: 'Tipo', data: 'type' },
          { title: 'Placa', data: 'license_plate' },
          { title: 'Marca', data: 'brand' },
          { title: 'Area', data: 'area' },
          {
            title: 'Vigencia Soat',
            data: 'soat_until',
            render: (data) => formatDate(data),
          },
          {
            title: 'Vigencia RTM',
            data: 'rtm_until',
            render: (data) => formatDate(data),
          },
          {
            title: 'Seguro Contractual',
            data: 'seguro_contractual_until',
            render: (data) => formatDate(data),
          },
          {
            title: 'Seguro Extracontractual',
            data: 'seguro_extracontractual_until',
            render: (data) => formatDate(data),
          },
          {
            title: 'Fecha Creación',
            data: 'created_at',
            render: (data) => formatDate(data),
          },
          {
            title: 'Fecha Actualización',
            data: 'updated_at',
            render: (data) => formatDate(data),
          },
          {
            title: "Opciones",
            data: null,
            render: function (data, type, row) {
              return `
                <button type="button" class="btn-update  hover:text-white bg-gray-100 hover:bg-blue-600 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-2 py-1 text-center inline-flex items-center me-2 mb-2">
                  Actualizar
                </button>
                <button type="button" class="btn-delete  hover:text-white bg-gray-100 hover:bg-red-600 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-2 py-1 text-center inline-flex items-center me-2 mb-2">
                  Eliminar
                </button>
              `;
            },
          },
        ],
        responsive: true,
        destroy: true,
        paging: true,
        searching: true,
        ordering: true,
        scrollX: true,
        pagingType: "full_numbers", // Use full_numbers pagination style
        lengthMenu: [1000, 100, 75, 50, 25, 10], // Options for rows per page
        columnDefs: [
          { width: '1%', targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
        ],
      });
  
      // Handle button clicks
      $(tableElement).on('click', 'button', function () {
        const button = $(this);
        const rowData = dataTable.row(button.closest('tr')).data();
  
        if (rowData) {
          if (button.hasClass('btn-update')) {
            handleEditClick(rowData);
          } else if (button.hasClass('btn-delete')) {
            Swal.fire({
              title: "¿Estás seguro?",
              text: "No podrás revertir esto!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, eliminar!",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                DeleteVehicle(rowData.vehicle_id).then((response) => {
                  if (response) {
                    setData(prevData => prevData.filter(item => item.vehicle_id !== rowData.vehicle_id));
                  }
                }).catch(error => console.error('Error deleting vehicle:', error));
              }
            });
          }
        }
      });
  
      return () => {
        if ($.fn.DataTable.isDataTable(tableElement)) {
          $(tableElement).DataTable().destroy();
        }
      };
    }
    // eslint-disable-next-line
  }, [data]);  

  const openUpdateModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalUpdateIsOpen(true);
  };

  const closeUpdateModal = () => {
    setModalUpdateIsOpen(false);
  };

  const openNewVehicleModal = () => {
    setModalNewVehicleIsOpen(true);
  };

  const closeNewVehicleModal = () => {
    setModalNewVehicleIsOpen(false);
  };

  const handleEditClick = (vehicle) => {
    openUpdateModal(vehicle);
  };

  return (
    <div className="flex flex-col md:flex-row mt-8">
      <Sidebar />
      <div className="flex-1 md:ml-72 ml-4 text-sm md:mr-5 mr-5 overflow-x-auto">
        <Navbar Title={"Vehículos"} />
        <button
          onClick={openNewVehicleModal}
          className="bg-green-500 hover:bg-green-600 text-white focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center w-full md:w-auto"
        >
          Nuevo Vehículo
        </button>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table
            ref={tableRef}
            className="display w-full table-auto border-collapse"
          >
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-2 py-1">Id Vehículo</th>
                <th className="px-2 py-1">Tipo</th>
                <th className="px-2 py-1">Placa</th>
                <th className="px-2 py-1">Marca</th>
                <th className="px-2 py-1">Área</th>
                <th className="px-2 py-1">Vigencia Soat</th>
                <th className="px-2 py-1">Vigencia RTM</th>
                <th className="px-2 py-1">Seguro Contractual</th>
                <th className="px-2 py-1">Seguro Extracontractual</th>
                <th className="px-2 py-1">Fecha Creación</th>
                <th className="px-2 py-1">Fecha Actualización</th>
                <th className="px-2 py-1">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-600 font-medium">
            </tbody>
          </table>
        </div>
        {modalUpdateIsOpen && (
          <ModalUpdate
            isOpen={modalUpdateIsOpen}
            onClose={closeUpdateModal}
            vehicle={selectedVehicle}
          />
        )}
        {modalNewVehicleIsOpen && (
          <ModalNewVehicle
            isOpen={modalNewVehicleIsOpen}
            onClose={closeNewVehicleModal}
          />
        )}
      </div>
    </div>
  );
};

export default DatatableVehicles;
