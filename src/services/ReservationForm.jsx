// import React, { useState, useEffect } from "react";
// import dayjs from "dayjs";

// const ReservationPage = () => {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [tableNumber, setTableNumber] = useState("");
//   const [numberOfGuests, setNumberOfGuests] = useState("");
//   const [statusMessage, setStatusMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [reservedTables, setReservedTables] = useState([]);

//   const today = dayjs();
//   const maxDate = dayjs().add(30, "day");

//   useEffect(() => {
//     const fetchReservedTables = async () => {
//       try {
//         const response = await fetch("https://restaurant-api-with-node-js.vercel.app//api/reservations"); // reservations
//         const data = await response.json();
//         setReservedTables(data.reservedTables || []);
//       } catch (error) {
//         console.error("Error fetching reserved tables:", error);
//       }
//     };

//     fetchReservedTables();
//   }, []);

//   const handleReservation = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (reservedTables.includes(Number(tableNumber))) {
//       setStatusMessage("The table is reserved. Please choose another table.");
//       setIsLoading(false);
//       return;
//     }

//     const reservationData = {
//       date,
//       time,
//       tableNumber,
//       numberOfGuests,
//     };

//     console.log(reservationData);

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setStatusMessage(" You must log in");
//         setIsLoading(false);
//         return;
//       }

//       const response = await fetch("https://restaurant-api-with-node-js.vercel.app//api/reservations", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           token: token,
//         },
//         body: JSON.stringify(reservationData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStatusMessage("Reservation booked successfully!");
//         setDate("");
//         setTime("");
//         setTableNumber("");
//         setNumberOfGuests("");
//       } else {
//         if (response.status === 401) {
//           setStatusMessage(data.message);
//         } else {
//           setStatusMessage(
//             data.message || "Failed to book reservation. Please try again."
//           );
//         }
//       }
//     } catch (error) {
//       setStatusMessage("Error booking reservation. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const isValidTime = (selectedTime) => {
//     const selectedHour = parseInt(selectedTime.split(":")[0], 10);
//     return selectedHour >= 10 || selectedHour < 4; // From 10 AM to 4 AM (next day)
//   };

//   const handleTimeChange = (e) => {
//     const selectedTime = e.target.value;
//     if (isValidTime(selectedTime)) {
//       setTime(selectedTime);
//     } else {
//       setStatusMessage("Please select a time between 10 AM and 4 AM.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray">
//       <form
//         className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg mt-20"
//         onSubmit={handleReservation}
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Reserve Your <span className="text-green">Table</span>
//         </h2>

//         <div className="mb-4">
//           <label className="block text-gray-700">Date</label>
//           <input
//             type="date"
//             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//             min={today.format("YYYY-MM-DD")} // Disable past dates
//             max={maxDate.format("YYYY-MM-DD")} // Limit to 5 days from today
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Time</label>
//           <input
//             type="time"
//             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={time}
//             onChange={handleTimeChange}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Table Number</label>
//           <input
//             type="number"
//             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={tableNumber}
//             onChange={(e) => setTableNumber(e.target.value)}
//             required
//             min="1"
//             max="10" // Assuming there are 10 tables
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Number of Guests</label>
//           <input
//             type="number"
//             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={numberOfGuests}
//             onChange={(e) => setNumberOfGuests(e.target.value)}
//             required
//             min="1"
//             max="20"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full  py-2 rounded-md hover:bg-indigo-700 transition-colors btn bg-green text-white"
//           disabled={isLoading}
//         >
//           {isLoading ? "Booking..." : "Reserve Now"}
//         </button>

//         {statusMessage && (
//           <p
//             className={`mt-4 text-center ${
//               statusMessage.includes("successfully")
//                 ? "text-success"
//                 : "text-red"
//             }`}
//           >
//             {statusMessage}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default ReservationPage;
// import React, { useState, useEffect } from "react";
// import dayjs from "dayjs";

