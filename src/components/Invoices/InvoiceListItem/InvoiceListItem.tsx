import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { Button, Modal, } from '@material-ui/core';
import StyledTableCell from '../../../shared/components/Table/StyledTableCell';
import StyledTableRow from '../../../shared/components/Table/StyledTableRow';
import ColorButtonOrange from '../../../shared/components/Buttons/ColorButtonOrange';
import ColorButtonRed from '../../../shared/components/Buttons/ColorButtonRed';
import ColorButtonGreen from '../../../shared/components/Buttons/ColorButtonGreen';
import { styles } from './styles';



interface InvoiceProps {
  customers: any;
  inv_id: string;
  discount: number;
  total: number;
  customer_id: any;
  isEditable: boolean;
  onDeletingInvoice: any;
}



const InvoiceListItem: React.FC<InvoiceProps>  = ({customers, onDeletingInvoice,  inv_id, discount, total, customer_id, isEditable }) => {


  const [isOpen, setToggleOpen] = useState(false)

  const handleToggleOpen = () => {
    setToggleOpen(!isOpen)
  };


  const handleDelete = (id: string) => {
    onDeletingInvoice(id);
    handleToggleOpen();
  };


  return (

    <StyledTableRow>
      <StyledTableCell component="th" scope="row">{inv_id}</StyledTableCell>
      <StyledTableCell>
        { customers[customer_id] ? customers[customer_id].name : 'name'}
      </StyledTableCell>
      <StyledTableCell>{discount ? discount : 0}</StyledTableCell>
      <StyledTableCell>{total.toFixed(2)}</StyledTableCell>
      <StyledTableCell style={styles.buttons}>

        <Link to={`/invoice/${inv_id}/view`}>
          <Button variant="contained" color="secondary"> View </Button>
        </Link>

        {
          isEditable
            ?
            <>
              <Link to={`/invoice/${inv_id}/edit`}>
                <ColorButtonOrange variant="contained" color="secondary"> Edit </ColorButtonOrange>
              </Link>

              <ColorButtonRed variant="contained" color="secondary" onClick={handleToggleOpen}> Delete </ColorButtonRed>
            </>
            : null
        }

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={isOpen}
          onClose={handleToggleOpen}
          style={styles.modal}
        >
          <div style={styles.paper}>
            Are you sure you want to delete an invoice?

            <div style={styles.modalButtons}>
              <ColorButtonGreen variant="contained" color="secondary" onClick={() => handleDelete(inv_id)}>
                Yes
              </ColorButtonGreen>
              <ColorButtonRed variant="contained" color="secondary" onClick={handleToggleOpen}>
                Cancel
              </ColorButtonRed>
            </div>
          </div>
        </Modal>

      </StyledTableCell>

    </StyledTableRow>

  );
}

export default InvoiceListItem