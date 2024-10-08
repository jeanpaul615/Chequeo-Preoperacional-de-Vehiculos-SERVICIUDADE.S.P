import { useState, useEffect } from "react";
//Verifica el role guardado en el localstorage
function RoleVerify() {
  const [roleUser, setRoleUser] = useState(null);

  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    setRoleUser(storedRole);
  }, []);

  return roleUser;
}

export default RoleVerify;
