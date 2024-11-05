import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useCheckout } from "../check-in-out/useCheckout";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteBooking } from "./useDeleteBooking";


const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { bookingId } = useParams();
  const { booking, isLoading } = useBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();
  const { checkOut, isCheckingOut } = useCheckout();

  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />

  const { status, id } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" &&
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check In
          </Button>
        }
        {status === "checked-in" &&
          <Button
            onClick={() => checkOut(bookingId)}
            disabled={isCheckingOut}>
            Check Out
          </Button>
        }

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete Booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              disabled={isDeleting}
              resourceName="booking"
              onConfirm={() => deleteBooking(bookingId, { onSuccess: () => navigate(-1) })} />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
