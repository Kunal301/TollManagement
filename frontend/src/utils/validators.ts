export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isValidVehicleNumber = (vehicleNumber: string): boolean => {
    // This is a simplified regex for Indian vehicle numbers
    // You might want to adjust it based on your specific requirements
    const vehicleNumberRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
    return vehicleNumberRegex.test(vehicleNumber);
  };