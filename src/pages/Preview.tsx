import { forwardRef } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getInvoiceState } from "../features/invoiceCalculator/invoiceCalcSlice";

// type props = {
//     refTable: Ref<HTMLTableElement> | null;
// }

type content = {

}

const wrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    background: "white",
    padding: "1.5rem"
}

const dateWrapper: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
}
const Preview = forwardRef<HTMLTableElement, content>((props, ref) => {

    const getInstate = useSelector(getInvoiceState);

    const { invoiceItems, discount, tax, subtotal, total, invoiceNumber, currentDate , dueDate } = getInstate;
    
    return (
        <div className="rs-preview__wrapper" style={wrapperStyle} ref={ref}>
            <div className="rs-preview__date-wrapper mb-4" style={dateWrapper}>
                <span>Date: {currentDate}</span>
                <span>Due date: {dueDate}</span>
            </div>

            <div>
                <h2>Invoice #{invoiceNumber}</h2>
            </div>

            <div className="rs-invoice__divider"></div>

            <div className="rs-invoice__bill-from">
                <div className="rs-invoice__bill-from--content">
                    <div className="mb-3">
                        <span><strong>Bill from:</strong> sr1k3sh@gmail.com</span>
                    </div>
                    <div className="">
                        <p>Duis incididunt laborum laborum veniam Lorem aliqua est tempor aliquip. Tempor ullamco enim qui ullamco elit esse ea pariatur minim. Consequat aliquip voluptate laboris qui. Incididunt commodo duis nulla consequat pariatur. Dolor aliquip ipsum eiusmod ipsum reprehenderit cupidatat eiusmod mollit ex labore excepteur. Ullamco eiusmod cillum consequat ea incididunt sint. Aliqua deserunt ad laboris veniam pariatur laboris commodo id amet eiusmod adipisicing exercitation.</p>
                    </div>
                </div>

                <div className="rs-invoice__bill-from--content">
                    <div className="mb-3">
                        <span><strong>Bill to:</strong> sr1k3sh@gmail.com</span>
                    </div>
                    <div className="">
                        <p>Duis incididunt laborum laborum veniam Lorem aliqua est tempor aliquip. Tempor ullamco enim qui ullamco elit esse ea pariatur minim. Consequat aliquip voluptate laboris qui. Incididunt commodo duis nulla consequat pariatur. Dolor aliquip ipsum eiusmod ipsum reprehenderit cupidatat eiusmod mollit ex labore excepteur. Ullamco eiusmod cillum consequat ea incididunt sint. Aliqua deserunt ad laboris veniam pariatur laboris commodo id amet eiusmod adipisicing exercitation.</p>
                    </div>
                </div>

            </div>

            <div className="rs-invoice__divider"></div>

            <div className="rs-invoice__item-list">
                <Table className="rs-invoice__item-Table mb-4">
                    <thead className="rs-invoice__item-header">
                        <tr style={{ backgroundColor : "grey"}}>
                            <th style={{ borderRight: '2px solid black'}}>item</th>
                            <th style={{ width: "100px" , borderRight: '2px solid black'}}>qty</th>
                            <th style={{ width: "150px" , borderRight: '2px solid black', textAlign: "center"}}>rate</th>
                            <th style={{ width: "200px" , textAlign: 'right'}}>total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            invoiceItems.map(({item,description ,quantity,rate,stotal},i)=><tr key={i}>
                                <td>
                                    <div className="d-flex flex-column">
                                        <strong className="mb-2">{item}</strong>
                                        <span>{description}</span>
                                    </div>    
                                </td>
                                <td>{quantity}</td>
                                <td className="text-center">{rate}</td>
                                <td className="text-end">{stotal}</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
                <div className="rs-invoice__calculation-wrapper justify-content-end">
                    {/* <Button className="rs-invoice__add-item" onClick={onAddItem}>
                        {" "}
                        <BiMessageSquareAdd></BiMessageSquareAdd> Add item
                    </Button> */}
                    <div className="rs-invoice__calculation-inner">
                        <div className="form-group--horizontal">
                            <span>Subtotal</span>
                            <span>$ {subtotal}</span>
                        </div>

                        <div className="rs-invoice__divider"></div>

                        <div className="form-group--horizontal mb-2 justify-content-end">
                            <span
                                className="text-primary"
                                style={{ cursor: "pointer", width: "auto", marginRight: '8px' }}
                            >
                                discount (%)
                            </span>
                            <span> {discount}%</span>
                        </div>
                        <div className="form-group--horizontal justify-content-end">
                            <span
                                className="text-primary"
                                style={{ cursor: "pointer", width: "auto" , marginRight: '8px' }}
                            >
                                tax (%)
                            </span>
                            <span
                            > {tax}% </span>
                        </div>

                        <div className="rs-invoice__divider"></div>

                        <div className="form-group--horizontal">
                            <span>Total</span>
                            <span>$ {total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Preview;