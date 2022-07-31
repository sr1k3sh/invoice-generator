import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { setCurrentDate, setDueDate } from '../features/invoiceCalculator/invoiceCalcSlice';

export default function InvoiceDate() {

  const [curDate , setCurDate] = useState<string>('');

  const dispatch = useDispatch();

  useEffect(()=>{
    let date = new Date().toISOString().split('T')[0];

    setCurDate(date);
    
    dispatch(setCurrentDate(date));
  },[setCurDate , dispatch]);

  const onCurDateChange = (e:any) =>{
    setCurDate(e.currentTarget.value);
    dispatch(setCurrentDate(e.currentTarget.value));
  }

  return (
    <div className='rs-invoice__date-wrapper mb-3'>
        <Form.Group className='form-group--horizontal' controlId='rs_invoice_current_date'>
            <Form.Label className='rs-invoice__date-label'>Date: </Form.Label>
            <Form.Control className='rs-invoice__date-input' value={curDate} onChange={onCurDateChange} type="date"></Form.Control>
        </Form.Group>
        <Form.Group className='form-group--horizontal' controlId='rs_invoice_due_date'>
            <Form.Label className='rs-invoice__date-label'>Due date: </Form.Label>
            <Form.Control className='rs-invoice__date-input' type="date" onChange={e=> dispatch(setDueDate(e.currentTarget.value))}></Form.Control>
        </Form.Group>
    </div>
  )
}