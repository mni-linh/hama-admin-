import React, { useState } from "react";
import { Col, Row } from "@themesberg/react-bootstrap";

import GeneralInfoForm from "../components/GeneralInfoForm";
import { ProfileCardWidget} from "../components/Widgets";
const SignUp = () => {
  const [file, setFile] = useState(null);

  return (
    <div>
      <Row style={{}}>
        <Col xs={8} sl={8}>
          <GeneralInfoForm file={file} />
        </Col>
        <Col xs={4} xl={4}>
          <Row>
            <Col xs={11}>
              <ProfileCardWidget setFile={setFile} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
