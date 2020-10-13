import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import versionService from "../VersionService/VersionService";
import Notifications from "../Notifications/Notifications";
import Loader from "../Loader/Loader";

interface VersionData {
  buildDate: string;
  buildSha: string;
}

const Footer: React.FC = () => {
  const [version, setVersion] = React.useState<VersionData>();
  const [isLoader, setLoader] = React.useState(false);

  React.useEffect(() => {
    const fetchVersion = async () => {
      setLoader(true);
      try {
        const data = await versionService.getVersion();
        setVersion(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    };
    fetchVersion();
  }, [setVersion]);

  return (
    <Container fluid className="fixed-bottom">
      <Row>
        <Notifications />
      </Row>
      <Row className="bg-light py-3">
        <Col sm={6}>
          <small>
            Bootzooka - application scaffolding by <a href="http://softwaremill.com">SoftwareMill</a>,
            <br /> sources available on <a href="https://github.com/softwaremill/bootzooka/">GitHub</a>
          </small>
        </Col>
        {isLoader ? (
          <Loader />
        ) : (
          <Col sm={6} className="text-right">
            <small style={{ wordBreak: "break-all" }}>
              <strong>build date:</strong> {version?.buildDate}
              <br />
              <strong>build sha:</strong> {version?.buildSha}
            </small>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Footer;
