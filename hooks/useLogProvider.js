import { useContext } from "react";
import LogContext from "@/context/logProvider";

export default function useLogProvider() {
  console.log("useLogProvider: called");
  const context = useContext(LogContext);
  console.log("useLogProvider: context", context);
  if (!context) {
    throw new Error("useLogProvider must be used within a LogProvider");
  }
  return context;
}
