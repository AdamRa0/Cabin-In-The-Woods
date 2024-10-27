import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import { useEffect, useState } from "react";

import Checkbox from "../../ui/Checkbox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();

  const [confirmPaid, setConfirmPaid] = useState(false);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking ?? {};
  
  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false)
  }, [booking])

  function handleCheckin() { 
    if (!confirmPaid) return;
    checkin(bookingId);
  }

  if (isLoading) return <Spinner />


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox disabled={confirmPaid || isCheckingIn} 
          id="confirm" 
          checked={confirmPaid} onChange={() => setConfirmPaid(!confirmPaid)}>
          I confirm that {guests.fullName} has paid the total amount of {formatCurrency(totalPrice)}.
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