// const ReservationPage = () => {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [tableNumber, setTableNumber] = useState("");
//   const [numberOfGuests, setNumberOfGuests] = useState("");
//   const [statusMessage, setStatusMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [reservedTables, setReservedTables] = useState([]);
//   const [reservationDetails, setReservationDetails] = useState(null); // تفاصيل الحجز

//   const today = dayjs();
//   const maxDate = dayjs().add(30, "day");

//   useEffect(() => {
//     const fetchReservedTables = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const response = await fetch("https://restaurant-api-with-node-js.vercel.app//api/reservations", {
//           headers: { token },
//         });
//         const data = await response.json();
//         console.log(data.reservations);
//         setReservationDetails(data.reservations[0]);
//         setReservedTables(data.reservations || []);
//       } catch (error) {
//         console.error("Error fetching reserved tables:", error);
//       }
//     };

//     fetchReservedTables();
//   }, []);

//   const handleReservation = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (reservedTables.includes(Number(tableNumber))) {
//       setStatusMessage("The table is reserved. Please choose another table.");
//       setIsLoading(false);
//       return;
//     }

//     const reservationData = {
//       date,
//       time,
//       tableNumber,
//       numberOfGuests,
//     };

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setStatusMessage("You must log in");
//         setIsLoading(false);
//         return;
//       }

//       const response = await fetch("https://restaurant-api-with-node-js.vercel.app//api/reservations", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           token: token,
//         },
//         body: JSON.stringify(reservationData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStatusMessage("Reservation booked successfully!");
//         setReservationDetails(reservationData); // حفظ تفاصيل الحجز هنا
//         setDate("");
//         setTime("");
//         setTableNumber("");
//         setNumberOfGuests("");
//       } else {
//         setStatusMessage(
//           data.message || "Failed to book reservation. Please try again."
//         );
//       }
//     } catch (error) {
//       setStatusMessage("Error booking reservation. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="container flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 p-6 lg:p-10 mt-96">
//         {/* Form Section */}
//         <form
//           className="bg-white p-10 rounded-lg shadow-lg w-full lg:w-1/2"
//           onSubmit={handleReservation}
//         >
//           <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
//             Reserve Your <span className="text-green-500">Table</span>
//           </h2>

//           <div className="mb-4">
//             <label className="block text-gray-700">Date</label>
//             <input
//               type="date"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               required
//               min={today.format("YYYY-MM-DD")}
//               max={maxDate.format("YYYY-MM-DD")}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Time</label>
//             <input
//               type="time"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Table Number</label>
//             <input
//               type="number"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//               required
//               min="1"
//               max="10"
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700">Number of Guests</label>
//             <input
//               type="number"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               value={numberOfGuests}
//               onChange={(e) => setNumberOfGuests(e.target.value)}
//               required
//               min="1"
//               max="20"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors"
//             disabled={isLoading}
//           >
//             {isLoading ? "Booking..." : "Reserve Now"}
//           </button>

//           {statusMessage && (
//             <p
//               className={`mt-4 text-center ${
//                 statusMessage.includes("successfully")
//                   ? "text-green-500"
//                   : "text-red-500"
//               }`}
//             >
//               {statusMessage}
//             </p>
//           )}
//         </form>

