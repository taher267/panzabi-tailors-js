import { useEffect } from "react";
import { useExpressAuth } from "../../contexts/ExpressAuthContext";

export default function Dashbard(props) {
  const { currentUser, isLoading } = useExpressAuth();
  return <>Dashbard</>;
}
