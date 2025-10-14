import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

interface LoadingButtonProps extends React.ComponentProps<"button"> {
  loading: boolean;
}

const LoadingButton = ({ loading, ...props }: LoadingButtonProps) => {
  return (
    <Button
      size={"sm"}
      type="submit"
      className="w-full"
      disabled={loading}
      {...props}
    >
      {loading && <Spinner />}
      {props.children}
    </Button>
  );
};

export default LoadingButton;
