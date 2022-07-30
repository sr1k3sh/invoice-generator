import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

export default function InvoiceDate() {

  const [curDate , setCurDate] = useState<string>('');

  useEffect(()=>{
    let date = new Date().toISOString().split('T')[0];

    setCurDate(date);

  },[setCurDate]);

  const onCurDateChange = (e:any) =>{
    setCurDate(e.currentTarget.value);
  }

  return (
    <div className='rs-invoice__date-wrapper mb-3'>
        <Form.Group className='form-group--horizontal' controlId='rs_invoice_current_date'>
            <Form.Label className='rs-invoice__date-label'>Date: </Form.Label>
            <Form.Control className='rs-invoice__date-input' value={curDate} onChange={onCurDateChange} type="date"></Form.Control>
        </Form.Group>
        <Form.Group className='form-group--horizontal' controlId='rs_invoice_due_date'>
            <Form.Label className='rs-invoice__date-label'>Due date: </Form.Label>
            <Form.Control className='rs-invoice__date-input' type="date"></Form.Control>
        </Form.Group>
    </div>
  )
}