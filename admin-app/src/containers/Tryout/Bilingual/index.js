import React from 'react';
import Layout from '../../../components/Layout/index';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';

const Bilingual = () => {
  const tryout = useSelector((state) => state.tryout);

  const renderBilingualDocsTable = () => {
    return (
      <Table responsive='sm'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Details</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {tryout?.bilingualDocs.length > 0
            ? tryout.bilingualDocs.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.title}</td>
                  <td>{doc.text}</td>
                  <td>{doc.author}</td>
                  <td></td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderBilingualDocs = () => {
    return (
      <div responsive='sm' style={{ marginRight: '10px' }}>
        {tryout?.bilingualDocs.length > 0
          ? tryout.bilingualDocs.map((doc, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <Row
                  style={{
                    fontWeight: 'bold',
                    fontSize: '25px',
                  }}>
                  {doc.title}
                </Row>
                <Row
                  style={{
                    fontSize: '13px',
                  }}>
                  <p>{doc.text}</p>
                </Row>
                <Row
                  style={{
                    fontStyle: 'italic',
                    color: 'blue',
                  }}>
                  {doc.author}
                </Row>
              </div>
            ))
          : null}
      </div>
    );
  };

  return (
    <Layout innerWidth={window.innerWidth} topbar>
      <Container>
        {/* <Row>
          <Col>{renderBilingualDocsTable()}</Col>
        </Row> */}
        {renderBilingualDocs()}
        {/* {console.log(window.innerHeight, ',', window.innerWidth)} */}
      </Container>
    </Layout>
  );
};

export default Bilingual;
