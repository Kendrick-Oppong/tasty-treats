import { handleFetchErrorToast } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";


export const ErrorMessage = ({ message }: { message: string }) => {
  if (message) handleFetchErrorToast();
  // toast("Error fetching recipe", {
  //   position: "top-center",
  //   duration: 3000,
  //   dismissible: true,
  //   important: true,
  //   icon: <XCircle />,
  //   className: "gap-6 mt-5",
  //   style: {
  //     padding: "1rem",
  //     backgroundColor: "red",
  //     fontSize: "16px",
  //     color: "white",
  //   },
  // });

  return (
    <div className="flex justify-center items-center text-lg gap-3 text-red-600">
      <AlertTriangle />
      <h1 className="text-center">Oops! {message}</h1>
    </div>
  );
};
