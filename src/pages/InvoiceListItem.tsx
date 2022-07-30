import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { calcRemovedTotal, setInvoiceContent } from '../features/invoiceCalculator/invoiceCalcSlice'
import { AiOutlineDelete } from 'react-icons/ai';

type Props = {
    index: number
}

export default function InvoiceListItem({index}: Props) {

    const dispatch = useDispatch();

    const currentRef = useRef<HTMLTableRowElement>(null);
    const currentTotal = useRef<HTMLInputElement>(null);

    const [ quantity , setQuantity ] = useState<number>(0);

    const [ rate, setRate ] = useState<number>(0);

    const [ item , setItem ] = useState<string>("");

    const [ description , setDescription ] = useState<string>("");


    const onRemoveItem = () =>{
        currentRef?.current?.remove();
        currentTotal.current && dispatch( calcRemovedTotal( parseFloat(currentTotal.current?.value)) );
    }

    const [ sTotal, setStotal] = useState<number>(0);

    useEffect(()=>{
        const stotal = quantity*rate;
        setStotal(stotal);

        dispatch( setInvoiceContent({key:index,quantity:quantity, rate: rate,stotal:stotal,item:item,description:description}) );

    },[quantity,rate,dispatch,index,item,description]);

    return (
        <tr data-key={index} ref={currentRef}>
            <td>
                <Form.Group className='mb-2' controlId={'rs_invoice_item_name_'+index}>
                    <Form.Label className='label--hidden'>item name</Form.Label>
                    <Form.Control type="text" placeholder='Item name' onChange={(e:ChangeEvent<HTMLInputElement>)=>setItem(e.currentTarget.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId={'rs_invoice_item_description_'+index}>
                    <Form.Label className='label--hidden'>Description</Form.Label>
                    <Form.Control as={"textarea"} type="text" placeholder='Description' onChange={(e:ChangeEvent<HTMLInputElement>)=>setDescription(e.currentTarget.value)}></Form.Control>
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId={'rs_invoice_item_qty_'+index}>
                    <Form.Label className='label--hidden'>Qty</Form.Label>
                    <Form.Control type="number" placeholder='Qty' defaultValue={0} onChange={(e)=>setQuantity(parseFloat(e.currentTarget.value))}></Form.Control>
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId={'rs_invoice_item_rate_'+index}>
                    <Form.Label className='label--hidden'>Rate</Form.Label>
                    <Form.Control type="number" placeholder='Rate' defaultValue={0} onChange={(e)=>setRate(parseFloat(e.currentTarget.value))}></Form.Control>
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId={'rs_invoice_item_total_'+index}>
                    <Form.Label className='label--hidden'>Total</Form.Label>
                    <Form.Control type="number" placeholder='Total' ref={currentTotal} readOnly value={sTotal}></Form.Control>
                </Form.Group>
            </td>
            <td style={{width: "46px", textAlign: 'center'}}>
                <Button variant='danger' onClick={onRemoveItem}>
                        <AiOutlineDelete></AiOutlineDelete>
                </Button>
            </td>
        </tr>
    )
}