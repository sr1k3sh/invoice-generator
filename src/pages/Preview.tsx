import { forwardRef } from "react";
import { Table } from "react-bootstrap";

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
    return (
        <div className="rs-preview__wrapper" style={wrapperStyle} ref={ref}>
            <div className="rs-preview__date-wrapper mb-4" style={dateWrapper}>
                <span>Date: 07/07/2022</span>
                <span>Due date: --/--/----</span>
            </div>

            <div>
                <h2>Invoice #001</h2>
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
                            <span>$ 1000</span>
                        </div>

                        <div className="rs-invoice__divider"></div>

                        <div className="form-group--horizontal mb-2 justify-content-end">
                            <span
                                className="text-primary"
                                style={{ cursor: "pointer", width: "auto", marginRight: '8px' }}
                            >
                                discount (%)
                            </span>
                            <span> 10 %</span>
                        </div>
                        <div className="form-group--horizontal justify-content-end">
                            <span
                                className="text-primary"
                                style={{ cursor: "pointer", width: "auto" , marginRight: '8px' }}
                            >
                                tax (%)
                            </span>
                            <span
                            > 13% </span>
                        </div>

                        <div className="rs-invoice__divider"></div>

                        <div className="form-group--horizontal">
                            <span>Total</span>
                            <span>$ 1100</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Preview;