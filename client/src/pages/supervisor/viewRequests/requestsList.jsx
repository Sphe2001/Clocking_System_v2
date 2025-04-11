import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import toast from "react-hot-toast";
import SupervisorNavbar from "../../../components/supervisorNavbar";

const RequestsList = () => {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `${domain}/api/supervisor/students/requests`,
          {
            withCredentials: true,
          }
        );
        setRequests(res.data);
      } catch (err) {
        toast.error("Failed to fetch requests");
      }
    };

    fetchRequests();
  }, []);

  const openModal = async (request) => {
    setSelectedRequest(request);
    setModalOpen(true);

    try {
      await axios.patch(
        `${domain}/api/supervisor/student/request/viewed/${request.id}`,
        {},
        { withCredentials: true }
      );

      setRequests((prev) =>
        prev.map((r) => (r.id === request.id ? { ...r, isViewed: true } : r))
      );
    } catch (err) {
      console.error("Failed to mark as viewed", err);
    }
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setModalOpen(false);
  };

  const handleDecision = async (isApproved) => {
    try {
      const res = await axios.put(
        `${domain}/api/supervisor/student/request/response/${selectedRequest.id}`,
        { isApproved },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setRequests((prev) =>
        prev.map((r) =>
          r.id === selectedRequest.id ? { ...r, isApproved } : r
        )
      );
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to respond");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <SupervisorNavbar />
      {/* Add a top margin to the heading */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900 mt-8">
        Student Requests
      </h1>
      {requests.length === 0 ? (
        <p className="text-gray-600">No requests found.</p>
      ) : (
        <ul className="w-full max-w-3xl space-y-4">
          {requests.map((request) => (
            <li
              key={request.id}
              className="p-4 bg-white rounded-lg shadow-md flex justify-between items-start cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div>
                <p className="text-gray-800">
                  <strong>ID:</strong> {request.id}
                </p>
                <p className="text-gray-800">
                  <strong>Reason:</strong> {request.reason}
                </p>
                <p className="text-gray-800">
                  <strong>Status:</strong>{" "}
                  {request.isApproved === null
                    ? "Pending"
                    : request.isApproved
                    ? "Approved"
                    : "Rejected"}
                </p>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold cursor-pointer"
                onClick={() => openModal(request)}
              >
                View
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Request Details"
        className="bg-white max-w-lg p-6 mx-auto mt-20 rounded-xl shadow-xl"
        overlayClassName="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-start"
      >
        {selectedRequest && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Request #{selectedRequest.id}
            </h2>
            <p className="text-gray-800">
              <strong>Reason:</strong> {selectedRequest.reason}
            </p>
            <p className="text-gray-800">
              <strong>Status:</strong>{" "}
              {selectedRequest.isApproved === null
                ? "Pending"
                : selectedRequest.isApproved
                ? "Approved"
                : "Rejected"}
            </p>

            <div className="flex mt-6 gap-4 justify-end">
              <button
                onClick={() => handleDecision(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold cursor-pointer"
              >
                Approve
              </button>
              <button
                onClick={() => handleDecision(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold cursor-pointer"
              >
                Reject
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RequestsList;
