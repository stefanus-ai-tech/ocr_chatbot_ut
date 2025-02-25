import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate("/login", { replace: true }); // Redirect to /login, replacing the current history entry.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-destructive">
          Unauthorized Access
        </h1>
        <p className="text-lg text-muted-foreground">
          You don't have permission to access this page
        </p>
        <Button onClick={goBack}>Go Back</Button>
      </div>
    </div>
  );
};

export default Unauthorized;
