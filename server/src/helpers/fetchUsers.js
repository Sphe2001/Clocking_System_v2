
export const fetchSupervisors = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/admin/fetchAllSupervisorUsers/supervisorUsers"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch supervisor data");
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const fetchStudents = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/admin/fetchAllStudentUsers/users"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // api.js

export const fetchUsersData = async () => {
    try {
      const studentsResponse = await fetch("http://localhost:3001/api/admin/fetchAllStudentUsers/users");
      const supervisorsResponse = await fetch("http://localhost:3001/api/admin/fetchAllSupervisorUsers/supervisorUsers");
  
      const studentsData = await studentsResponse.json();
      const supervisorsData = await supervisorsResponse.json();
  
      const formattedStudents = studentsData.map(student => ({
        studentNo: student.studentNo,
        surname: student.surname,
        role: "Student",
        clockIn: student.clock_in_time || "N/A",
        clockOut: student.clock_out_time || "N/A"
      }));
  
      const formattedSupervisors = supervisorsData.map(supervisor => ({
        staffNo: supervisor.staffNo,
        surname: supervisor.surname,
        role: "Supervisor",
        clockIn: supervisor.clock_in_time || "N/A",
        clockOut: supervisor.clock_out_time || "N/A"
      }));
  
      // Combine both student and supervisor data
      const allUsers = [...formattedStudents, ...formattedSupervisors];
  
      // Sort users by clockIn time (latest clock-in first)
      allUsers.sort((a, b) => {
        const clockInA = a.clockIn === "N/A" ? null : new Date(a.clockIn);
        const clockInB = b.clockIn === "N/A" ? null : new Date(b.clockIn);
  
        // If clockIn time is missing (N/A), place that entry at the bottom
        if (!clockInA && !clockInB) return 0;
        if (!clockInA) return 1;
        if (!clockInB) return -1;
  
        return clockInB - clockInA; // Sort in descending order (latest first)
      });
  
      return { allUsers, studentCount: formattedStudents.length, supervisorCount: formattedSupervisors.length };
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  
  