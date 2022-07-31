import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../features/components/Sidebar";
import {
    captureDiscount,
    captureTax,
    getInvoiceState,
} from "../features/invoiceCalculator/invoiceCalcSlice";
import InvoiceDate from "./InvoiceDate";
import InvoiceListItem from "./InvoiceListItem";
import { BiMessageSquareAdd } from "react-icons/bi";

// type Props = {}

export default function Invoice() {
    const [reapeaterCount, setRepeaterCount] = useState(0);

    const getInState = useSelector(getInvoiceState);

    const { invoiceItems } = getInState;

    const [subTotal, setSubTotal] = useState<number>(0);

    const [showDiscount, setShowDiscount] = useState<boolean>(false);

    const [discountValue, setDiscountValue] = useState<number>(0);

    const [taxValue, setTaxValue] = useState<number>(0);

    const [showTax, setShowTax] = useState<boolean>(false);

    const dispatch = useDispatch();

    const getTotal = useSelector(getInvoiceState);

    const { total } = getTotal;

    useEffect(() => {
        const sTotal: number = invoiceItems
            .map((s) => s.stotal)
            .reduce((p, c, i) => p + c, 0);

        setSubTotal(sTotal);
    }, [setSubTotal, invoiceItems]);

    const onAddItem = () => {
        setRepeaterCount((prev) => prev + 1);
    };

    const children = [];

    for (var i = 0; i < reapeaterCount; i += 1) {
        children.push(
            <InvoiceListItem key={i + 1} index={i + 1}></InvoiceListItem>
        );
    }

    const onDiscountClick = () => {
        setShowDiscount((prev) => !prev);
        setDiscountValue(0);
        dispatch(captureDiscount(discountValue));
    };

    const onTaxClick = () => {
        setShowTax((prev) => !prev);
    };

    const onDiscountChange = (e: any) => {
        e.preventDefault();
        setDiscountValue(e.currentTarget.value);
        if (!e.currentTarget.value) dispatch(captureDiscount(0));
        else dispatch(captureDiscount(parseFloat(e.currentTarget.value)));
    };

    const onTaxChange = (e: any) => {
        e.preventDefault();
        setTaxValue(e.currentTarget.value);
        if (!e.currentTarget.value) dispatch(captureTax(0));
        else dispatch(captureTax(parseFloat(e.currentTarget.value)));
    };



    return (
        <div className="rs-invoice__wrapper">
            <Container>
                <Row>
                    <Col md={9}>
                        <Form className="rs-invoice__form-wrapper">
                            <InvoiceDate></InvoiceDate>
                            <div className="rs-invoice__ids-wrapper">
                                <Form.Group
                                    className="form-group--horizontal"
                                    controlId="rs_invoice_ids"
                                >
                                    <Form.Label className="rs-invoice__title">
                                        Invoice #
                                    </Form.Label>
                                    <Form.Control
                                        className="rs-invoice__title-input"
                                        type="text"
                                        defaultValue="001"
                                    ></Form.Control>
                                </Form.Group>
                            </div>

                            <div className="rs-invoice__divider"></div>

                            <div className="rs-invoice__bill-from">
                                <div className="rs-invoice__bill-from--content">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="rs_invoice_from_email"
                                    >
                                        <Form.Label>Bill from</Form.Label>
                                        <Form.Control placeholder="Email"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="" controlId="rs_invoice_from_who">
                                        <Form.Label className="label--hidden">From</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Who is this invoice from?"
                                        ></Form.Control>
                                    </Form.Group>
                                </div>

                                <div className="rs-invoice__bill-from--content">
                                    <Form.Group className="mb-3" controlId="rs_invoice_to_email">
                                        <Form.Label>Bill to</Form.Label>
                                        <Form.Control placeholder="Email"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="" controlId="rs_invoice_to_who">
                                        <Form.Label className="label--hidden">to</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Who is this invoice to?"
                                        ></Form.Control>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="rs-invoice__divider"></div>

                            <div className="rs-invoice__item-list">
                                <Table className="rs-invoice__item-table mb-4">
                                    <thead className="rs-invoice__item-header">
                                        <tr>
                                            <th>item</th>
                                            <th style={{ width: "100px" }}>qty</th>
                                            <th style={{ width: "150px" }}>rate</th>
                                            <th style={{ width: "200px" }}>total</th>
                                            <th>action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <InvoiceListItem index={0}></InvoiceListItem>
                                        {children}
                                    </tbody>
                                </Table>
                                <div className="rs-invoice__calculation-wrapper">
                                    <Button className="rs-invoice__add-item" onClick={onAddItem}>
                                        {" "}
                                        <BiMessageSquareAdd></BiMessageSquareAdd> Add item
                                    </Button>
                                    <div className="rs-invoice__calculation-inner">
                                        <Form.Group className="form-group--horizontal">
                                            <Form.Label>Subtotal</Form.Label>
                                            <Form.Control
                                                className="rs-invoice__no-border rs-invoice__text-right"
                                                type="text"
                                                readOnly
                                                value={subTotal}
                                            ></Form.Control>
                                        </Form.Group>

                                        <div className="rs-invoice__divider"></div>

                                        <Form.Group className="form-group--horizontal mb-2">
                                            <Form.Label
                                                className="text-primary"
                                                style={{ cursor: "pointer", width: "auto" }}
                                                onClick={onDiscountClick}
                                            >
                                                Add discount (%)
                                            </Form.Label>
                                            <Form.Control
                                                type={showDiscount ? "number" : "hidden"}
                                                value={discountValue}
                                                onChange={onDiscountChange}
                                                style={{ width: "100px" }}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="form-group--horizontal">
                                            <Form.Label
                                                className="text-primary"
                                                style={{ cursor: "pointer", width: "auto" }}
                                                onClick={onTaxClick}
                                            >
                                                Add tax (%)
                                            </Form.Label>
                                            <Form.Control
                                                type={showTax ? "number" : "hidden"}
                                                style={{ width: "100px" }}
                                                value={taxValue}
                                                onChange={onTaxChange}
                                            ></Form.Control>
                                        </Form.Group>

                                        <div className="rs-invoice__divider"></div>

                                        <Form.Group className="form-group--horizontal">
                                            <Form.Label>Total</Form.Label>
                                            <Form.Control
                                                className="rs-invoice__no-border rs-invoice__text-right"
                                                type="text"
                                                readOnly
                                                value={total}
                                            ></Form.Control>
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Col>
                    <Col md={3}>
                        <Sidebar></Sidebar>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