//         {/* Reservation Details Section */}
//         <div className="bg-white p-10 rounded-lg shadow-lg w-full lg:w-1/2">
//           <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
//             Reservation Details
//           </h2>
//           {reservationDetails ? (
//             <div className="space-y-4 text-lg">
//               <p>
//                 <strong>Date:</strong> {reservationDetails.date}
//               </p>
//               <p>
//                 <strong>Time:</strong> {reservationDetails.time}
//               </p>
//               <p>
//                 <strong>Table Number:</strong> {reservationDetails.tableNumber}
//               </p>
//               <p>
//                 <strong>Number of Guests:</strong>{" "}
//                 {reservationDetails.numberOfGuests}
//               </p>
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">لا توجد حجوزات</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReservationPage;
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const ReservationPage = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reservedTables, setReservedTables] = useState([]);
  const [reservationDetails, setReservationDetails] = useState(null);

  const today = dayjs();
  const maxDate = dayjs().add(30, "day");

  useEffect(() => {
    const fetchReservedTables = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("https://restaurant-api-with-node-js.vercel.app//api/reservations", {
          headers: { token },
        });
        const data = await response.json();
        setReservationDetails(data.reservations[0]);
        setReservedTables(data.reservations || []);
      } catch (error) {
        console.error("Error fetching reserved tables:", error);
      }
    };

    fetchReservedTables();
  }, [time]);

  const handleReservation = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Block if user already has a reservation
    if (reservationDetails) {
      setStatusMessage(
        "You already have a reservation. Please cancel it first."
      );
      setIsLoading(false);
      return;
    }

    if (reservedTables.includes(Number(tableNumber))) {
      setStatusMessage("The table is reserved. Please choose another table.");
      setIsLoading(false);
      return;
    }

    const reservationData = {
      date,
      time,
      tableNumber,
      numberOfGuests,
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setStatusMessage("You must log in");
        setIsLoading(false);
        return;
      }

      const response = await fetch("https://restaurant-api-with-node-js.vercel.app//api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage("Reservation booked successfully!");
        setReservationDetails(reservationData);
        setDate("");
        setTime("");
        setTableNumber("");
        setNumberOfGuests("");
      } else {
        setStatusMessage(
          data.message || "Failed to book reservation. Please try again."
        );
      }
    } catch (error) {
      setStatusMessage("Error booking reservation. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelReservation = async () => {
    setIsLoading(true);
    try {
      console.log(reservationDetails);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://restaurant-api-with-node-js.vercel.app//api/reservations/${reservationDetails._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      console.log(response);

      if (response.ok) {
        setStatusMessage("Reservation canceled successfully.");
        setReservationDetails(null);
      } else {
        setStatusMessage("Failed to cancel reservation.");
      }
    } catch (error) {
      setStatusMessage("Error canceling reservation. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="container flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 p-6 lg:p-10 mt-96">
        {/* Form Section */}
        <form
          className="bg-white p-10 rounded-lg shadow-lg w-full lg:w-1/2"
          onSubmit={handleReservation}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
            Reserve Your <span className="text-green-500">Table</span>
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              min={today.format("YYYY-MM-DD")}
              max={maxDate.format("YYYY-MM-DD")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Time</label>
            <input
              type="time"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Table Number</label>
            <input
              type="number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              required
              min="1"
              max="10"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Number of Guests</label>
            <input
              type="number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              required
              min="1"
              max="20"
            />
          </div>

          <button
            type="submit"
            className="w-full  bg-green text-white py-3 rounded-md hover:bg-green-600 transition-colors"
            disabled={isLoading || reservationDetails}
          >
            {isLoading ? "Booking..." : "Reserve Now"}
          </button>

          {statusMessage && (
            <p
              className={`mt-4 text-center ${
                statusMessage.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </form>

        {/* Reservation Details Section */}
        <div className="bg-white p-10 rounded-lg shadow-lg w-full lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
            Reservation Details
          </h2>
          {reservationDetails ? (
            <div className="space-y-4 text-lg">
              <p>
                <strong>Date:</strong> {reservationDetails.date}
              </p>
              <p>
                <strong>Time:</strong> {reservationDetails.time}
              </p>
              <p>
                <strong>Table Number:</strong> {reservationDetails.tableNumber}
              </p>
              <p>
                <strong>Number of Guests:</strong>{" "}
                {reservationDetails.numberOfGuests}
              </p>

              <button
                onClick={handleCancelReservation}
                className="mt-4 w-full  bg-rose-700 text-white py-3 rounded-md hover:bg-red-600 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Canceling..." : "Cancel Reservation"}
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-500">No reservations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
