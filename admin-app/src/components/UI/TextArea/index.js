import React, { forwardRef } from 'react';
import { Form } from 'react-bootstrap';

const TextArea = forwardRef(
  (
    {
      style,
      label,
      type,
      placeholder,
      value,
      noOfRows,
      onChange,
      onClick,
      errorMessage,
    },
    ref,
  ) => (
    <Form.Group controlId='formBasicTexArea'>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        ref={ref}
        as={type}
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
        rows={noOfRows}
        style={style}
      />
      <Form.Text className='text-muted'>{errorMessage}</Form.Text>
    </Form.Group>
  ),
);

export default TextArea;
