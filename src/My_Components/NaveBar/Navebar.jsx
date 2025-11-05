import { Button } from "../../components/ui/button";

export const Navebar = () => {
  return (
    <div className="">
      <div className="bg-gray-50 font-bold  text-[20px] flex justify-between px-2 border h-16 items-center w-full">
        <p className="ml-2">ACCOUNTING</p>
        <Button size="lg" variant="custom">
          Button
        </Button>
      </div>
    </div>
  );
};
