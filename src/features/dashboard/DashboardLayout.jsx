import styled from "styled-components";
import { useRecentBookings } from "../bookings/useRecentBookings";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useRecentStays } from "../bookings/useRecentStays";
import { useCabins } from "../cabins/useCabins";  
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const { confirmedStays, isLoading: staysLoading, numDays } = useRecentStays();
  const { cabins, isLoading: cabinsLoading } = useCabins();

  if (isLoading || staysLoading || cabinsLoading ) return <Spinner />
  
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length}/>
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}