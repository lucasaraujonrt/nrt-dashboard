import { getFinancial, setFinancial } from "@/utils/supabaseRequest";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const useFinancialUseCase = () => {
  const { userId, getToken } = useAuth();
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const token = await getToken({ template: "supabase" });
    const data = await getFinancial({ userId, token });
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [getToken, userId]);

  const addFinancial = async () => {
    const token = await getToken({ template: "supabase" });
    await setFinancial({ userId, token });
    fetchData();
  };

  return { data, addFinancial };
};
