import { currencies } from 'currencies.json';
import { useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FiSend, FiDownloadCloud } from 'react-icons/fi';
import { VscOpenPreview } from 'react-icons/vsc';
import { useReactToPrint } from 'react-to-print';
import Preview from '../../pages/Preview';
import { FaPrint } from 'react-icons/fa';
import jsPDF from 'jspdf';
import ReactDOMServer from 'react-dom/server';
import { useDispatch } from 'react-redux';
import { setCurrency } from '../invoiceCalculator/invoiceCalcSlice';

export default function Sidebar() {

  const TableRef = useRef<HTMLTableElement>(null);

  const dispatch = useDispatch();

  const getContent = useReactToPrint({
    content: () => TableRef.current
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const exportPDF = () => {
    let element = <Preview></Preview>
    const doc = new jsPDF("p", "pt", "letter");
    doc.html(ReactDOMServer.renderToString(element), {
      callback: function (doc) {
        doc.save('sample.pdf');
      }
    });
  };

  return (
    <aside className='rs-sidebar__section'>
      <Button className='rs-sidebar__send-btn mb-3' variant="success"><FiSend></FiSend>Send Invoice</Button>

      <div className='rs-sidebar__actions-btn mb-3'>
        <Button variant="light" onClick={handleShow}><VscOpenPreview></VscOpenPreview> Preview</Button>
        <Button variant="light" onClick={exportPDF}><FiDownloadCloud></FiDownloadCloud> Download</Button>
      </div>

      <Button className='rs-sidebar__send-btn' onClick={getContent} variant="success"><FaPrint></FaPrint>Print Invoice</Button>

      <div className='rs-invoice__divider rs-invoice__divider--white'></div>

      <div className='rs-sidebar__currency'>
        <Form.Group>
          <Form.Label>Currency</Form.Label>
          <Form.Select onChange={e=> dispatch(setCurrency(e.currentTarget.value))}>
            {
              currencies.map((c, i) => <option key={i} value={c.symbol}>{c.symbol} ({c.name})</option>)
            }

          </Form.Select>
        </Form.Group>
      </div>

      <div style={{ display: "none" }}>
        <Preview ref={TableRef}></Preview>
      </div>


      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Preview></Preview>
        </Modal.Body>
      </Modal>

    </aside>
  )
}