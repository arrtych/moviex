"use client";

import { useEffect, useState } from "react";

const UserList: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [users]);
  return <></>;
};

export default UserList;
