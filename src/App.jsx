import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.div`
  padding: 20px;
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">Cabin In The Woods</Heading>
            <div>
              <Heading as="h2">Check In and Out</Heading>
              <Button variation="primary" size="medium">Check In</Button>
              <Button variation="secondary" size="small">Check Out</Button>
            </div>
          </Row>
          <Row>
            <form action="">
              <Heading as="h3">Form</Heading>
              <Input type="number" placeholder="Number of guests" />
              <Input type="number" placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}