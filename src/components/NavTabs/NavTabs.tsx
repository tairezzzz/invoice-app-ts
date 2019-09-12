import React, { useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { getInvoicesArray } from '../../store/invoices/selectors';
import { Actions as InvoicesActions } from '../../store/invoices/actions';
import { RootState } from '../../store/index';

import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import { styles } from './styles'






const mapDispatchToProps = (dispatch: Dispatch) => ({
    getInvoices: () => dispatch(InvoicesActions.getInvoices()),
});

type Props = ReturnType<typeof mapDispatchToProps>;


const NavTabs: React.FC<Props> = ({getInvoices}) => {

    useEffect(() => {
        getInvoices();
    }, [getInvoices]);

    const invoices = useSelector((state: RootState) => getInvoicesArray(state))


    const invoicesAmount = invoices.length

    return (
        <div>
            <AppBar position="static" >
                <Container>
                    <Toolbar variant="dense" style={styles.toolbar}>
                        <Link to="/">
                            <Typography variant="h6" color="textPrimary">Logo</Typography>
                        </Link>
                        <Link to="/products">
                            <Typography variant="h6" color="textPrimary">Products</Typography>
                        </Link>
                        <Link to="/customers">
                            <Typography variant="h6" color="textPrimary">Customers</Typography>
                        </Link>
                        <Link to="/invoices">
                            <Typography variant="h6" color="textPrimary">Invoices ({invoicesAmount})</Typography>
                        </Link>
                    </Toolbar>
                </Container>
            </AppBar>

        </div>
    );
}


export default connect(null, mapDispatchToProps)(NavTabs);