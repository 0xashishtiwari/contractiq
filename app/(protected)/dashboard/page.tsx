
import Navbar from "@/components/landing/navbar";
import {getUserContracts} from "@/app/actions/userContract";
import DashBoardClient from "./DashBoardClient";




export default async function DashboardPage() {

  const contracts = await getUserContracts();
  return (
    <>
      <DashBoardClient contracts={contracts} />
    </>
  );
}
