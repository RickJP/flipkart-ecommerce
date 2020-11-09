import React, { createRef, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Form, Row, Col, Button, Table } from 'react-bootstrap';
import TextArea from '../../components/UI/TextArea';

import pos from 'pos';
// import { createElement } from 'react';

// const MyComponent = () => <div>MY COMPONENT</div>;

function Pos() {
  const textAreaRef = createRef(null);
  const [text, setText] = useState('');
  const [textAreaRows, setTextAreaRows] = useState(8);
  const [output, setOutput] = useState([]);
  const [uniquePos, setUniquePos] = useState();
  const [displayPosCounts, setDisplayPosCounts] = useState(false);
  const [displayPosInfo, setDisplayPosInfo] = useState(false);

  const processText = (e) => {
    e.preventDefault();
    const sentence = new pos.Lexer().lex(text);
    const tagger = new pos.Tagger();

    // tagger.extendLexicon({ Obama: ['NNP'] });
    // tagger.tag(['Mr', 'Obama']);

    const taggedWords = tagger.tag(sentence);
    let elements = [];
    taggedWords.forEach((w) => {
      elements.push({ word: w[0], tag: w[1] });
    });
    setOutput(elements);
    setTextAreaRows(2);
    setDisplayPosCounts(displayPosCounts);
    setDisplayPosInfo(!displayPosInfo);
  };

  const selectAllText = () => {
    console.log('Select All Text');
    textAreaRef.current.select();
  };

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    console.log('Copy Success');
  };

  const clear = () => {
    textAreaRef.current.value = '';
    setText('');
    setTextAreaRows(8);
    setOutput([]);
    setUniquePos();
    setDisplayPosCounts(false);
  };

  const displayUniquePos = () => {
    const counts = {};
    output.map((item, index) => {
      return (counts[item.tag] = counts[item.tag] ? counts[item.tag] + 1 : 1);
    });
    setUniquePos(counts);
    setDisplayPosCounts(!displayPosCounts);
  };

  const PosCounts = () =>
    displayPosCounts ? (
      <div className='mt-5'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tag</th>
              <th>No.</th>
            </tr>
          </thead>
          {uniquePos &&
            Object.entries(uniquePos).map(([key, value], i) => (
              <tbody>
                <tr>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              </tbody>
            ))}
        </Table>
      </div>
    ) : null;

  const PosInfo = () =>
    displayPosInfo ? (
      <Container>
        <div className='mt-5'>
          {output.map((item, idx) => (
            <span className='mb-2' style={{ listStyle: 'none' }} key={idx}>
              {item.word} ({item.tag})
            </span>
          ))}
        </div>
      </Container>
    ) : null;

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 12 }}>
            <Form onSubmit={processText}>
              <Row>
                <Col md={12}>
                  <TextArea
                    ref={textAreaRef}
                    style={{
                      resize: 'none',
                    }}
                    label='Paragraph'
                    placeholder='Type or copy text here'
                    value=''
                    type='textarea'
                    noOfRows={textAreaRows}
                    onChange={(e) => setText(e.target.value)}></TextArea>
                  <Button variant='primary' type='submit'>
                    Process
                  </Button>
                  <Button
                    className='ml-2'
                    variant='primary'
                    onClick={selectAllText}>
                    Select All
                  </Button>
                  <Button
                    className='ml-2'
                    variant='primary'
                    onClick={copyToClipboard}>
                    Copy
                  </Button>
                  <Button
                    className='ml-2'
                    variant='primary'
                    onClick={displayUniquePos}>
                    Unique POS
                  </Button>
                  <Button className='ml-2' variant='secondary' onClick={clear}>
                    Clear
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <PosCounts />
        <PosInfo />
      </Container>
    </Layout>
  );
}

export default Pos;
